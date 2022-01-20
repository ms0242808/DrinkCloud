<template>
  <div class="wrapper">
		<b-container class="bv-example-row mt-2 noMaxWidth no-putters">
      <h3>{{$t('overview.title')}}</h3>
		</b-container>
		<div class="mt-2 noMaxWidth container no-padding no-putters">
      <b-row v-show="skele[0]"><b-col cols="12" lg="6"><b-skeleton height="200px"></b-skeleton></b-col></b-row>
      <template v-if="superAdmin">
        <template v-for="item,index in allbrand">
          <b-row v-show="skele[1]" :key="index" class="mt-2">
            <b-col cols="12"><h5 class="text-bold">{{item.brand}}</h5></b-col>
            <template v-for="city,i in item.locations">
              <b-col cols="12" lg="6" class="mt-3 imgCard" :key="i" @click="viewStoreDash(item,city)">
                <b-card no-body :img-src="item.cityImg[i]" :img-alt="city" img-height="150" img-top bg-variant="dark" border-variant="light">
                  <div class="middle text-light text-bold">{{$t('overview.enter')}} <font-awesome-icon fixed-width icon="long-arrow-alt-right"/></div>
                  <b-card-footer class="text-light text-bold">
                    <b-row>
                      <b-col cols="4">{{city}}</b-col>
                      <b-col cols="8">
                        <div class="float-right text-light">
                          <font-awesome-icon fixed-width icon="power-off" :class="item.mClass[i]"/> {{$t('nav.'+item.mStatus[i])}} /
                          <font-awesome-icon fixed-width icon="link" :class="item.rClass[i]"/> {{$t('nav.'+item.rStatus[i])}}
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-footer>
                </b-card>
              </b-col>
            </template>
          </b-row>
          <hr class="w-100" :key="'a'+index">
        </template>
      </template>
      <template v-else>
        <b-row v-show="skele[1]">
          <template v-for="link,index in cityImg">
            <b-col cols="12" lg="6" class="mt-3 imgCard" :key="index" @click="viewDash(locations[index])">
              <b-card no-body :img-src="link" :img-alt="locations[index]" img-height="150" img-top bg-variant="dark" border-variant="light">
                <div class="middle text-light text-bold">{{$t('overview.enter')}} <font-awesome-icon fixed-width icon="long-arrow-alt-right"/></div>
                <b-card-footer class="text-light text-bold">
                  <b-row>
                    <b-col cols="4">{{locations[index]}}</b-col>
                    <b-col cols="8">
                      <div class="float-right text-light">
                        <!-- <b-icon icon="cup-straw" font-scale="1.2"></b-icon> {{cups[index]}}, -->
                        <a :class="mClass"><font-awesome-icon fixed-width icon="power-off"/> {{$t('nav.'+mStatus[index])}} /</a>
                        <a :class="rClass"><font-awesome-icon fixed-width icon="link"/> {{$t('nav.'+rStatus[index])}}</a>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-footer>
              </b-card>
            </b-col>
          </template>
        </b-row>
      </template>
		</div>
  </div>
</template>

<script>
	import { functions, httpsCallable, db } from "../fire";
	import store from '../store/store'
	import { mapGetters } from 'vuex'
  import axios from "axios";
  import Vue from 'vue'
	
	export default {
		name: 'Dashboard',
		data(){
			return {
				showSke: true,
				showVal: false,
				brandL: '',
        locations: '',
        cityImg: [],
        cups: [0,0,0,0],
        mStatus: [],
        rStatus: [],
        mClass: [],
        rClass: [],
        superAdmin: store.getters.getAccType,
        brands: []
			}
		},
		computed:{
			...mapGetters([
				'getLocation',
        'getLocationList',
        'getAccType'
			]),
      'skele':function(){
        return [this.showSke,this.showVal]
      },
      'allbrand':function(){
        return this.brands
      }
		},
		watch:{
			getLocation(val){
				this.brandL = val;
        if(store.getters.getAccType){
          this.superAdmin = true;
          this.masterAcc();
        }
			},
      getLocationList(val){
        this.locations = val;
        this.accType();
      }
		},
		methods:{
			setLoadingState(v1,v2){
				this.showSke = v1;
				this.showVal = v2;
			},
      async masterAcc(){
        var name = [],
        x = 0,
        API_KEY = '25303151-143204abac5b7d04c9fb83b36';
        await db.collection('users').where('type','==','master').get().then((querySnapshot) => {
          querySnapshot.forEach(async function(doc){
            name.push({
              brand:doc.data()['brand'],
              locations:doc.data()['location'],
              city: [],
              mStatus:[],
              rStatus:[],
              rClass:[],
              mClass:[],
              cityImg:[]
            });
          });
        }).catch((error) => {console.log("Error getting document:", error)});
        for(x in name){
          var y = 0;
          for(y in name[x].locations){
            await db.doc('status/'+name[x].brand+'-'+name[x].locations[y]).get().then((doc) => {
              if(doc.exists){
                name[x].mStatus.push(doc.data()['state']);
                // name[x].mClass.push('s-on');
                if(doc.data()['Recipe-Update']){
                  name[x].rStatus.push('synced');
                  // name[x].rClass.push('s-on');
                }else{
                  name[x].rStatus.push('not synced');
                  // name[x].rClass.push('s-off');
                }
              }else{
                name[x].mStatus.push('offline');
                // name[x].mClass.push('s-off');
                name[x].rStatus.push('not synced');
                // name[x].rClass.push('s-off');
              }
            }).catch((error) => {console.log("Error getting document:", error)});

            var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(name[x].locations[y]);
            await axios.get(URL).then(response => {name[x].cityImg.push(response.data.hits[0].webformatURL)})
            .catch(error => {console.log(error)});
          }
        }
        this.brands = name;
        this.setLoadingState(false,true);
      },
      async getBanner(){
        var API_KEY = '25303151-143204abac5b7d04c9fb83b36',
        city = this.locations,
        x = 0;
        for(x in city){
          var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(city[x]);
          await axios.get(URL).then(response => {
            Vue.set(this.cityImg,x,response.data.hits[0].webformatURL);
          }).catch(error => {
            console.log(error);
          });
        }
      },
      async getMStatus(){
        var x = 0,
        city = this.locations,
        brand = this.brandL.split('-')[0];
        for(x in city){
          await db.doc('status/'+brand+'-'+city[x]).get().then((doc) => {
            if(doc.exists){
              Vue.set(this.mStatus,x,doc.data()['state']);
              Vue.set(this.mClass,x,'s-on');
              if(doc.data()['Recipe-Update']){
                Vue.set(this.rStatus,x,'synced');
                Vue.set(this.rClass,x,'s-on');
              }else{
                Vue.set(this.rStatus,x,'not synced');
                Vue.set(this.rClass,x,'s-off');
              }
            }else{
              Vue.set(this.mStatus,x,'offline');
              Vue.set(this.mClass,x,'s-off');
              Vue.set(this.rStatus,x,'not synced');
              Vue.set(this.rClass,x,'s-off');
            }
          }).catch((error) => {console.log("Error getting document:", error)});
        }
        this.setLoadingState(false,true);
      },
      viewDash(city){
        store.commit('locationChanged', city);
        this.$router.replace({name: "Dashboard"});
      },
      viewStoreDash(item,city){
        console.log(item.locations);
        var val= {brand:item.brand,location:item.locations};
        if(this.brandL.split('-')[0]!==item.brand){
          store.commit('brandUpdated', val);
        }
        this.viewDash(city);
      },
      accType(){
        if(store.getters.getAccType){
          this.superAdmin = true;
          this.masterAcc();
        }else{
          this.getBanner();
          this.getMStatus();
        }
      }
    },
		async mounted(){
      if(this.brandL !== ''){
        this.accType();
      }else{
        this.brandL = this.getLocation;
        this.locations = this.getLocationList;
        this.accType();
      }
		}
	}
</script>

<style scoped>
@media (max-width: 768px){	
	.no-padding{
		padding-left: 0;
		padding-right: 0;
	}
}
.noMaxWidth{
	max-width: unset !important;
}
.card-title{
  color:white !important;
  font-weight: bold;
}
.imgCard:hover{
  cursor: pointer;
}
.imgCard:hover .card{
  box-shadow: 3px 3px #eaeaea;
}
.imgCard:hover div>img{
  /* content: "pointer"; */
  opacity: 0.2;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.imgCard:hover div>.middle{
  /* content: "pointer"; */
  opacity: 1;
}
.s-on{
	color:#00ff09 !important;
}
.s-off{
	color: #eaeaea !important;
}
</style>
