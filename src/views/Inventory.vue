<template>
  <div class="wrapper">
    <h3>{{$t('inv.title')}}</h3>
    <div class="mt-3">
      <b-row>
        <b-col sm="12" lg="6">
          <b-button size="sm" class="mx-1" variant="success" v-b-modal="'addModal'"><font-awesome-icon fixed-width icon="plus"/>{{$t('inv.add')}}</b-button>
          <b-button size="sm" class="mx-1" variant="outline-dark" hidden><font-awesome-icon fixed-width icon="cog"/>{{$t('inv.setting')}}</b-button>
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
      <b-table striped hover responsive :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="invList" :fields="fields" :filter="filter" ref="table" class="mt-3">
        <template #cell(View)="data">
          <b-button size="sm" variant="outline-primary" @click="toggleDetails(data)"><font-awesome-icon fixed-width icon="eye"/></b-button>
        </template>
        <template #row-details="data">
          <b-card>
            <b-card-header>
              <b-row>
                <b-col cols="6">
                  <b>{{$t('inv.tele')}}: {{data.item.Company_tele}}</b>
                </b-col>
                <b-col cols="6">
                  <b-button :disabled="data.item.delete" v-b-modal="'delModal'" size="sm" class="mx-1 float-right" variant="outline-danger"><font-awesome-icon fixed-width icon="trash-alt"/>{{$t('inv.delete')}}</b-button>
                  <b-button :disabled="data.item.edit" v-b-modal="'editModal'" size="sm" class="mx-1 float-right" variant="outline-info" hidden><font-awesome-icon fixed-width icon="edit"/>{{$t('inv.edit')}}</b-button>
                </b-col>
              </b-row>
            </b-card-header>
            <b-row class="mb-2 mt-2">
              <b-col cols="3"></b-col>
              <b-col cols="3" class="text-sm-center"><b>{{$t('inv.quantity')}}</b></b-col>
              <b-col cols="3" class="text-sm-center"><b>{{$t('inv.price')}}</b></b-col>
              <b-col cols="3" class="text-sm-center"><b>{{$t('inv.added')}}</b></b-col>
              <template v-for="(i,n) in data.item.details">
                <b-col cols="3" :key="n" v-if="n % 3 ===0"><b-checkbox :id="n+'_'+data.item.id" v-model="data.item.selected" :value="(n===0)? n+'@'+data.item.d[n]:(n/3)+'@'+data.item.d[(n/3)]" class="float-right" @change="check($event,data.item)"></b-checkbox></b-col>
                <b-col cols="3" class="text-sm-center mt-1" :key="i+n+'a'"><b>{{i}}</b></b-col>
              </template>
            </b-row>
          </b-card>
          <DelModal :data="data"/>
          <EditModal :data="data"/>
        </template>
      </b-table>
    </div>
    <AddModal :data="invList" :catList="catList" :companyList="companyList" :unitList="unitList"/>
  </div>
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'
import AddModal from '../components/inventory/AddModal.vue'
import DelModal from '../components/inventory/Delmodal.vue'
import EditModal from '../components/inventory/Editmodal.vue'
import { db, doc, onSnapshot, perf, trace} from "../fire"

export default {
  name: 'Inventory',
  components:{
    AddModal,
    EditModal,
    DelModal
  },
  data(){
    return{
      brandL: store.getters.getLocation,
      invList:[],
      filter: null,
      catList:[],
      companyList:[],
      unitList:[],
      selected:[],
      sortBy: 'Last_added',
      sortDesc: true,
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
        {"key":"Used",label:this.$i18n.t('inv.used')},
        {"key":"Unit",label:this.$i18n.t('inv.unit')},
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
            var data = doc.data()[x]['data'],
            val = [],
            i = 0;
            var added = '',
            sum = 0;
            for(i in data){
              var j = data[i].split('_');
              val.push(j[1],j[2],j[3]);
              sum +=parseInt(j[1]);
            }
            added = val[val.length-1];
            request.push({
              Category:y[0],
              Name:y[2],
              Available:sum,
              Unit:y[3],
              Used:'-',
              Company_name:y[1],
              Last_added:added,
              Company_tele:doc.data()[x]['tele'] || "N/A",
              details: val,
              id:x,
              selected:[],
              delete:true,
              edit:true,
              d:data
            });
          }
        }
        this.invList = request;
      });
      t.stop();
    },
    async check(e,data){
      this.$nextTick(() => {
        if(data.selected.length>1){
          data.delete = false;
          data.edit = true;
        }else if(data.selected.length==1){
          data.delete = false;
          data.edit = false;
        }else{
          data.delete = true;
          data.edit = true;
        }
      })
    },
    async toggleDetails(row){
      row.toggleDetails();
      row.item.selected = [];
      row.item.delete = true;
      row.item.edit = true;
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
