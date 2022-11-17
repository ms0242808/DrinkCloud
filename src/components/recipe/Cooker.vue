<template>
  <b-card-group deck>
    <!-- v-for="(item, index) in recipeVal" v-bind:key="index" v-show="skele[1]" class="w-100 no-gutters noMaxWidth container" -->
    <b-row class="w-100 no-gutters container noMaxWidth">
      <b-col class="mt-2" lg="3" sm="12" v-for="(item,index) in cookRecipe " :key="index">
        <b-card class="mt-2">
          <b-skeleton v-show="false" height="400px"></b-skeleton><!--skele[0]-->
          <b-row v-show="true"> <!--skele[1]-->
            <b-col cols="12">
              <h6 class="text-dark cookHead">{{item.name}}</h6>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">Water</label>
              <b-input :value="item.water"></b-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">Cook temp</label>
              <b-input :value="item.cook_time"></b-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">Cool temp</label>
              <b-input :value="item.temp_cool"></b-input>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">Cook time</label>
              <b-row>
                <b-col cols="6">
                  <b-input width="30" :value="item.cook_time.split('-')[0]"></b-input>
                </b-col>
                <b-col cols="6">
                  <b-input :value="item.cook_time.split('-')[1]"></b-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">Stir time 1</label>
              <b-row>
                <b-col cols="6">
                  <b-input width="30" :value="item.stir1_time.split('-')[0]"></b-input>
                </b-col>
                <b-col cols="6">
                  <b-input :value="item.stir1_time.split('-')[1]"></b-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="mt-2">
              <label class="text-dark inputL">Stir time 2</label>
              <b-row>
                <b-col cols="6">
                  <b-input width="30" :value="item.stir2_time.split('-')[0]"></b-input>
                </b-col>
                <b-col cols="6">
                  <b-input :value="item.stir2_time.split('-')[1]"></b-input>
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
      cookRecipe: []
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
  async created(){
    this.getCook();
  },
  methods:{
    hideModal(id){
      this.$refs[id][0].hide();
      this.switchSel = '0';
    },
    async getCook(){
      var brandL = "Slash-Taipei";

      for(var n=1; n<9; n++){
        const q = query(collection(db, "cookrecipes/"+brandL+"/recipe"+n),orderBy("added","desc"),limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.cookRecipe.push(doc.data());
        });
      }
      //{ "stir1_time": "0-30", "cook_time": "2-0", "name": "泡沫紅茶", "added": "20221102000542", "id": "recipe1", "stir2_time": "0-30", "temp_cool": "40", "water": "4000", "temp_cook": "95" }
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
}
</style>
