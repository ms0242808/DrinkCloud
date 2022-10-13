<template>
  <div>
    <b-row>
      <b-col class="no-putters container" cols="5">
        <b-skeleton width="70%" height="30px" v-show="skele[0]"></b-skeleton>
        <a v-show="skele[1]">{{$t('recipe.totalCat')}} {{counts[0]}}<br /> {{$t('recipe.totalDrinks')}} {{counts[1]}}</a>
      </b-col>
      <b-col class="no-putters container" cols="7">
        <b-button-group class="float-right" v-show="skele[0]">
          <b-skeleton width="60px" height="30px"></b-skeleton>
        </b-button-group>
        <div class="float-right dflex" v-show="skele[1]">
          <b-button v-b-modal.publish v-show="skele[1]" class="ml-1 mt-1 f-12" variant="outline-primary" @click="showModal('publish','publish','publish msg','publish')"><font-awesome-icon fixed-width icon="upload"/> {{$t('recipe.publish')}}</b-button>
        </div>
      </b-col>
      <b-col class="no-putters container" cols="12">
        <b-button-group class="float-rights" v-show="skele[0]">
          <b-skeleton width="60px" height="30px"></b-skeleton>
          <b-skeleton width="60px" height="30px"></b-skeleton>
          <b-skeleton width="60px" height="30px"></b-skeleton>
        </b-button-group>
        <div class="float-rights dflex" v-show="skele[1]">
          <b-button v-b-modal.addCat class="ml-1 mt-1 f-12" variant="outline-success" @click="showModal('addCat','cat title','cat title','add')"><font-awesome-icon fixed-width icon="plus"/> {{$t('recipe.add')}}</b-button>
          <b-button v-b-modal.setCat class="ml-1 mt-1 f-12" variant="outline-dark" @click="showModal('setCat','category','Cateogry order','save')">{{$t('recipe.category')}}</b-button>
          <b-button v-b-modal.setIngre class="ml-1 mt-1 f-12" variant="outline-dark" @click="showModal('setIngre','ingredients','Ingredients settings','save')">{{$t('recipe.ingredients')}}</b-button>
        </div>
      </b-col>
    </b-row>
    <Modal :modalRef='modalRef' :title='title' :content='content' :input='input' :select='select' :btnText='btnText' :fnName='fnName' :vCat='vCat' :vIng='vIng' :catList='catList' :ingList="ingList"/>
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
  props:{
    showSke: {type: Boolean},
    nodata: {type: Boolean},
    showVal: {type: Boolean},
    recipes: {type: Array},
    totalCat: {type: Number},
    totalDri: {type: Number},
    catList: {type: Array},
    ingList: {type: Array}
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
      vCat: false,
      vIng: false
    }
  },
  computed:{
    'skele':function(){
      return [this.showSke,this.showVal]
    },
    'showNodata':function(){
      return this.nodata
    },
    'counts':function(){
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
      this.vCat = false;
      this.vIng = false;
      if(name=='setCat'){
        this.vCat = true;
        this.input = false;
      }else if(name=='setIngre'){
        this.vIng = true;
        this.input = false;
      }else if(name=='publish'){
        this.input = false;
      }
    }
  }
}
</script>

<style scoped>
.dflex{
  display: flex;
}
.f-12{
  font-size: 12px;
}
a {
  color:initial !important;
}
</style>
