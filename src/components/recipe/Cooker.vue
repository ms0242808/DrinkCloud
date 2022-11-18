<template>
  <b-card-group deck>
    <b-row class="w-100 no-gutters container noMaxWidth no-putters">
      <b-col cols="12">
        <div class="float-right pd-r-15"><!--skele[0]-->
          <b-skeleton width="60px" height="30px" v-show="false"></b-skeleton>
          <b-button v-b-modal.publish v-show="!editShow" class="ml-1 mt-1 f-12" variant="outline-success" @click="saveCook()">{{$t('recipe.save')}}</b-button><!--skele[1]-->
          <b-button v-b-modal.publish v-show="!editShow" class="ml-1 mt-1 f-12" variant="outline-dark" @click="cancelEdit('c')">{{$t('recipe.cancel')}}</b-button><!--skele[1]-->
          <b-button v-b-modal.publish v-show="editShow" class="ml-1 mt-1 f-12" variant="outline-success" @click="cookEdit()"><font-awesome-icon fixed-width icon="edit"/> {{$t('recipe.edit')}}</b-button><!--skele[1]-->          
          <!-- <b-button v-b-modal.publish v-show="true" class="ml-1 mt-1 f-12" variant="outline-primary" @click="showModal('publish','publish','publish msg','publish')"><font-awesome-icon fixed-width icon="upload"/> {{$t('recipe.publish')}}</b-button>skele[1] -->
        </div>
      </b-col>
      <b-col class="mt-2" lg="3" sm="12" v-for="(item,index) in newCook " :key="index">
        <b-card class="mt-2">
          <b-skeleton v-show="false" height="400px"></b-skeleton><!--skele[0]-->
          <b-row v-show="true"> <!--skele[1]-->
            <b-col cols="12">
              <h6 class="text-dark cookHead">{{item.name}}</h6>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.water')}}</label>
              <b-form-input class="cookInput" type="number" v-model="item.water" :value="item.water" :disabled="isDisabled"></b-form-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.cook_temp')}}</label>
              <b-form-input class="cookInput" type="number" v-model="item.temp_cook" :value="item.temp_cook" :disabled="isDisabled"></b-form-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">{{$t('recipe.cool_temp')}}</label>
              <b-form-input class="cookInput" type="number" v-model="item.temp_cool" :value="item.temp_cool" :disabled="isDisabled"></b-form-input>
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
  </b-card-group>
</template>

<script>
import { functions, httpsCallable, perf, trace, collection, query, getDocs,db,orderBy,limit } from "../../fire";
import store from '../../store/store'

export default {
  name:'cooker',
  data(){
    return{
      brandL: store.getters.getLocation,
      addShow: false,
      cookRecipe: [],
      newCook:[],
      isDisabled: true,
      editShow: true
    }
  },
  props:{
    showSke: {type: Boolean},
    showVal: {type: Boolean},
    recipes: {type: Array}
  },
  computed:{
    'skele':function(){
      return [this.showSke,this.showVal]
    },
    // 'recipeVal':function(){
    //   return store.getters.getRecipe.recipeVal
    // },
  },
  watch:{
    getLocation(val){
      this.brandL = val;
      this.loadRecipe();
    }
  },
  async mounted(){
    this.getCook();
    //get brandL
    //save, publish
  },
  methods:{
    hideModal(id){
      this.$refs[id][0].hide();
      this.switchSel = '0';
    },
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
        var brandL = "Slash-Taipei";

        for(var n=1; n<9; n++){
          const q = query(collection(db, "cookrecipes/"+brandL+"/recipe"+n),orderBy("added","desc"),limit(1));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.cookRecipe.push(doc.data());
            this.newCook.push(doc.data());
          });
        }
        store.commit('cookChanged', this.newCook);
      }
      //{ "stir1_time": "0-30", "cook_time": "2-0", "name": "泡沫紅茶", "added": "20221102000542", "id": "recipe1", "stir2_time": "0-30", "temp_cool": "40", "water": "4000", "temp_cook": "95" }
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
    },
    async saveCook(){
      this.cancelEdit("s");
      store.commit('cookChanged', this.newCook);
    }
    // async delRecipe(tea,item){
    //   const t = trace(perf,"removeRecipe");
		// 	t.start();
    //   var manageCategory = httpsCallable(functions,'manageCategory');
    //   await manageCategory({docPath:'recipes/'+this.brandL, category:item.id,drink:tea, status:2}).then(result => {
    //     var removeRecipe = httpsCallable(functions,'removeRecipe');
    //     removeRecipe({docPath:'recipes/'+this.brandL,drink:tea}).then(result => {
    //       this.removeRecipe(tea,item);
    //       this.hideModal('del'+tea);
    //     });
    //   });
    //   t.stop();
    // },
    // async addRecipe(item){
    //   const t = trace(perf,"addNewRecipe");
		// 	t.start();
    //   var cat = item.id,
    //   tea = item.addRecipe;
    //   var manageCategory = httpsCallable(functions,'manageCategory');
    //   await manageCategory({docPath:'recipes/'+this.brandL, category:cat,drink:item.addRecipe, status:1}).then(()=>{
    //     var addRecipe = httpsCallable(functions,'addRecipe'); //status=0
    //     addRecipe({docPath:'recipes/'+this.brandL,drink:tea, status:0}).then(()=>{
    //       this.pushRecipe(cat,tea);
    //       item.addShow = false;
    //       item.addRecipe = '';
    //       item.btnState = 1;
    //     });
    //   });
    //   t.stop();
    // },
    // async btnStatus(item){
    //   if(item.addRecipe.length>0){item.btnState = 0}
    //   else{item.btnState = 1}
    // },
    // pushRecipe(cat,tea){
    //   var x = 0;
    //   for(x in this.recipeVal){
    //     if(this.recipeVal[x].id == cat){
    //       this.recipeVal[x].drinkCount = this.recipeVal[x].drinkCount + 1;
    //       if(this.recipeVal[x].onDrink.length<10){this.recipeVal[x].onDrink.push(tea)}
    //       else{this.recipeVal[x].offDrink.push(tea)}
    //     }
    //   }
    // },
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
