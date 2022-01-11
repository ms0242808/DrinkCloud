<template>
  <div class="wrapper">
    <b-alert :show="dismissCountDown" dismissible fade :variant="variant" @dismiss-count-down="countDownChanged">
      {{$t('recipe.'+msg)}}
    </b-alert>
		<b-container class="mt-3 noMaxWidth">
			<b-row>
        <b-col class="no-putters" cols="3">
					<b-button variant="outline-dark" @click="$router.push('/recipe')">{{$t('recipe.back')}}</b-button>
				</b-col>
				<b-col class="no-putters text-center m-auto" cols="6">
					<h3 class="m-0">{{recipe}}</h3>
				</b-col>
        <b-col class="no-putters text-end" cols="3">
					<b-button variant="outline-success" @click="upRecipe()">{{$t('recipe.'+btn.update)}}<b-spinner small v-if="btnClicked['b']"></b-spinner></b-button>
				</b-col>
			</b-row>
		</b-container>
		<div class="mt-3">
      <div v-show="skele[0]" class="w-100">
        <b-row>
          <b-col cols="12"><b-skeleton height="30px" width="55%"></b-skeleton></b-col>
          <b-col cols="7" lg="3"><b-skeleton height="30px"></b-skeleton></b-col>
          <b-col cols="5" lg="9" class="m-auto"><b-skeleton height="30px" width="100px"></b-skeleton></b-col>
        </b-row>
        <b-skeleton height="500px"></b-skeleton>
      </div>
      <b-tabs v-show="skele[1]" content-class="mt-3 tab-card" pills>
        <b-tab v-for="(item,index) in recipeVal" :title="$t('recipe.'+item.id)" :key="index">
          <b-row>
            <b-col cols="7" lg="3">
              <b-form-select v-model="item.supplyCode" :options="supplyOpt" class="locationSelect d-inline-block"></b-form-select>
            </b-col>
            <b-col cols="5" lg="9" class="m-auto">
              <b-form-checkbox switch class="mr-n2" :id="'activate'+index" v-model="item.shake" variant="success">
                <label class='form-check-label' for='activate'>{{$t('recipe.shake')}}</label>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <Table :val="item.val" :sticky-header="stickyHeader" :fields="tf"/>
        </b-tab>
        <template #tabs-end>
          <div>
            <b-button v-b-modal.modal-1 variant="transparent"><font-awesome-icon fixed-width icon="cog"/> {{$t('recipe.setting')}}</b-button>
            <b-modal ref="setModal" id="modal-1" centered :title="$t('recipe.setting')" class="text-i">
              <div v-for="(item,index) in settingList" :key="index" class="mt-2 text-dark">
                <b>{{$t('recipe.'+item.id)}}</b>
                <hr>
                <div class="col-12 d-flex flex-justify-between mt-2" v-for="(v,i,n) in item.opt" :key="n">
                  {{$t('recipe.'+item.opt[i])}}
                  <b-form-checkbox switch class="mr-n2" v-model="item.status[i]">
                    <label class='form-check-label' :for='item.status[i]'></label>
                  </b-form-checkbox>
                </div>
              </div>
              <template #modal-footer>
                <div class="w-100">
                  <b-button variant="outline-success" class="ml-1 float-right" @click="upSetting()">{{$t('recipe.'+btn.save)}}<b-spinner small v-if="btnClicked['b']"></b-spinner></b-button>
                  <b-button variant="outline-dark" class="float-right" @click="hideModal">{{$t('recipe.cancel')}}</b-button>
                </div>
              </template>
            </b-modal>
          </div>
          <b-form-checkbox switch class="mr-n2 mtb-auto" v-model="activate">
            <label class='form-check-label' for='activate'>{{$t('recipe.activate')}} <b></b></label>
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
import Vue from 'vue';

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
      showSke: true,
      showVal: false,
      btn:{
        update:'update',
        save:'save'
      },
      btnClicked : [],
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      variant: 'success',
      msg: 'alert update',
      recipe: this.$route.params.id.split('-')[1],
      catName: this.$route.params.id.split('-')[0],
      stickyHeader: false,
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
      selected: '0',
      activate: false,
      ogAct: false,
      settingList:[{
        id:'Ice',
        val:[],
        status:[],
        opt:['Normal Ice','Less Ice','Ice Free','Warm','Hot']
      },{
        id:'Topping',
        val:[],
        status:[],
        opt:['Topping0','Topping1','Topping2','Topping3']
      },{
        id:'Size',
        val:[],
        status:[],
        opt:['L','M']
      }]
    }
  },
  computed:{
    'skele':function(){
      return [this.showSke,this.showVal]
    },
    ...mapGetters([
      'getLocation'
    ]),
    'tf':function(){
      var fields = [];
      for(var zx=0; zx<=31; zx++){
        var nx = store.getters.getRecipe.header[zx];
        if(zx==0){fields.push({"key":nx,'stickyColumn': true,label:this.$i18n.t('recipe.'+nx)})}
        else if(zx==1){fields.push({"key":nx,'thClass': 'd-none', 'tdClass': 'd-none'})}
        else if(zx==2){fields.push({"key":nx,'stickyColumn': true,'tdClass':'l-93','thClass':'l-93',label:this.$i18n.t('recipe.'+nx)})}
        else if(zx==3 || zx <=7 || zx == 28 || zx == 29){fields.push({"key":nx,label:this.$i18n.t('recipe.'+nx)})}
        else if(zx==30 || zx==31){fields.push({"key":nx,'thClass': 'd-none', 'tdClass': 'd-none'})}
        else{fields.push({"key":nx});}
      }
      return fields
    },
    'supplyOpt':function(){
      return [
        { value: '0', text: this.$i18n.t('recipe.nothing') },
        { value: '1', text: this.$i18n.t('recipe.original') },
        { value: '2', text: this.$i18n.t('recipe.cold') },
        { value: '3', text: this.$i18n.t('recipe.hot') },
        { value: '4', text: this.$i18n.t('recipe.milk') }
      ]
    }
  },
  methods:{
    switchVal(val){
      if(val == '1'){return true}
      else{return false}
    },
    hideModal(){
      this.$refs['setModal'].hide();
    },
    countDownChanged(dismissCountDown){this.dismissCountDown = dismissCountDown},
    showAlert(){this.dismissCountDown = this.dismissSecs},
    async loadTable(){
      var rows = [];
      var getRecipe = httpsCallable(functions,'getRecipe');
      await getRecipe({docPath:'recipes/'+this.brandL,drink:this.recipe}).then(result => {
        rows = result.data.recipe.slice(0,-1);
      });
      
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
      this.showSke = false;
      this.showVal = true;
    },
    async upRecipe(){
      this.btn.update = '';
      Vue.set(this.btnClicked,'b',1);
      var x = 0,
      val = [],
      val2 = [],
      vaild = true,
      status = 0; //1 -> on to off, 0 -> off to on      
      for(x in this.recipeVal){
        var y = 0;
        for(y in this.recipeVal[x].val){
          var z = 0,
          sum = 0;
          for(z in this.recipeVal[x].val[y]){
            if(z !== 'Size' && z !== 'Temperature' && z !== 'Topping' && z !== 'Ice' && z !== 'shake' && z !== 'supplycode'){
              var v = parseInt(this.recipeVal[x].val[y][z]) || 0;
              sum += v;
              if(sum > 680){vaild = false}
            }
            if(this.recipeVal[x].shake){this.recipeVal[x].val[y].shake = 1}else{this.recipeVal[x].val[y].shake = 0}
            this.recipeVal[x].val[y].supplycode = parseInt(this.recipeVal[x].supplyCode);
            var value = parseInt(this.recipeVal[x].val[y][z]) || 0;
            if(z !== 'Size' && z !== 'Temperature' && z !== 'Topping' && y <= 3){val.push(value)}
            if(z !== 'Size' && z !== 'Temperature' && z !== 'Topping' && y >= 4){val2.push(value)}
          }
        }
      }
      if(vaild){
        val = val.concat(val2);
        var addRecipe = httpsCallable(functions,'addRecipe');
        await addRecipe({docPath:'recipes/'+this.brandL,drink:this.recipe, status:"1", recipe:val});
        if(this.ogAct !== this.activate){
          if(!this.activate){status = 1}
          var activate = httpsCallable(functions,'activate');
          await activate({docPath:'recipes/'+this.brandL, catName:this.catName, drinkName:this.recipe, status:status});
        }
        this.variant = 'success';
        this.msg = 'alert update';
        this.showAlert();
      }else{
        this.variant = 'danger';
        this.msg = 'alert error';
        this.showAlert();
      }
      this.btn.update = 'update';
      Vue.set(this.btnClicked,'b',0);
    },
    async upSetting(){
      this.btn.save = '';
      Vue.set(this.btnClicked,'b',1);
      var x = 0,
      set = [];
      for(x in this.settingList){
        var y = 0;
        for(y in this.settingList[x].status){
          if(this.settingList[x].status[y]){set.push(1)}
          else{set.push(0)}
        }
      }
      set.splice(5, 0, set[9]);
      set.splice(6, 0, set[11]);
      set.splice(-2);
      var drinkSetting = httpsCallable(functions,'drinkSetting');
      await drinkSetting({docPath:'recipes/'+this.brandL,drink:this.recipe, setting:set}).then(result => {
        this.$refs['setModal'].hide();
        this.variant = 'success';
        this.msg = 'alert update';
        this.showAlert();
        this.btn.save = 'save';
        Vue.set(this.btnClicked,'b',0);
      });
    }
  },
  watch:{
    getLocation(val){
      this.brandL = val;
      // this.loadTable();
    }
  },
  async mounted(){
    if(this.brandL !== '-'){this.loadTable()}
  }
}
</script>

<style scoped>
@media (min-width: 576px){

}
.m-auto{
  margin:auto;
}
.mtb-auto{
  margin:auto 1rem;
}
.noMaxWidth{
  max-width: unset !important;
}
.tab-bg{
  background-color: #eaeaea;
  height: 70vh;
  border-radius: 10px;
  box-shadow: 3px 3px #e2e3e5;
}
.form-check-label,.text-i,.nav-pills .nav-link{
  color:initial !important;
}
</style>