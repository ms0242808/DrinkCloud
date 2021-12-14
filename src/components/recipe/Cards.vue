<template>
  <b-card-group deck>
    <div v-show="skele[0]" class="w-100">
      <b-row>
        <b-col cols="8">
          <b-skeleton height="30px"></b-skeleton>
        </b-col>
        <b-col cols="4">
          <b-skeleton height="30px"></b-skeleton>
        </b-col>
      </b-row>
      <hr>
      <b-col lg="3" md="4">
        <b-card>
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
    </div>

    <b-row v-for="(item, index) in recipeVal" v-bind:key="index" v-show="skele[1]" class="w-100 no-gutters">
      <b-col cols="12" class="mt-3">
        <b-row>
          <b-col :class="item.class" cols="8">
            {{item.id}}
          </b-col>
          <b-col cols="4" class="text-end">
            {{item.onDrink.length}}/{{item.drinkCount}}
          </b-col>
        </b-row>
        <hr>
      </b-col>
      <b-col v-for="(title, index) in item.onDrink" :key="'on'+index" lg="3" md="4" class="mt-3">
        <b-card class="border-left-success" :class="{'opacity07':!item.status}">
          <b-row>
            <b-col cols="3" class="text-center">
              <b-button v-b-modal="'Switch'+title" variant="transparent"><font-awesome-icon fixed-width icon="exchange-alt"/></b-button>
              <!-- <Modal :id="'onSwitch'+index" /> -->
              <b-modal :ref="'Switch'+title" :id="'Switch'+title" centered :title="title+' is on '+item.id" @hide="hideModal('Switch'+title)">
                <div >
                  <a>change to: </a>
                  <b-form-select v-model="switchSel" :options="switchOpt(item.id)"></b-form-select>
                </div>
                <template #modal-footer>
                  <div class="w-100">
                    <b-button variant="primary" class="float-right" @click="switchCat(title,item.id)">Switch</b-button>
                    <b-button class="float-right" @click="hideModal('Switch'+title)">cancel </b-button>
                  </div>
                </template>
              </b-modal>
            </b-col>
            <b-col cols="6" class="text-center no-putters" >
              {{title}}
            </b-col>
            <b-col cols="3" class="text-center text-danger">
              <b-button v-b-modal="'del'+title" variant="transparent"><font-awesome-icon fixed-width icon="trash-alt"/></b-button>
              <b-modal :ref="'del'+title" :id="'del'+title" centered title="Delete recipe" @hide="hideModal('del'+title)">
                <div >
                  <a>Do you want to delete {{title}}? </a>
                </div>
                <template #modal-footer>
                  <div class="w-100">
                    <b-button variant="primary" class="float-right" @click="delRecipe(title,item.id)">Delete</b-button>
                    <b-button class="float-right" @click="hideModal('del'+title)">cancel </b-button>
                  </div>
                </template>
              </b-modal>
            </b-col>
            <b-col cols="12" class="mt-3 text-center">
              <b-button @click="$router.push('/recipe/'+item.id+'-'+title)" variant="outline-primary">Edit</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col v-for="(title, index) in item.offDrink" :key="'off'+index" lg="3" md="4" class="mt-3">
        <b-card class="border-left-dark" :class="{'opacity07':!item.status}">
          <b-row>
            <b-col cols="3" class="text-center">
              <b-button v-b-modal.modal-1 variant="transparent"><font-awesome-icon fixed-width icon="exchange-alt"/></b-button>
            </b-col>
            <b-col cols="6" class="text-center no-putters" >
              {{title}}
            </b-col>
            <b-col cols="3" class="text-center">
              <b-button v-b-modal.modal-1 variant="transparent"><font-awesome-icon fixed-width icon="trash-alt"/></b-button>
            </b-col>
            <b-col cols="12" class="mt-3 text-center">
              <b-button @click="$router.push('/recipe/'+item.id+'-'+title)">Edit</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <div class="nodata" v-show="showNodata">
      <div class="text-center w-100">
        <h3 class="font-weight-bold" dlang="recipe-no data">No data</h3>
        <p dlang="recipe-step1">Clcik <b>"+ ADD"</b> button on the top right corner</p>
        <p dlang="recipe-step2">Add a category name then add the related product</p>
      </div>
    </div>
  </b-card-group>
</template>

<script>
import { functions, httpsCallable, db } from "../../fire";
import store from '../../store/store'
// import Modal from '../recipe/Modal.vue'
export default {
  name:'cards',
  // components:{
  //   Modal
  // },
  data(){
    return{
      brandL: store.getters.getLocation,
      switchSel:'0',
    }
  },
  props: {
    showSke: {type: Boolean },
    showVal: {type: Boolean },
    nodata: {type: Boolean },
    recipes: {type: Array }
  },
  computed:{
    'skele': function(){
      return [this.showSke,this.showVal]
    },
    'recipeVal': function(){
      return store.getters.getRecipe.recipeVal
    },
    'showNodata': function(){
      return this.nodata
    },
  },
  methods:{
    hideModal(id){
      this.$refs[id][0].hide();
      this.switchSel = '0';
    },
    switchOpt(val){
      var x = 0,
      cat = [{value:'0',text:'Select a category',  disabled: true}];
      for(x in this.recipeVal){
        if(val !== this.recipeVal[x].id){
          cat.push({value:this.recipeVal[x].id,text:this.recipeVal[x].id})
        }
      }
      return cat
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
    async addCat(){
      // var recipeT = $('#recipeTitle').val();
      // var addRecipe = httpsCallable(functions,'addRecipe'); //status=0
      // await manageCategory({docPath:'recipes/'+brandL, category:name,drink:drink, status:i});
      // await addRecipe({docPath:'recipes/'+brandL,drink:drink, status:0}); 
      // await addRecipe({docPath:'recipes/'+this.brandL, category:"Drink1",drink:recipeT, status:0}).then(result => {
      
      // });
    },
    async addRecipe(){
      // var addRecipe = httpsCallable(functions,'addRecipe'); //status=0
      
    },
    async setIngre(){
      // var ingre = [];
      // $('.ingreInput').map(async function(){
      //   ingre.push($(this).val());
      // }).get();
      // var updateIngre = httpsCallable(functions,'updateIngre');
      // await updateIngre({docPath:'recipes/'+this.brandL, ingre:ingre}).then(result => {
      
      // });
    },
    async setCat(){
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
      var publishRecipe = httpsCallable(functions,'publishRecipe');
      // await publishRecipe({docPath:'recipes/'+this.brandL}).then(result => {
      //   $('.modal-backdrop').remove();
      //   $('body').removeClass('modal-open');
      //   lbtn("recipe");
      // });
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
</style>
