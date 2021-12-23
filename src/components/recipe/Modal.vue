<template>
  <b-modal :ref="modalRef" :id="modalRef" :title="title" @hide="hideModal(modalRef)" centered> 
    <div>
      <a>{{content}}</a>
      <b-input v-if="input" v-model="inputVal"></b-input>
      <b-form-select v-if="select" v-model="switchSel"></b-form-select>
      <!-- <div v-if="list"></div> -->
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right ml-1" @click="useFunction(fnName)">{{btnText}}</b-button>
        <b-button class="float-right" @click="hideModal(modalRef)">cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { functions, httpsCallable, db } from "../../fire";
import store from '../../store/store'
export default {
  name:'modal',
  data(){
    return{
      brandL: store.getters.getLocation,
      switchSel:'0',
      inputVal:'',
    }
  },
  props:{
    modalRef: {type: String},
    title: {type: String},
    content: {type: String},
    input: {type: Boolean},
    select: {type: Boolean},
    btnText: {type: String},
    fnName: {type: String},
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
      this.inputVal = '';
      this.switchSel = '0';
    },
    useFunction(fn){
      this[fn]();
    },
    async addCat(){
      console.log('addCat');
      // var catT = this.inputVal;
      // var manageCategory = httpsCallable(functions,'manageCategory'); //status=0
      // await manageCategory({docPath:'recipes/'+this.brandL, category:catT,drink:'', status:0});
    },
    async setIngre(){
      console.log('setIngre');
      // var ingre = [];
      // $('.ingreInput').map(async function(){
      //   ingre.push($(this).val());
      // }).get();
      // var updateIngre = httpsCallable(functions,'updateIngre');
      // await updateIngre({docPath:'recipes/'+this.brandL, ingre:ingre}).then(result => {
      
      // });
    },
    async setCat(){
      console.log('setCat');
      // var cat = {};
      // $('.catInput').map(async function(){
      //   if($(this).attr('data-og')!=$(this).val()){
      //     var tick = true;
      //     if($(this).val() == 0){tick = false}
      //     cat[$(this).attr('data-name')] = tick;
      //   }
      // }).get();
      // var manageCategory = httpsCallable(functions,'manageCategory');
      // await manageCategory({docPath:'recipes/'+this.brandL, category:cat, status:3}).then(result => {
      
      // });
    },
    async publish(){
      console.log('publish');
      // var publishRecipe = httpsCallable(functions,'publishRecipe');
      // await publishRecipe({docPath:'recipes/'+this.brandL}).then(result => {
      //   $('.modal-backdrop').remove();
      //   $('body').removeClass('modal-open');
      //   lbtn("recipe");
      // });
    },
    async switchCat(tea,current){
      var val = this.switchSel;
      console.log(this.brandL,tea,current,val);
      // var swapRecipe = httpsCallable(functions,'swapRecipe');
      // await swapRecipe({docPath:'recipes/'+this.brandL, tea:tea, current:current, val:val}).then(async result => {
      //   this.hideModal('Switch'+tea);
      // });
    },
    async delRecipe(tea,current){
      console.log(tea,current);
      // var manageCategory = httpsCallable(functions,'manageCategory');
      // await manageCategory({docPath:'recipes/'+this.brandL, category:current,drink:tea, status:2}).then(async result => {
      //   var removeRecipe = httpsCallable(functions,'removeRecipe');
      //   await removeRecipe({docPath:'recipes/'+this.brandL,drink:tea}).then(result => {
      //     this.hideModal('del'+tea);
      //   });
      // });
    },
    async addRecipe(){
      // var addRecipe = httpsCallable(functions,'addRecipe'); //status=0
      console.log(1);
    }
  }
}
</script>

<style scoped>

</style>
