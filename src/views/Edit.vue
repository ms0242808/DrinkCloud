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
					<b-button>Update</b-button>
				</b-col>

				<!-- <b-col class="no-putters" cols="4"> -->
					<!-- <b-button-group class="float-right"> -->
						<!-- <b-skeleton width="80px" height="30px"></b-skeleton> -->
						<!-- <b-skeleton width="80px" height="30px"></b-skeleton> -->
					<!-- </b-button-group> -->
				<!-- </b-col> -->
				<!-- <b-col class="no-putters" cols="8">
					<b-skeleton width="70%" height="30px"></b-skeleton>
				</b-col>
				<b-col class="no-putters" cols="4">
					<b-button-group class="float-right">
						<b-skeleton width="60px" height="30px"></b-skeleton>
						<b-skeleton width="60px" height="30px"></b-skeleton>
					</b-button-group>
				</b-col> -->
			</b-row>
		</b-container>
		<div class="mt-3">
      <!-- <div class='form-check form-switch'>
        <input class='form-check-input' type='checkbox' id='activate' v-model='checked'>
        <label class='form-check-label' for='activate'>Acitvation <b>{{ checked }}</b></label>
      </div> -->

       <b-tabs content-class="mt-3" pills>
        <b-tab  v-for="(item,index) in recipeVal" :title="item.id" :key="index">
          <!-- <div class='form-check form-switch'>
            <input class='form-check-input' type='checkbox' :id="'activate'+index" v-model='item.activate'>
            <label class='form-check-label' for='activate'>Acitvation <b>{{ item.activate }}</b></label>
          </div> -->
          <b-form-checkbox switch class="mr-n2" :id="'activate'+index" v-model='item.activate'>
            <span class="sr-only">Switch for following text input</span>
            <label class='form-check-label' for='activate'>Acitvation <b>{{ item.activate }}</b></label>
          </b-form-checkbox>
          <!-- <p>{{item.val}}</p> -->
          <Table :val="item.val" :sticky-header="stickyHeader" :fields="fields"/>
        </b-tab>
        <template #tabs-end>
          <!-- <b-nav-item href="#" role="presentation" @click="() => {}">
            <font-awesome-icon fixed-width icon="cog"/>
          </b-nav-item> -->
          <div>
            <b-button v-b-modal.modal-1 variant="transparent"><font-awesome-icon fixed-width icon="cog"/></b-button>
            <b-modal id="modal-1" centered title="Options">
              <p class="my-4">Hello from modal!</p>
            </b-modal>
          </div>
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
      recipe: this.$route.params.id,
      stickyHeader: false,
      fields: [],
      recipeVal: [{
        id: 'Normal Ice',
        val: [],
        supplyCode:[],
        activate: false
      },{
        id: 'Less Ice',
        val: [],
        supplyCode:[],
        activate: false
      },{
        id: 'Ice Free',
        val: [],
        supplyCode:[],
        activate: false
      },{
        id: 'Warm',
        val: [],
        supplyCode:[],
        activate: false
      },{
        id: 'Hot',
        val: [],
        supplyCode:[],
        activate: false
      }],
      checked: false
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
  watch: {
    getLocation(val){
      this.brandL = val;
      // this.loadRecipe();
    }
  },
  async mounted(){
    console.log(store.getters.getRecipe.header,this.brandL,this.getLocation);
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
        }
        newArr.push(newRows);
      }
      this.recipeVal[x].val = newArr;
    }
    for(var zx=0; zx<=31; zx++){
      var nx = store.getters.getRecipe.header[zx];
      if(zx==0){this.fields.push({"key":nx,'stickyColumn': true})}
      else if(zx==1){this.fields.push({"key":nx,'thClass': 'd-none', 'tdClass': 'd-none'})}
      else if(zx==2){this.fields.push({"key":nx,'stickyColumn': true,'tdClass':'l-40','thClass':'l-40'})}
      else{this.fields.push({"key":nx});}
    }
    console.log(this.fields);
    // var [i,s] = [0,0],
    // tabHead = '',
    // iceNo = [0,1,2,3,4],
    // iceOpt = ['Normal Ice','Less Ice','Ice Free','Warm','Hot'],
    // iceT = [0,1,2,3,4];

    // for(var x=0; x<=34; x+=8){
    //   for(i in iceOpt){
    //     if(iceNo[i] === rows[x][1]){tabHead = iceOpt[i];}
    //   }
    //   var y = x+8,
    //     active  = "";
    //   if(x == 0){active = "active";}
      // var navItem = '';
      // navItem +='<li class="nav-item"><a class="nav-link '+active+'" href="#tab'+x+'" dlang="recipe-'+tabHead+'">'+tabHead+'</a></li>'; // rows[x][1]
      // $(".nav-pills").append(navItem);
      // if(!$('#activate').length){
      //   var drinkStatus = sessionStorage.getItem('recipeStatus'),
      //   val = function(){
      //     var x = 0;
      //     if(drinkStatus == "checked"){x = 1;}
      //     return x
      //   },
      //   enable = function(){
      //     var x = val(),
      //     y = sessionStorage.getItem("recipeCount"),
      //     z = '';
      //     if(x==0 && y==10){z='disabled'}
      //     return z
      //   },
      //   activate = `<div class="float-right" id="activate">
      //     <h6 class="title"> <span dlang="recipe-activate">Activate</span> <i class="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="Switch on if want recipe show on the machine" dlang="recipe-hintactivate"></i></h6>
      //     <div class="form-check custom-control custom-switch">
      //       <input type="number" class="recipeInput" id="switchInput" value="`+val()+`" data-og="`+val()+`" hidden>
      //       <input type="checkbox" class="custom-control-input" id="activateSwitch" value="`+val()+`" `+drinkStatus+` `+enable()+`>
      //       <label class="custom-control-label" for="activateSwitch" value="`+val()+`" id="actlabel" data-val="`+val()+`"></label>
      //     </div>
      //   </div>`;
      //   $("#editBtnG").append(activate);
      // }
      
      // var tabContent ='';
      // tabContent +='<div id="tab'+x+'" class="tab-pane tab-card shadow '+active+'"></div>';
      // $(".tab-content").append(tabContent);

      // var table = document.createElement('TABLE');
      // setAttributes(table,{
      //   'class':'table table-bordered tableRecipe table-responsive text-center',
      //   'id':'dataTable',
      //   'width':"100%",
      //   'cellspacing':"0"
      // });
      // var tableHead = document.createElement('THEAD');
      // table.appendChild(tableHead);
      // var tr = document.createElement('TR');
      // tableHead.appendChild(tr);
      // for(a in header){
      //   var th = document.createElement('TH'),
      //   ip = document.createElement('input'),
      //   lb = document.createElement('label');
      //   th.setAttribute('scope','col');
      //   setAttributes(ip,{
      //       'class':'data readInput text-capitalize',
      //       'id':"header-"+header[a],
      //       'type':'text',
      //       'value':header[a],
      //       'readonly':true,
      //       'style':'font-weight:bold;cursor:pointer;display:none;'
      //     },
      //   );
      //   lb.innerHTML = header[a];
      //   lb.classList.add('mb-0');
      //   if(a == 0 || a <8 && a>1 || a == 28 || a == 29){setAttributes(lb,{'dlang':'recipe-'+header[a]});}
      //   th.appendChild(lb);
      //   th.appendChild(ip);
      //   tr.appendChild(th);
      // };
      // AddOptions(s,x);
      // for(var z=x; z<y; z++){renderTable(table,rows[z],z,s)}// render table content and supply code, shake
      // $('#tab'+x).append(table);
      // $('.tableRecipe tr > *:nth-child(2)').hide();
      // $('.tableRecipe tr > *:nth-last-child(1)').hide();
      // $('.tableRecipe tr > *:nth-last-child(2)').hide();
    //   s +=1;
    // }

    // store.commit('healthUpdate', health);
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