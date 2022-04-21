<template>
  <b-modal ref="addModal" id="addModal" :title="$t('inv.add')" @hide="hideModal('addModal')" centered> 
    <b-row>
      <b-col cols="12" class="mt-2">
        <a class="space">{{$t('inv.category')}}</a>
        <b-form-input v-model="catVal" list="cat-list" :placeholder="$t('inv.catInput')"></b-form-input>
        <datalist id="cat-list">
          <option v-for="cat in catList" :key="cat">{{ cat }}</option>
        </datalist>
      </b-col>
      <b-col cols="6" class="mt-2">
        <a class="space">{{$t('inv.company')}}</a>
        <b-form-input v-model="companyVal" list="company-list" :placeholder="$t('inv.companyInput')"></b-form-input>
        <datalist id="company-list">
          <option v-for="co in companyList" :key="co">{{ co }}</option>
        </datalist>
      </b-col>
      <b-col cols="6" class="mt-2">
        <a class="space">{{$t('inv.tele')}}</a>
        <b-form-input v-model="teleVal" id="invTele" type="number"></b-form-input>
      </b-col>
      <b-col cols="12" class="mt-2">
        <a class="space">{{$t('inv.item')}}</a>
        <b-form-input v-model="itemVal" id="invItem" type="text"></b-form-input>
      </b-col>
      <b-col cols="6" class="mt-2">
        <a class="space">{{$t('inv.date')}}</a>
        <b-form-input v-model="dateVal" id="invDate" type="date"></b-form-input>
      </b-col>
      <b-col cols="6" class="mt-2">
        <a class="space">{{$t('inv.time')}}</a>
        <b-form-input v-model="timeVal" id="invTime" type="time"></b-form-input>
      </b-col>
      <b-col cols="4" class="mt-2">
        <a class="space">{{$t('inv.quantity')}}</a>
        <b-form-input v-model="quantityVal" id="invQuantity" type="number"></b-form-input>
      </b-col>
      <b-col cols="4" class="mt-2">
        <a class="space">{{$t('inv.unit')}}</a>
        <b-form-input v-model="unitVal" list="unit-list" :placeholder="$t('inv.unitInput')"></b-form-input>
        <datalist id="unit-list">
          <option v-for="un in unitList" :key="un+'a'">{{ un }}</option>
        </datalist>
      </b-col>
      <b-col cols="4" class="mt-2">
        <a class="space">{{$t('inv.price')}}</a>
        <b-form-input v-model="priceVal" id="invPrice" type="number"></b-form-input>
      </b-col>
    </b-row>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="outline-success" class="float-right ml-1 text-14" @click="addItem()" :disabled="btnState == 1">{{$t('inv.add')}}</b-button>
        <b-button variant="outline-dark text-14" class="float-right" @click="hideModal('addModal')">{{$t('inv.cancel')}}</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import store from '../../store/store'
import { functions, httpsCallable, increment, arrayUnion, db, doc, setDoc, updateDoc, collection, query, where, onSnapshot, auth, updatePassword,EmailAuthProvider,reauthenticateWithCredential, perf, trace} from "../../fire"

export default {
  name:'modal',
  data(){
    return{
      brandL: store.getters.getLocation,
      catVal:'',
      itemVal:'',
      companyVal:'',
      teleVal:'',
      dateVal:'',
      timeVal:'',
      quantityVal:'',
      unitVal:'',
      priceVal:'',
    }
  },
  props:{
    catList: {type: Array},
    companyList: {type: Array},
    unitList: {type: Array}
  },
  computed:{
    'btnState':function(){
      if(this.catVal.length > 0 && this.itemVal.length > 0 && this.companyVal.length > 0 && this.teleVal.length > 0 && this.dateVal.length > 0 && this.timeVal.length > 0 && this.quantityVal.length > 0 && this.unitVal.length > 0 && this.priceVal.length > 0){return 0}
      else{return 1}
    }
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
      this.catVal='';
      this.itemVal='';
      this.companyVal='';
      this.teleVal='';
      this.dateVal='';
      this.timeVal='';
      this.quantityVal='';
      this.unitVal='';
      this.priceVal='';
    },
    async addItem(){
      const t = trace(perf,"addInventory");
			t.start();
      const newData = doc(db, "inventory", this.brandL);
      if(!this.catList.includes(this.catVal)){
        await updateDoc(newData,{category: arrayUnion(this.catVal)});
      }
      if(!this.companyList.includes(this.companyVal)){
        await updateDoc(newData,{company: arrayUnion(this.companyVal)});
      }
      if(!this.unitList.includes(this.unitVal)){
        await updateDoc(newData,{unit: arrayUnion(this.unitVal)});
      }
      await updateDoc(newData,{
        [this.catVal+"_"+this.companyVal+"_"+this.itemVal+"_"+this.unitVal]:{
          ['added']:arrayUnion(this.dateVal+' '+this.timeVal),
          ['price']:arrayUnion(this.priceVal),
          ['quantity']:arrayUnion(this.quantityVal),
          ['tele']:this.teleVal
        }
      },{merge:true})
      this.hideModal('addModal');
      t.stop();
    }
  }
}
</script>

<style scoped>
.spcae{
  white-space: pre-line;
}
a{
  color:initial;
}
.text-14{
  font-size: 14px;
}
</style>
