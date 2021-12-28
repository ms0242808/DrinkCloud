<template>
  <b-modal :ref="modalRef" :id="modalRef" :title="title" @hide="hideModal(modalRef)" centered> 
    <div>
      <a v-if="modalRef!=='setCat' && modalRef!=='setIngre'">{{content}}</a>
      <b-input v-if="input" v-model="inputVal" placeholder="Enter category name"></b-input>
      <b-form-select v-else-if="select" v-model="switchSel"></b-form-select>
      <template v-else-if="vCat">
        <div v-for="(item,index) in catList" :key="index">
          <div class="col-12 d-flex flex-justify-between">
            {{item.title}}
            <hr>
            <b-form-checkbox switch class="mr-n2" v-model="item.state" @change="catState(item.state,item.og)">
              <span class="sr-only">Switch for following text input</span>
              <label class='form-check-label' :for="item.state"></label>
            </b-form-checkbox>
          </div>
        </div>
      </template>
      <b-row v-else-if="vIng" >
        <template v-for="(item,index,a,b) in ingList">
          <b-col lg="12" md="12" :key="a" v-if="index==0 || index==2 || index==12">
            <h5 v-if="index==0">Diary</h5>
            <h5 v-else-if="index==2">Tea</h5>
            <h5 v-else-if="index==12">Juice</h5>
          </b-col>
          <b-col lg="6" md="12" :key="index">
            <label>{{ingLabel[index]}}</label>
            <b-input v-model="ingList[index]" :placeholder="ingLabel[index]" :value="item" @change="ingState()"></b-input>
          </b-col>
          <b-col lg="12" md="12" :key="b" v-if="index==1 || index==11">
            <hr>
          </b-col>
        </template>
      </b-row>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="success" class="float-right ml-1" @click="useFunction(fnName,modalRef)" :disabled="btnState == 1 && btnText !== 'Publish' ">{{btnText}}</b-button>
        <b-button variant="outline-dark" class="float-right" @click="hideModal(modalRef)">cancel</b-button>
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
      inputVal:'',
      ingInput:0,
      catSwitch:0,
      ingLabel:['Milk1','Milk2','Tea1','Tea2','Tea3','Tea4','Tea5','Tea6','Tea7','Tea8','Tea9','Tea10','Juice1','Juice2','Juice3','Juice4','Juice5','Juice6','Juice7','Juice8']
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
    vCat: {type: Boolean},
    vIng: {type: Boolean},
    catList: {type: Array},
    ingList: {type: Array}
  },
  computed:{
    'btnState':function(){
      if(this.inputVal.length > 0 || this.ingInput == 1 || this.catSwitch == 1){return 0}
      else{return 1}
    }
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
      this.inputVal = '';
      this.ingInput = 0;
      this.catSwitch = 0;
    },
    useFunction(fn,modalRef){
      this[fn](modalRef);
    },
    ingState(){
      if(this.ingList.includes('')){this.ingInput = 0}
      else{this.ingInput = 1}
    },
    catState(n,o){
      if(n == o){this.catSwitch = 0}
      else{this.catSwitch = 1}
    },
    async addCat(modalRef){
      console.log('addCat');
      // var catT = this.inputVal;
      // var manageCategory = httpsCallable(functions,'manageCategory'); //status=0
      // await manageCategory({docPath:'recipes/'+this.brandL, category:catT,drink:'', status:0});
      // hideModal(modalRef);
    },
    async setIngre(modalRef){
      console.log('setIngre');
      console.log(this.ingList.length,this.ingList); // cancel modal reset
      // var updateIngre = httpsCallable(functions,'updateIngre');
      // await updateIngre({docPath:'recipes/'+this.brandL, ingre:this.ingList}).then(result => {
        // hideModal(modalRef);
      // });
    },
    async setCat(modalRef){
      console.log('setCat');
      // console.log(this.catList);
      var cat = {};
      var x = 0;
      for(x in this.catList){
        cat[this.catList[x].title] = this.catList[x].state
      }
      console.log(cat);
      // var manageCategory = httpsCallable(functions,'manageCategory');
      // await manageCategory({docPath:'recipes/'+this.brandL, category:cat, status:3}).then(result => {
        // hideModal(modalRef);
      // });
    },
    async publish(modalRef){
      console.log('publish');
      // var publishRecipe = httpsCallable(functions,'publishRecipe');
      // await publishRecipe({docPath:'recipes/'+this.brandL}).then(result => {
        // hideModal(modalRef);
      // });
    }
  }
}
</script>

<style scoped>

</style>
