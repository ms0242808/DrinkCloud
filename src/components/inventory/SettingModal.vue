<template>
  <b-modal ref="setModal" id="setModal" :title="$t('inv.setting')" @hide="hideModal('setModal')" centered> 
    <b-row>
      <b-col cols="6" class="mt-2">
        <!-- <a class="space">{{$t('inv.tele')}}</a> -->
        <a class="space">{{$t('inv.item')}}</a>
      </b-col>
      <b-col cols="6" class="mt-2">
        <!-- <a class="space">{{$t('inv.tele')}}</a> -->
        <a class="space">{{$t('inv.produce')}}</a>
      </b-col>
      <template v-for="(item,n) in data">
        <b-col cols="6" class="mt-2" :key="n+'L'+item">
          <!-- <a class="space">{{item.id}}</a> -->
          <a class="space">{{item.Category}} : </a><!-- - -->
          <!-- <a class="space">{{item.Company_name}} : </a> -->
          <a class="space">{{item.Name}}({{item.Company_name}})/</a>
          <a class="space">{{item.Unit}}</a>
        </b-col>
        <b-col cols="6" class="mt-2 d-flex" :key="n+'R'+item">
          <b-form-input v-model="item.produce" id="invPrice" type="number"></b-form-input>
          <b-checkbox v-model="item.produce" value='0' unchecked-value='0' class="mx-2 text-dark"> {{$t('inv.exclude')}} </b-checkbox>
        </b-col>
      </template>
    </b-row>
    <!-- {{data}} -->
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="outline-success" class="float-right ml-1 text-14" @click="saveSet()" :disabled="btnState == 1"><b>{{$t('inv.save')}}</b></b-button>
        <b-button variant="outline-dark text-14" class="float-right" @click="hideModal('setModal')">{{$t('inv.cancel')}}</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import store from '../../store/store'
import { arrayUnion, db, doc,updateDoc, perf, trace} from "../../fire"

export default {
  name:'set_modal',
  data(){
    return{
      brandL: store.getters.getLocation
    }
  },
  props:{
    data: {type:Array}
  },
  computed:{
    'btnState':function(){
      // if(this.catVal.length > 0 && this.itemVal.length > 0 && this.companyVal.length > 0 && this.teleVal.length > 0 && this.dateVal.length > 0 && this.timeVal.length > 0 && this.quantityVal.length > 0 && this.unitVal.length > 0 && this.priceVal.length > 0){return 0}
      // else{return 1}
      return 0
    }
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
      this.data = this.ogVal;
    },
    async saveSet(){
      // const t = trace(perf,"addInventory");
      // t.start();
      // const newData = doc(db, "inventory", this.brandL);
      // if(!this.catList.includes(this.catVal)){
      //   await updateDoc(newData,{category: arrayUnion(this.catVal)});
      // }
      // if(!this.companyList.includes(this.companyVal)){
      //   await updateDoc(newData,{company: arrayUnion(this.companyVal)});
      // }
      // if(!this.unitList.includes(this.unitVal)){
      //   await updateDoc(newData,{unit: arrayUnion(this.unitVal)});
      // }
      // var a = 0,
      // m = [],
      // n = new Date().getTime().toString();
      // for(a in this.data){
      //   if(this.data[a].id === this.catVal+"_"+this.companyVal+"_"+this.itemVal+"_"+this.unitVal){
      //     m = JSON.parse(JSON.stringify(this.data[a].d));
      //   }
      // }
      // m.push(n+"_"+this.quantityVal+"_"+this.priceVal+"_"+this.dateVal+' '+this.timeVal);
      // await updateDoc(newData,{
      //   [this.catVal+"_"+this.companyVal+"_"+this.itemVal+"_"+this.unitVal]:{
      //     ['data']:arrayUnion(...m),
      //     ['tele']:this.teleVal
      //   }
      // },{merge:true})
      // this.hideModal('setModal');
      // t.stop();
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
