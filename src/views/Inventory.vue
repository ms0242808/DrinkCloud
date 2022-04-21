<template>
  <div class="wrapper">
    <h3>{{$t('inv.title')}}</h3>
    <div class="mt-3">
      <b-row>
        <b-col sm="12" lg="6">
          <b-button size="sm" class="mx-1" variant="success" v-b-modal="'addModal'"><font-awesome-icon fixed-width icon="plus"/>{{$t('inv.add')}}</b-button>
          <!-- <b-button size="sm" class="mx-1" variant="outline-danger"><font-awesome-icon fixed-width icon="trash-alt"/>{{$t('inv.delete')}}</b-button> -->
          <b-button size="sm" class="mx-1" variant="outline-dark"><font-awesome-icon fixed-width icon="cog"/>{{$t('inv.setting')}}</b-button>
          <!-- <b-button size="sm" class="mx-1" variant="outline-primary"><font-awesome-icon fixed-width icon="file-download"/>{{$t('inv.export')}}</b-button> -->
        </b-col>
        <b-col sm="12" lg="6">
          <b-form-group label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0">
            <b-input-group size="sm">
              <b-form-input id="filter-input" v-model="filter" type="search" :placeholder="$t('inv.search')"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table striped hover responsive :items="invList" :fields="fields" :filter="filter" ref="table" class="mt-3">
        <template #cell(View)="data">
          <b-button size="sm" variant="outline-primary" @click="data.toggleDetails"><font-awesome-icon fixed-width icon="eye"/></b-button>
        </template>
        <template #row-details="data">
          <b-card>
            <b-card-header>
              <b-row>
                <b-col cols="6">
                  <b>{{$t('inv.tele')}}: {{data.item.Company_tele}}</b>
                </b-col>
                <b-col cols="6">
                  <b-button size="sm" class="mx-1 float-right" variant="outline-danger"><font-awesome-icon fixed-width icon="trash-alt"/>{{$t('inv.delete')}}</b-button>
                  <b-button size="sm" class="mx-1 float-right" variant="outline-info" v-b-modal="'editModal'"><font-awesome-icon fixed-width icon="edit"/>{{$t('inv.edit')}}</b-button>
                </b-col>
              </b-row>
            </b-card-header>
            <b-row class="mb-2 mt-2">
              <b-col cols="3"></b-col>
              <b-col cols="3" class="text-sm-center"><b>{{$t('inv.quantity')}}</b></b-col>
              <b-col cols="3" class="text-sm-center"><b>{{$t('inv.price')}}</b></b-col>
              <b-col cols="3" class="text-sm-center"><b>{{$t('inv.added')}}</b></b-col>
              <template v-for="(i,n) in data.item.details">
                <b-col cols="3" :key="n" v-if="n % 3 ===0"><b-checkbox :id="n+'_'+data.item.id" v-model="selected" :value="n+data.item.id">{{n+"_"+data.item.id}}</b-checkbox></b-col>
                <b-col cols="3" class="text-sm-center mt-1" :key="i+n+'a'"><b>{{i}}</b></b-col>
              </template>
            </b-row>
          </b-card>
        </template>
      </b-table>
    </div>
    <Modal :catList="catList" :companyList="companyList" :unitList="unitList"/>
  </div>
  <!--
    https://www.mimo.work/help/category/consumables
    https://www.behance.net/gallery/55390583/Inventory-management-dashboard
    刪除耗材或分類 -> modal with warning text & delete button
    變更耗材分類名稱或耗材名稱 -> modal with text input & update button
  -->
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'
import Modal from '../components/inventory/Modal.vue'
import { functions, httpsCallable, db, doc, setDoc, updateDoc, collection, query, where, onSnapshot, getDocs, perf, trace} from "../fire"

export default {
  name: 'Inventory',
  components:{
    Modal
  },
  data(){
    return{
      brandL: store.getters.getLocation,
      invList:[],
      filter: null,
      catList:[],
      companyList:[],
      unitList:[],
      selected:[]
    }
  },
  computed:{
    ...mapGetters([
      'getLocation',
      'getLocationList'
    ]),
    'fields':function(){
      return [
        {"key":"Category",label:this.$i18n.t('inv.category')},
        {"key":"Name",label:this.$i18n.t('inv.name')},
        {"key":"Available",label:this.$i18n.t('inv.available')},
        {"key":"Unit",label:this.$i18n.t('inv.unit')},
        {"key":"Used",label:this.$i18n.t('inv.used')},
        {"key":"Company_name",label:this.$i18n.t('inv.company')},
        {"key":"Last_added",label:this.$i18n.t('inv.last_added')},
        {"key":"View",label:this.$i18n.t('inv.view')}
      ]
    }
  },
  methods:{
    async getinvList(){
      const t = trace(perf,"getInv");
			t.start();
      const unsubscribe = onSnapshot(doc(db, "inventory", this.brandL), async (doc) => {
        var request = [];
        this.catList = doc.data()['category'];
        this.companyList = doc.data()['company'];
        this.unitList = doc.data()['unit'];
        var x = 0,
        y = '';
        for(x in doc.data()){
          if(x !== 'category' && x !== 'company' && x !=='unit'){
            y = x.split('_');
            var all = [],
            n = 0;
            for(n in doc.data()[x]['price']){all.push(doc.data()[x]['quantity'][n],doc.data()[x]['price'][n],doc.data()[x]['added'][n])}
            var added = doc.data()[x]['added'].pop(),
            sum = doc.data()[x]['quantity'].reduce((a, b) => parseInt(a) + parseInt(b), 0);
            request.push({
              Category:y[0],
              Name:y[2],
              Available:sum,
              Unit:y[3],
              Used:'-',
              Company_name:y[1],
              Last_added:added,
              Company_tele:doc.data()[x]['tele'] || "N/A",
              details: all,
              id:x
            });
            console.log(request);
          }
        }
        this.invList = request;
      });
      t.stop();
    }
  },
  watch:{
    getLocation(val){
      this.brandL = val;
      this.getinvList();
    }
  },
  mounted(){
    this.getinvList();
    // this.getCatTable();
    // if(this.brandL == '-'){
    //   this.brandL = this.getLocation;
    //   this.getStaff();
    // }
  }
}
</script>

<style scoped>

</style>
