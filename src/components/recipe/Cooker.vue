<template>
  <b-card-group deck>
    <b-row class="w-100 no-gutters container noMaxWidth no-putters">
      <b-col cols="12">
        <div class="float-right pd-r-15">
          <b-skeleton width="60px" height="30px" v-show="skele[0]"></b-skeleton>
          <b-button v-show="!editShow&&skele[1]" class="ml-1 mt-1 f-12" variant="outline-success" @click="saveCook()" :disabled="btnDisabled">{{$t('recipe.save')}}</b-button>
          <b-button v-show="!editShow&&skele[1]" class="ml-1 mt-1 f-12" variant="outline-dark" @click="cancelEdit('c')">{{$t('recipe.cancel')}}</b-button>
          <b-button v-show="editShow&&skele[1]" class="ml-1 mt-1 f-12" variant="outline-success" @click="cookEdit()"><font-awesome-icon fixed-width icon="edit"/> {{$t('recipe.edit')}}</b-button>
          <b-button v-b-modal.publish v-show="publishBtn&&editShow&&skele[1]" class="ml-1 mt-1 f-12" variant="outline-primary"><font-awesome-icon fixed-width icon="upload"/> {{$t('recipe.publish')}}</b-button>
        </div>
      </b-col>
      <b-col class="mt-2" lg="3" sm="12" v-for="(item,index) in newCook " :key="index">
        <b-card class="mt-2">
          <b-skeleton v-show="skele[0]" height="400px"></b-skeleton>
          <b-row v-show="skele[1]">
            <b-col cols="12">
              <h6 class="text-dark cookHead" v-show="isDisabled">{{item.name}}</h6>
              <label class="text-dark inputL" v-show="!isDisabled">{{$t('recipe.name')}}</label>
              <b-form-input class="cookInput" type="text" @change="valChange()" v-model="item.name" :value="item.name" :disabled="isDisabled" v-show="!isDisabled"></b-form-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.water')}}</label>
              <b-form-input class="cookInput" type="number" @change="valChange()" v-model="item.water" :value="item.water" :disabled="isDisabled"></b-form-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.cook_temp')}}</label>
              <b-form-input class="cookInput" type="number" @change="valChange()" v-model="item.temp_cook" :value="item.temp_cook" :disabled="isDisabled"></b-form-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.cool_temp')}}</label>
              <b-form-input class="cookInput" type="number" @change="valChange()" v-model="item.temp_cool" :value="item.temp_cool" :disabled="isDisabled"></b-form-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.cook_time')}}</label>
              <b-row>
                <b-col cols="6">
                  <b-form-input class="cookInput" type="number" @change="timeChange(index,'cook_time','min')" :value="item.cook_time.split('-')[0]" :disabled="isDisabled" max="10" min="0"></b-form-input>
                </b-col>
                <b-col cols="6">
                  <b-form-input class="cookInput" type="number" @change="timeChange(index,'cook_time','sec')" :value="item.cook_time.split('-')[1]" :disabled="isDisabled"></b-form-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.stir1_time')}}</label>
              <b-row>
                <b-col cols="6">
                  <b-form-input class="cookInput" type="number" @change="timeChange(index,'stir1_time','min')" :value="item.stir1_time.split('-')[0]" :disabled="isDisabled"></b-form-input>
                </b-col>
                <b-col cols="6">
                  <b-form-input class="cookInput" type="number" @change="timeChange(index,'stir1_time','sec')" :value="item.stir1_time.split('-')[1]" :disabled="isDisabled"></b-form-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.stir2_time')}}</label>
              <b-row>
                <b-col cols="6">
                  <b-form-input class="cookInput" type="number" @change="timeChange(index,'stir2_time','min')" :value="item.stir2_time.split('-')[0]" :disabled="isDisabled"></b-form-input>
                </b-col>
                <b-col cols="6">
                  <b-form-input class="cookInput" type="number" @change="timeChange(index,'stir2_time','sec')" :value="item.stir2_time.split('-')[1]" :disabled="isDisabled"></b-form-input>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <Modal modalRef='publish' title='publish' content='publish msg' btnText='publish' fnName='publishCook'/>
  </b-card-group>
</template>

<script>
import { functions, httpsCallable, perf, trace, collection, query, getDocs,db,orderBy,limit,doc,updateDoc } from "../../fire";
import store from '../../store/store'
import Modal from '../recipe/Modal.vue'
import moment from 'moment'
import Vue from 'vue'
Vue.prototype.moment = moment

export default {
  name:'cooker',
  data(){
    return{
      addShow: false,
      cookRecipe: [],
      newCook:[],
      isDisabled: true,
      btnDisabled: true,
      editShow: true,
      skele:[true,false]
    }
  },
  components:{
    Modal
  },
  props:{
    brandL: {type: String}
  },
  computed:{
    'publishBtn':function(){
      return store.getters.getCookPublish
    }
  },
  async created(){
    setTimeout(() => this.getCook(), 1000);
  },
  methods:{
    async getCook(){
      var x = store.getters.getCook;
      if(x.length>1){
        this.newCook = x;
        var i,j;
        for(i in x){
          var y = {};
          for(j in x[i]){Object.assign(y,{[j]:x[i][j]})}
          this.cookRecipe.push(y);
        }
      }else{
        const t = trace(perf,"getCookRecipe");
        t.start();
        for(var n=1; n<9; n++){
          const q = query(collection(db, "cookrecipes/"+this.brandL+"/recipe"+n),orderBy("added","desc"),limit(1));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.cookRecipe.push(doc.data());
            this.newCook.push(doc.data());
          });
        }
        t.stop();
        store.commit('cookChanged', this.newCook);
      }
      this.skele = [false,true];
    },
    async cookEdit(){
      this.isDisabled = false;
      this.editShow = false;
    },
    async cancelEdit(c){
      this.isDisabled = true;
      this.editShow = true;
      var i,j;
      for(i in this.cookRecipe){
        for(j in this.cookRecipe[i]){
          if(c=="c"){this.newCook[i][j] = this.cookRecipe[i][j]}
          else{this.cookRecipe[i][j] = this.newCook[i][j]}
        }
      }
      this.valChange();
    },
    async valChange(){
      var i,j;
      this.btnDisabled = true;
      for(i in this.cookRecipe){
        for(j in this.cookRecipe[i]){
          if(this.newCook[i][j] != this.cookRecipe[i][j]){return this.btnDisabled = false;}
        }
      }
    },
    async timeChange(index,item,mors){
      var val = event.target.value;
      if(val!==null){
        if(mors=="min"){
          this.newCook[index][item] = val+'-'+this.newCook[index][item].split('-')[1];
        }else{
          if(val.length<2){val = '0'+val.toString()}
          this.newCook[index][item] = this.newCook[index][item].split('-')[0]+'-'+val;
        }
      }
      this.valChange();
    },
    async saveCook(){
      const t = trace(perf,"saveCookRecipe");
      t.start();
      var addCookerRecipe = httpsCallable(functions,'addCookerRecipe');
      var i,j;
      for(i in this.newCook){
        var update = false;
        for(j in this.newCook[i]){
          if(this.newCook[i][j] != this.cookRecipe[i][j]){update = true}
        }
        if(update){
          var d = moment(new Date()).format('YYYYMMDD'),
          ti = moment(new Date()).format('hhmmss');
          await addCookerRecipe({docPath:'cookrecipes/'+this.brandL,
            uploadDate: d.toString(),
            uploadTime: ti.toString(),
            id: (parseInt(i)+1).toString(),
            name: this.newCook[i].name,
            water: this.newCook[i].water,
            temp_cook: this.newCook[i].temp_cook,
            temp_cool: this.newCook[i].temp_cool,
            cook_time: this.newCook[i].cook_time,
            stir1_time: this.newCook[i].stir1_time,
            stir2_time: this.newCook[i].stir2_time,
            from: "web"
          });
        }
      }
      t.stop();
      this.cancelEdit("s");
      store.commit('cookChanged', this.newCook);
      store.commit('cookPublish', true);
    }
  }
}
</script>

<style scoped>
.cookHead{
  text-decoration: underline;
}
.inputL{
  margin-bottom: unset;
}
hr{
  margin: 6px 0;
}
.noMaxWidth{
  max-width: unset !important;
}
@media (min-width: 768px){
  .pd-r-15{
    padding-right: 15px;
  }
}
.form-control:disabled, .form-control[readonly]{
  border: none;
  border-radius: 7px;
}
.cookInput{
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;
}
</style>
