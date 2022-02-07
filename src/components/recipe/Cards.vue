<template>
  <b-card-group deck>
    <div v-show="skele[0]" class="w-100 no-gutters noMaxWidth container">
      <b-row>
        <b-col cols="8">
          <b-skeleton height="30px"></b-skeleton>
        </b-col>
        <b-col cols="4">
          <b-skeleton height="30px"></b-skeleton>
        </b-col>
        <b-col lg="3" md="4">
          <b-card class="no-gutters container no-putters mt-2">
            <b-row>
              <b-col cols="3">
                <b-skeleton height="30px"></b-skeleton>
              </b-col>
              <b-col cols="6">
                <b-skeleton height="30px"></b-skeleton>
              </b-col>
              <b-col cols="3">
                <b-skeleton height="30px"></b-skeleton>
              </b-col>
              <b-col cols="12" class="mt-3">
                <b-skeleton height="50px"></b-skeleton>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col lg="3" md="4">
          <b-card class="no-gutters container no-putters mt-2">
            <b-row>
              <b-col cols="3">
                <b-skeleton height="30px"></b-skeleton>
              </b-col>
              <b-col cols="6">
                <b-skeleton height="30px"></b-skeleton>
              </b-col>
              <b-col cols="3">
                <b-skeleton height="30px"></b-skeleton>
              </b-col>
              <b-col cols="12" class="mt-3">
                <b-skeleton height="50px"></b-skeleton>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-row v-for="(item, index) in recipeVal" v-bind:key="index" v-show="skele[1]" class="w-100 no-gutters noMaxWidth container">
      <b-col cols="12" class="mt-3 container">
        <b-row class="catRow">
          <b-col :class="item.class" cols="6" class="text-dark text-bold">
            {{item.id}}
          </b-col>
          <b-col cols="6" class="text-end text-i">
            {{$t('recipe.subCountTitle')}}{{item.onDrink.length}}, {{item.drinkCount}} {{$t('recipe.subCountOn')}}
          </b-col>
        </b-row>
        <hr>
      </b-col>
      <b-col v-for="(title, index) in item.onDrink" :key="'on'+index" lg="3" md="4" class="mt-3">
        <b-card class="border-left-success" :class="{'opacity07':!item.status}">
          <b-row>
            <b-col cols="3" class="text-center no-putters">
              <b-button v-b-modal="'Switch'+title" variant="transparent" class="switch"><font-awesome-icon fixed-width icon="exchange-alt"/></b-button>
              <b-modal :ref="'Switch'+title" :id="'Switch'+title" centered :title="title+$t('recipe.switch title')+item.id" @hide="hideModal('Switch'+title)">
                <div >
                  <a class="text-dark">{{$t('recipe.switch msg')}}</a>
                  <b-form-select class="mt-2" v-model="switchSel" :options="switchOpt(item.id)"></b-form-select>
                </div>
                <template #modal-footer>
                  <div class="w-100">
                    <b-button variant="outline-success" class="ml-1 float-right text-14" @click="switchCat(title,item)" :disabled="switchDis">{{$t('recipe.switch')}}</b-button>
                    <b-button variant="outline-dark" class="ml-1 float-right text-14" @click="hideModal('Switch'+title)">{{$t('recipe.cancel')}}</b-button>
                  </div>
                </template>
              </b-modal>
            </b-col>
            <b-col cols="6" class="text-center no-putters m-auto0 text-14 text-dark">
              {{title}}
            </b-col>
            <b-col cols="3" class="text-center text-danger no-putters">
              <b-button v-b-modal="'del'+title" variant="transparent" class="bin"><font-awesome-icon fixed-width icon="trash-alt"/></b-button>
              <b-modal :ref="'del'+title" :id="'del'+title" centered :title="$t('recipe.delete title')" @hide="hideModal('del'+title)">
                <div >
                  <a class="text-dark">{{$t('recipe.delete msg')}}: <b>{{title}}</b></a>
                </div>
                <template #modal-footer>
                  <div class="w-100">
                    <b-button variant="outline-danger" class="ml-1 float-right text-14" @click="delRecipe(title,item)">{{$t('recipe.delete')}}</b-button>
                    <b-button variant="outline-dark" class="ml-1 float-right text-14" @click="hideModal('del'+title)">{{$t('recipe.cancel')}}</b-button>
                  </div>
                </template>
              </b-modal>
            </b-col>
            <b-col cols="12" class="mt-3 text-center">
              <b-button @click="$router.push('/recipe/'+item.id+'-'+title)" variant="outline-dark" class="text-14">{{$t('recipe.edit')}}</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col v-for="(title, index) in item.offDrink" :key="'off'+index" lg="3" md="4" class="mt-3">
        <b-card class="border-left-dark" :class="{'opacity07':!item.status}">
          <b-row>
            <b-col cols="3" class="text-center no-putters">
              <b-button v-b-modal="'Switch'+title" variant="transparent" class="switch"><font-awesome-icon fixed-width icon="exchange-alt"/></b-button>
              <b-modal :ref="'Switch'+title" :id="'Switch'+title" centered :title="title+$t('recipe.switch title')+item.id" @hide="hideModal('Switch'+title)">
                <div >
                  <a class="text-dark">{{$t('recipe.switch msg')}}</a>
                  <b-form-select class="mt-2" v-model="switchSel" :options="switchOpt(item.id)"></b-form-select>
                </div>
                <template #modal-footer>
                  <div class="w-100">
                    <b-button variant="outline-success" class="ml-1 float-right text-14" @click="switchCat(title,item)">{{$t('recipe.switch')}}</b-button>
                    <b-button variant="outline-dark" class="ml-1 float-right text-14" @click="hideModal('Switch'+title)">{{$t('recipe.cancel')}}</b-button>
                  </div>
                </template>
              </b-modal>
            </b-col>
            <b-col cols="6" class="text-center no-putters m-auto0 text-14 text-dark">
              {{title}}
            </b-col>
            <b-col cols="3" class="text-center no-putters">
              <b-button v-b-modal="'del'+title" variant="transparent" class="bin"><font-awesome-icon fixed-width icon="trash-alt"/></b-button>
              <b-modal :ref="'del'+title" :id="'del'+title" centered :title="$t('recipe.delete title')" @hide="hideModal('del'+title)">
                <div >
                  <a class="text-dark">{{$t('recipe.delete msg')}}: <b>{{title}}</b></a>
                </div>
                <template #modal-footer>
                  <div class="w-100">
                    <b-button variant="outline-danger text-14" class="ml-1 float-right" @click="delRecipe(title,item)">{{$t('recipe.delete')}}</b-button>
                    <b-button variant="outline-dark" class="ml-1 float-righ text-14" @click="hideModal('del'+title)">{{$t('recipe.cancel')}}</b-button>
                  </div>
                </template>
              </b-modal>
            </b-col>
            <b-col cols="12" class="mt-3 text-center">
              <b-button @click="$router.push('/recipe/'+item.id+'-'+title)" variant="outline-dark" class="text-14">{{$t('recipe.edit')}}</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="3" md="4" class="mt-3">
        <b-card>
          <b-row>
            <b-col cols="12" class="mt-4 mb-4 text-center">
              <div v-if="item.addShow">
                <b-input v-model="item.addRecipe" @change="btnStatus(item)" :placeholder="$t('recipe.inputdrink')"></b-input>
                <b-button class="mt-1 text-14" variant="outline-dark" @click="showAdd(item)">{{$t('recipe.cancel')}}</b-button>
                <b-button class="ml-1 mt-1 text-14" variant="success" @click="addRecipe(item)" :disabled='item.btnState == 1'>{{$t('recipe.submit')}}</b-button>
              </div>
              <b-button v-else variant="outline-success" @click="addInput(item)" class="text-14"><font-awesome-icon fixed-width icon="plus"/>{{$t('recipe.add')}}</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div class="nodata" v-show="showNodata">
      <div class="text-center w-100">
        <h3 class="font-weight-bold" dlang="recipe-no data">{{$t('recipe.no data')}}</h3>
        <p dlang="recipe-step1">{{$t('recipe.step1')}}</p>
        <p dlang="recipe-step2">{{$t('recipe.step2')}}</p>
      </div>
    </div>
  </b-card-group>
</template>

<script>
import { functions, httpsCallable, db, perf } from "../../fire";
import store from '../../store/store'

export default {
  name:'cards',
  data(){
    return{
      brandL: store.getters.getLocation,
      switchSel:'0',
      newRecipe:'',
      addShow: false
    }
  },
  props:{
    showSke: {type: Boolean},
    showVal: {type: Boolean},
    nodata: {type: Boolean},
    recipes: {type: Array}
  },
  computed:{
    'skele':function(){
      return [this.showSke,this.showVal]
    },
    'recipeVal':function(){
      return store.getters.getRecipe.recipeVal
    },
    'showNodata':function(){
      return this.nodata
    },
    'switchDis':function(){
      var dis = true;
      if(this.switchSel !== '0'){dis = false}
      return dis
    }
  },
  methods:{
    hideModal(id){
      this.$refs[id][0].hide();
      this.switchSel = '0';
    },
    switchOpt(val){
      var x = 0,
      cat = [{value:'0',text:this.$i18n.t('recipe.selectDefault'), disabled: true}];
      for(x in this.recipeVal){
        if(val !== this.recipeVal[x].id){cat.push({value:this.recipeVal[x].id,text:this.recipeVal[x].id})}
      }
      return cat
    },
    async switchCat(tea,item){
      const trace = perf.trace("switchRecipe");
			trace.start();
      var val = this.switchSel;
      var swapRecipe = httpsCallable(functions,'swapRecipe');
      await swapRecipe({docPath:'recipes/'+this.brandL, tea:tea, current:item.id, val:val}).then(result => {
        this.pushRecipe(val,tea);
        this.removeRecipe(tea,item);
        this.hideModal('Switch'+tea);
      });
      trace.stop();
    },
    async delRecipe(tea,item){
      const trace = perf.trace("removeRecipe");
			trace.start();
      var manageCategory = httpsCallable(functions,'manageCategory');
      await manageCategory({docPath:'recipes/'+this.brandL, category:item.id,drink:tea, status:2}).then(result => {
        var removeRecipe = httpsCallable(functions,'removeRecipe');
        removeRecipe({docPath:'recipes/'+this.brandL,drink:tea}).then(result => {
          this.removeRecipe(tea,item);
          this.hideModal('del'+tea);
        });
      });
      trace.stop();
    },
    async addInput(item){      
      item.addShow = true;
    },
    async showAdd(item){
      item.addShow = false;
      item.addRecipe = '';
      item.btnState = 1;
    },
    async addRecipe(item){
      const trace = perf.trace("addNewRecipe");
			trace.start();
      var cat = item.id,
      tea = item.addRecipe;
      var manageCategory = httpsCallable(functions,'manageCategory');
      await manageCategory({docPath:'recipes/'+this.brandL, category:cat,drink:item.addRecipe, status:1}).then(()=>{
        var addRecipe = httpsCallable(functions,'addRecipe'); //status=0
        addRecipe({docPath:'recipes/'+this.brandL,drink:tea, status:0}).then(()=>{
          this.pushRecipe(cat,tea);
          item.addShow = false;
          item.addRecipe = '';
          item.btnState = 1;
        });
      });
      trace.stop();
    },
    async btnStatus(item){
      if(item.addRecipe.length>0){item.btnState = 0}
      else{item.btnState = 1}
    },
    pushRecipe(cat,tea){
      var x = 0;
      for(x in this.recipeVal){
        if(this.recipeVal[x].id == cat){
          this.recipeVal[x].drinkCount = this.recipeVal[x].drinkCount + 1;
          if(this.recipeVal[x].onDrink.length<10){this.recipeVal[x].onDrink.push(tea)}
          else{this.recipeVal[x].offDrink.push(tea)}
        }
      }
    },
    removeRecipe(tea,item){
      var x = 0;
      for(x in this.recipeVal){
        if(this.recipeVal[x].id == item.id){
          if(this.recipeVal[x].onDrink.includes(tea)){this.recipeVal[x].onDrink = this.removeEle(this.recipeVal[x].onDrink,tea)}
          else{this.recipeVal[x].offDrink = this.removeEle(this.recipeVal[x].offDrink,tea)}
          this.recipeVal[x].drinkCount = this.recipeVal[x].drinkCount - 1;
        }
      }
    },
    removeEle(arr,val){
      var index = arr.indexOf(val);
      if (index > -1) {arr.splice(index, 1)}
      return arr;
    }
  }
}
</script>

<style scoped>
.nodata{
  width: 100%;
  align-items: center;
  min-height: 70vh;
  display: flex;
}
@media (min-width: 576px){
	.card-deck{
		display: flex;
    flex-flow: row wrap;
	}
	.card{
		max-width: 100%;
	}
}
hr{
  margin: 6px 0;
}
.card{
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 0;
	word-wrap: break-word;
	background-color: #fff;
	background-clip: border-box;
	border: 1px solid #e3e6f0;
	border-radius: 0.35rem;
	box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}
.opacity07{
  opacity: 0.7;
}
.m-auto0{
  margin: auto 0;
}
.noMaxWidth{
  max-width: unset !important;
}
.text-14{
  font-size: 14px;
}
a,.text-i{
  color:initial;
}
@media (min-width: 768px){
	.catRow{
    margin-left: 0;
    margin-right: 0;
  }
}
.switch:hover{
  color:#0081C8;
}
.bin:hover{
  color: red;
}
</style>
