<template>
  <div>
    <b-row>
      <b-col class="no-putters" cols="8">
        <h3>{{$t('recipe.title')}}</h3>
      </b-col>
      <b-col class="no-putters" cols="4">
        <b-button-group class="float-right" v-show="skele[0]">
          <b-skeleton width="80px" height="30px"></b-skeleton>
          <b-skeleton width="80px" height="30px"></b-skeleton>
        </b-button-group>
        <div class="float-right d-flex" v-show="skele[1]">
          <b-button v-b-modal.addCat class="ml-1 mt-1" variant="outline-success" @click="showModal('addCat','Add cateogry','Add new category','Add')">Add</b-button>
          <b-button v-b-modal.publish class="ml-1 mt-1" variant="outline-primary" @click="showModal('publish','Publish recipe','Publish recipe to all machine','Publish')">Publish</b-button>
        </div>
      </b-col>
      <b-col class="no-putters" cols="6">
        <b-skeleton width="70%" height="30px" v-show="skele[0]"></b-skeleton>
        <a v-show="skele[1]">Total Categories: {{counts[0]}}, Total Drinks: {{counts[1]}}</a>
      </b-col>
      <b-col class="no-putters" cols="6">
        <b-button-group class="float-right" v-show="skele[0]">
          <b-skeleton width="60px" height="30px"></b-skeleton>
          <b-skeleton width="60px" height="30px"></b-skeleton>
        </b-button-group>
        <div class="float-right d-flex" v-show="skele[1]">
          <b-button v-b-modal.setCat class="ml-1 mt-1" variant="outline-dark" @click="showModal('setCat','Manage category','Cateogry order','Save')">Manage</b-button>
          <b-button v-b-modal.setIngre class="ml-1 mt-1" variant="outline-dark" @click="showModal('setIngre','Manage ingredients','Ingredients settings','Save')">Settings</b-button>
        </div>
      </b-col>
    </b-row>
    <Modal :modalRef='modalRef' :title='title' :content='content' :input='input' :select='select' :btnText='btnText' :fnName='fnName' />
  </div>
</template>

<script>
import { functions, httpsCallable, db } from "../../fire";
import store from '../../store/store'
import Modal from '../recipe/Modal.vue'

export default {
  name:'recipe-header',
  components:{
    Modal
  },
  props: {
    showSke: {type: Boolean},
    showVal: {type: Boolean},
    recipes: {type: Array},
    totalCat: {type: Number},
    totalDri: {type: Number},
  },
  data(){
    return{
      brandL: store.getters.getLocation,
      modalRef: 'add',
      title: 'add',
      content: 'add',
      input: true,
      select: false,
      btnText: 'Save',
      fnName: 'addRecipe',
    }
  },
  computed:{
    'skele': function(){
      return [this.showSke,this.showVal]
    },
    'counts': function(){
      return [this.totalCat,this.totalDri]
    }
  },
  methods:{
    async showModal(name,title,content,btn){
      this.input = true;
      this.select = false;
      this.modalRef = name;
      this.title = title;
      this.content = content;
      this.btnText = btn;
      this.fnName = name;
    },
    async addCat(){
      // var recipeT = $('#recipeTitle').val();
      // var addRecipe = httpsCallable(functions,'addRecipe'); //status=0
      // await manageCategory({docPath:'recipes/'+brandL, category:name,drink:drink, status:i});
      // await addRecipe({docPath:'recipes/'+brandL,drink:drink, status:0}); 
      // await addRecipe({docPath:'recipes/'+this.brandL, category:"Drink1",drink:recipeT, status:0}).then(result => {
      
      // });
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
      // var publishRecipe = httpsCallable(functions,'publishRecipe');
      // await publishRecipe({docPath:'recipes/'+this.brandL}).then(result => {
      //   $('.modal-backdrop').remove();
      //   $('body').removeClass('modal-open');
      //   lbtn("recipe");
      // });
    }
  //   cardStyle(i){
  //     var style = {};
  //     if(i === 1 || i === 2){style.margin = '0 6px'}
  //     else if(i === 0){style.margin = '0 6px 0 0'}
  //     else{style.margin = '0 0 0 6px'}
  //     return style
  //   }
  }
}
</script>>

<style scoped>

</style>
