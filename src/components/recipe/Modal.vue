<template>
  <b-modal :ref="modalRef" :id="modalRef" :title="$t('recipe.'+title)" @hide="hideModal(modalRef)" centered> 
    <div>
      <a v-if="modalRef!=='setCat' && modalRef!=='setIngre'" class="space">{{$t('recipe.'+content)}}</a>
      <b-input v-if="input" v-model="inputVal" :placeholder="$t('recipe.cat label')" class="mt-2"></b-input>
      <b-form-select v-else-if="select" v-model="switchSel"></b-form-select>
      <template v-else-if="vCat">
        <div v-for="(item,index) in catList" :key="index">
          <div class="col-12 d-flex flex-justify-between text-dark">
            {{item.title}}
            <b-form-checkbox switch class="mr-n2" v-model="item.state" @change="catState(item.state,item.og)">
              <label class='form-check-label' :for="item.state"></label>
            </b-form-checkbox>
          </div>
          <hr>
        </div>
      </template>
      <b-row v-else-if="vIng" >
        <template v-for="(item,index,a,b) in ingList">
          <b-col lg="12" md="12" :key="a" v-if="index==0 || index==2 || index==12">
            <h5 v-if="index==0">{{$t('recipe.dairy')}}</h5>
            <h5 v-else-if="index==2">{{$t('recipe.tea')}}</h5>
            <h5 v-else-if="index==12">{{$t('recipe.juice')}}</h5>
          </b-col>
          <b-col cols="6" :key="index" class="mt-2">
            <b-input v-model="ingList[index]" :placeholder="$t('recipe.'+ingLabel[index])" :value="item" @change="ingState()"></b-input>
          </b-col>
          <b-col lg="12" md="12" :key="b" v-if="index==1 || index==11">
            <hr>
          </b-col>
        </template>
      </b-row>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="outline-success" class="float-right ml-1 text-14" @click="useFunction(fnName,modalRef)" :disabled="btnState == 1 && btnText !== 'publish' ">{{$t('recipe.'+btnText)}}</b-button>
        <b-button variant="outline-dark text-14" class="float-right" @click="hideModal(modalRef)">{{$t('recipe.cancel')}}</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { functions, httpsCallable, perf, trace } from "../../fire";
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
      const t = trace(perf,"addCategory");
			t.start();
      var catT = this.inputVal,
      recipes = store.getters.getRecipe.recipeVal,
      x = 0,
      status = true,
      countOn = 0;
      var manageCategory = httpsCallable(functions,'manageCategory'); //status=0
      await manageCategory({docPath:'recipes/'+this.brandL, category:catT,drink:'', status:0}).then(result => {
        for(x in recipes){if(recipes[x].status){countOn++}}
        if(countOn>=10){status  = false}
        var border = (status) ? "border-left-success":"border-left-dark";
        recipes.push({
          id: catT,
          "onDrink":[],
          "offDrink":[],
          "drinkCount":0,
          "status":status,
          "class":border,
          "addShow":false,
          "addRecipe":'',
          'btnState':1
        });
        store.commit('recipeChanged', recipes);
        this.hideModal(modalRef);
      });
      t.stop();
    },
    async setIngre(modalRef){
      const t = trace(perf,"updateIngre");
			t.start();
      var updateIngre = httpsCallable(functions,'updateIngre');
      await updateIngre({docPath:'recipes/'+this.brandL, ingre:this.ingList}).then(result => {
        var header = store.getters.getRecipe.header,
        y = 0;
        for(var x=8; x<=27; x++){
          header[x]= this.ingList[y];
          y++;
        }
        store.commit('recipeHeader',header);
        this.hideModal(modalRef);
      });
      t.stop();
    },
    async setCat(modalRef){
      const t = trace(perf,"setCategory");
			t.start();
      var cat = {},
      rawState = [],
      x = 0;
      for(x in this.catList){
        cat[this.catList[x].title] = this.catList[x].state
        rawState.push(this.catList[x].state);
      }
      var manageCategory = httpsCallable(functions,'manageCategory');
      await manageCategory({docPath:'recipes/'+this.brandL, category:cat, status:3}).then(result => {
        var recipes = store.getters.getRecipe.recipeVal;
        for(x in recipes){
          recipes[x].status = rawState[x];
          recipes[x].class = (recipes[x].status) ? "border-left-success":"border-left-dark";
          recipes[x].border = (recipes[x].status) ? "border-left-success":"border-left-dark";
        }
        store.commit('recipeChanged', recipes);
        this.hideModal(modalRef);
      });
      t.stop();
    },
    async publish(modalRef){
      const t = trace(perf,"publishRecipe");
			t.start();
      var publishRecipe = httpsCallable(functions,'publishRecipe');
      await publishRecipe({docPath:'recipes/'+this.brandL,brand:this.brandL}).then(result => {
        this.hideModal(modalRef);
      });
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
