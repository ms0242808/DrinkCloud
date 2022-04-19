<template>
  <div class="wrapper">
    <h3>{{$t('inv.title')}}</h3>
    <div class="mt-3">
      <b-row>
        <b-col sm="12" lg="6">
          <b-button size="sm" class="mx-1" variant="success" v-b-modal="'addModal'"><font-awesome-icon fixed-width icon="plus"/>{{$t('inv.add')}}</b-button>
          <b-button size="sm" class="mx-1" variant="outline-danger"><font-awesome-icon fixed-width icon="trash-alt"/>{{$t('inv.delete')}}</b-button>
          <!-- <b-button size="sm" class="mx-1" variant="outline-dark"><font-awesome-icon fixed-width icon="cog"/>{{$t('inv.setting')}}</b-button> -->
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
      <b-table striped hover responsive :items="invList" :fields="fields" :filter="filter" class="mt-3">

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
import { functions, httpsCallable, db, doc, setDoc, updateDoc, collection, query, where, onSnapshot, auth, updatePassword,EmailAuthProvider,reauthenticateWithCredential, perf, trace} from "../fire"

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
      unitList:[]
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
        {"key":"Comapny name",label:this.$i18n.t('inv.company')},
        {"key":"Last added",label:this.$i18n.t('inv.last_added')},
        {"key":"Action",label:this.$i18n.t('inv.action')}
      ]
    }
  },
  methods:{
    async getinputList(){
      const t = trace(perf,"getInputList");
			t.start();
      const unsubscribe = onSnapshot(doc(db, "inventory", this.brandL), (doc) => {
        this.catList = doc.data()['category'];
        this.companyList = doc.data()['company'];
        this.unitList = doc.data()['unit'];
      });
      t.stop();
    },
    async getCatTable(){
      // const t = trace(perf,"getCatTable");
			// t.start();
      // list out all find same category && item & company

      // t.stop();
    }
  },
  watch:{
    getLocation(val){
      this.brandL = val;
      // this.loadTable();
    }
  },
  mounted(){
    this.getinputList();
    this.getCatTable();
    // if(this.brandL == '-'){
    //   this.brandL = this.getLocation;
    //   this.getStaff();
    // }
  }
}
</script>

<style scoped>

</style>
