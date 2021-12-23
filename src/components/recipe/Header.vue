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
    <Modal :modalRef='modalRef' :title='title' :content='content' :input='input' :select='select' :btnText='btnText' :fnName='fnName' :vRender='vRender' :vhtml='vhtml'/>
  </div>
</template>

<script>
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
      vRender: false,
      vhtml:''
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
      this.vRender = false;
      if(name=='setCat'){
        this.vhtml = '<a>List of switch</a>';
        this.vRender = true;
        this.input = false;
      }else if(name=='setIngre'){
        this.vhtml = '<a>List of input</a>';
        this.vRender = true;
        this.input = false;
      }else if(name=='publish'){
        this.input = false;
      }
      else{this.vhtml = ''}
    }
  }
}
</script>>

<style scoped>

</style>
