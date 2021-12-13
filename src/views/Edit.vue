<template>
  <div class="wrapper">
		<b-container class="mt-3 noMaxWidth">
			<b-row>
        <b-col class="no-putters" cols="3">
					<b-button @click="$router.push('/recipe')">Back</b-button>
				</b-col>
				<b-col class="no-putters text-center m-auto" cols="6">
					<h3 class="m-0">{{recipe}}</h3>
				</b-col>
        <b-col class="no-putters text-end" cols="3">
					<b-button variant="outline-success" @click="upRecipe()">Update</b-button>
				</b-col>

				<!-- <b-col class="no-putters" cols="4"> -->
					<!-- <b-button-group class="float-right"> -->
						<!-- <b-skeleton width="80px" height="30px"></b-skeleton> -->
						<!-- <b-skeleton width="80px" height="30px"></b-skeleton> -->
					<!-- </b-button-group> -->
				<!-- </b-col> -->
				<!-- <b-col class="no-putters" cols="8">
					<b-skeleton width="70%" height="30px"></b-skeleton>
				</b-col>s
				<b-col class="no-putters" cols="4">
					<b-button-group class="float-right">
						<b-skeleton width="60px" height="30px"></b-skeleton>
						<b-skeleton width="60px" height="30px"></b-skeleton>
					</b-button-group>
				</b-col> -->
			</b-row>
		</b-container>
		<div class="mt-3">
      <b-tabs content-class="mt-3" pills>
        <b-tab  v-for="(item,index) in recipeVal" :title="item.id" :key="index">
          <b-form-select v-model="item.supplyCode" :options="iceOpt" class="locationSelect d-inline-block"></b-form-select>
          <b-form-checkbox switch class="mr-n2" :id="'activate'+index" v-model="item.shake">
            <span class="sr-only">Switch for following text input</span>
            <label class='form-check-label' for='activate'>Shake <b>{{ item.shake }}</b></label>
          </b-form-checkbox>
          <Table :val="item.val" :sticky-header="stickyHeader" :fields="fields"/>
        </b-tab>
        <template #tabs-end>
          <div>
            <b-button v-b-modal.modal-1 variant="transparent"><font-awesome-icon fixed-width icon="cog"/></b-button>
            <b-modal ref="setModal" id="modal-1" centered title="Drink settings">
              <div v-for="(item,index) in settingList" :key="index">
                <p class="mt-1" >{{item.id}}</p>
                <hr>
                <div class="col-12 d-flex flex-justify-between" v-for="(v,i,n) in item.opt" :key="n">
                  <!-- mt-1 form-check custom-control custom-switch -->
                  {{item.opt[i]}}
                  <b-form-checkbox switch class="mr-n2" v-model="item.status[i]">
                    <span class="sr-only">Switch for following text input</span>
                    <label class='form-check-label' :for='item.status[i]'></label>
                  </b-form-checkbox>
                </div>
              </div>
              <template #modal-footer>
                <div class="w-100">
                  <b-button variant="primary" class="float-right" @click="upSetting()">Save</b-button>
                  <b-button class="float-right" @click="hideModal">cancel</b-button>
                </div>
              </template>
            </b-modal>
          </div>
          <b-form-checkbox switch class="mr-n2" v-model="activate">
            <span class="sr-only">Switch for following text input</span>
            <label class='form-check-label' for='activate'>Acitvation <b></b></label>
          </b-form-checkbox>
        </template>
      </b-tabs>
		</div>
  </div>
</template>

<script>
import { functions, httpsCallable, db } from "../fire";
import store from '../store/store'
import { mapGetters } from 'vuex'
import Table from '@/components/Table.vue'

export default {
  name:'edit',
  components:{
		Table
	},
  props:{
    header:{type: Array}
  },
  data(){
    return {
      brandL: store.getters.getLocation,
      recipe: this.$route.params.id.split('-')[1],
      catName: this.$route.params.id.split('-')[0],
      stickyHeader: false,
      fields: [],
      recipeVal: [{
        id: 'Normal Ice',
        val: [],
        shakeVal: '',
        shake: true,
        supplyCode: ''
      },{
        id: 'Less Ice',
        val: [],
        shakeVal: '',
        shake: true,
        supplyCode: ''
      },{
        id: 'Ice Free',
        val: [],
        shakeVal: '',
        shake: true,
        supplyCode: ''
      },{
        id: 'Warm',
        val: [],
        shakeVal: '',
        shake: true,
        supplyCode: ''
      },{
        id: 'Hot',
        val: [],
        shakeVal: '',
        shake: true,
        supplyCode: ''
      }],
      iceOpt:[
        { value: '0', text: 'No supply' },
        { value: '1', text: 'Origin' },
        { value: '2', text: 'Cold water' },
        { value: '3', text: 'Hot water'},
        { value: '4', text: 'Milk'}
      ],
      selected: '0',
      activate: false,
      ogAct: false,
      settingList:[{
        id:'Ice',
        val:[],
        status:[],
        opt:['Nomral Ice','Less Ice','Ice Free','Warm','Hot']
      },{
        id:'Topping',
        val:[],
        status:[],
        opt:['0','1','2','3']
      },{
        id:'Size',
        val:[],
        status:[],
        opt:['Large','Regular']
      }]
    }
  },
  computed:{
    // 'skele': function(){
    //   return [this.showSke,this.showVal]
    // }
    ...mapGetters([
      'getLocation'
    ])
  },
  methods:{
    switchVal(val){
      if(val == '1'){return true}
      else{return false}
    },
    hideModal() {
      this.$refs['setModal'].hide();
    },
    async upRecipe(){
      // console.log(1,this.recipeVal,this.activate);
      var x = 0,
      val = [],
      status = 0; //1 -> on to off, 0 -> off to on
      for(x in this.recipeVal){
        var y = 0;
        for(y in this.recipeVal[x].val){
          var z = 0;
          for(z in this.recipeVal[x].val[y]){
            if(this.recipeVal[x].shake){this.recipeVal[x].val[y].shake = 1}else{this.recipeVal[x].val[y].shake = 0}
            this.recipeVal[x].val[y].supplycode = parseInt(this.recipeVal[x].supplyCode);
            if(z !== 'Size' && z !== 'Temperature' && z !== 'Topping'){val.push(parseInt(this.recipeVal[x].val[y][z]))}
          }
        }
      }
      // for(var a=0;a<1160;a+=232){
      //   for(var b=a;b<a+116;b++){newRows.push(newRecipe[b]);}
      //   if(a==928){a=-116}
      // }
      // console.log(this.ogAct,this.activate,status);
      
      // var addRecipe = httpsCallable(functions,'addRecipe');
      // await addRecipe({docPath:'recipes/'+this.brandL,drink:this.recipe, status:"1", recipe:val}).then(result => {
      //   console.log("Recipe updated");
      // });

      // if(this.ogAct !== this.activate){
      //   if(!this.activate){status = 1}
      //   var activate = httpsCallable(functions,'activate');
      //   await activate({docPath:'recipes/'+this.brandL, catName:this.catName, drinkName:this.recipe, status:status}).then(result => {
      //     console.log("Activate updated");
      //   });
      // }
    },
    async upSetting(){
      // console.log(2,this.settingList);
      var x = 0,
      set = [];
      for(x in this.settingList){
        var y = 0;
        for(y in this.settingList[x].status){
          if(this.settingList[x].status[y]){set.push(1)}
          else{set.push(0)}
        }
      }
      console.log(set,this.recipe,this.brandL);
      var drinkSetting = httpsCallable(functions,'drinkSetting');
      await drinkSetting({docPath:'recipes/'+this.brandL,drink:this.recipe, setting:set}).then(result => {
        console.log("Settings updated");
        this.$refs['setModal'].hide();
      });
    }
  },
  watch: {
    getLocation(val){
      this.brandL = val;
      // this.loadRecipe();
      // convert mounted to function
    }
  },
  async mounted(){
    // console.log(store.getters.getRecipe.header,this.brandL,this.getLocation);
    var rows = [];
    var getRecipe = httpsCallable(functions,'getRecipe');
    await getRecipe({docPath:'recipes/'+this.brandL,drink:this.recipe}).then(result => {
     rows = result.data.recipe.slice(0,-1);
    });
    console.log(rows);
    var x = 0;
    for(var a=0;a<17;a+=4){
      this.recipeVal[x].val.push(rows[a],rows[a+1],rows[a+2],rows[a+3],rows[a+20],rows[a+21],rows[a+22],rows[a+23]);
      x++;
    }
    
    for(x=0; x<=4; x++){
      var newArr = [];
      for(var y=0; y<=7; y++){
        var newRows = {};
        for(var z=0; z<=31; z++){
          var n = store.getters.getRecipe.header[z];
          Object.assign(newRows, {[n]: this.recipeVal[x].val[y][z]});
          if(z==30 && this.recipeVal[x].val[y][z] === 0){
            this.recipeVal[x].shake = false
          }
        }
        this.recipeVal[x].shake = this.switchVal(this.recipeVal[x].val[y].at(-2));        
        this.recipeVal[x].supplyCode = this.recipeVal[x].val[y].at(-1);
        newArr.push(newRows);
      }
      this.recipeVal[x].val = newArr;
    }
    console.log(this.recipeVal);
    for(var zx=0; zx<=31; zx++){
      var nx = store.getters.getRecipe.header[zx];
      if(zx==0){this.fields.push({"key":nx,'stickyColumn': true})}
      else if(zx==1){this.fields.push({"key":nx,'thClass': 'd-none', 'tdClass': 'd-none'})}
      else if(zx==2){this.fields.push({"key":nx,'stickyColumn': true,'tdClass':'l-54','thClass':'l-54'})}
      // else if(zx==30 || zx==31){this.fields.push({"key":nx,'thClass': 'd-none', 'tdClass': 'd-none'})}
      else{this.fields.push({"key":nx});}
    }
    if(store.getters.getRecipe.onDrink.includes(this.recipe)){
      this.activate = true;
      this.ogAct = true;
    }
    
    var [settings,iceVal,sizeVal,topVal] = [[],[],[],[]];
    var getDrinkSetting = httpsCallable(functions,'getDrinkSetting');
    await getDrinkSetting({docPath:'recipes/'+this.brandL,drink:this.recipe}).then(result => {
      settings = result.data.setting;
      delete settings.no;
      delete settings.on;
      iceVal = settings.ice;
      sizeVal.push(settings.L);
      sizeVal.push(settings.M);
      topVal = settings.topping;
      settings = [settings.ice,topVal,[settings.L,settings.M]];
    });
    for(var s=0; s<3; s++){
      this.settingList[s].val = settings[s];
      this.settingList[s].status = settings[s].map(item => {if(item == "1"){return true}else{return false}});
    }
  }
}
</script>

<style scoped>
@media (min-width: 576px){

}
.m-auto{
  margin:auto;
}
.tab-bg{
  background-color: #eaeaea;
  height: 70vh;
  border-radius: 10px;
  box-shadow: 3px 3px #e2e3e5;
}
</style>