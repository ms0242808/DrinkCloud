<template>
	<div class="vd-sidebar-container" :class="{hidden: !isVisible}">
		<div class="vd-sidebar-header" :class="{hidden: !isVisible}">
			<button class="close-btn" v-if="showCloseButton" @click="closeSidebar"><font-awesome-icon fixed-width icon="times"/></button>
			<slot name="header">
				<div class="header text-center">
					<div class="d-flex align-items-center justify-content-center">
            <svg width="26px" height="26px" viewBox="0 0 16 17" class="bi bi-cup-straw" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.964 1.18a.5.5 0 0 1-.278.65l-2.255.902-.462 2.08c.375.096.714.216.971.368.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.955 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 6.132A.78.78 0 0 1 3.5 6c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 4.614 6.867 4.5 8 4.5c.712 0 1.389.045 1.985.127l.527-2.37a.5.5 0 0 1 .302-.355l2.5-1a.5.5 0 0 1 .65.279zM9.768 5.608A13.991 13.991 0 0 0 8 5.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 6c.146.073.362.15.648.222C5.967 6.39 6.924 6.5 8 6.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756a5.513 5.513 0 0 0 1.325-.297l-.845 8.03c-.013.12-.06.185-.102.214-.357.249-1.167.69-2.438.69-1.27 0-2.08-.441-2.438-.69-.041-.029-.09-.094-.102-.214l-.845-8.03c.137.046.283.088.435.126.774.194 1.817.308 2.95.308.742 0 1.445-.049 2.06-.137zm-5.593-1.48s.003.002.005.006l-.005-.006zm7.066 0l-.005.006a.026.026 0 0 1 .005-.006zM11.354 6a3.282 3.282 0 0 1-.703.235l.1-.446c.264.069.464.142.603.211z"/>
            </svg>
						<h5 class="title mx-3 text-light text-bold">DRINKTEC</h5>
          </div>
          <hr class="sidebar-divider">
        </div>
			</slot>
		</div>
		<div class="vd-sidebar-content">
			<slot name="content">
				<div class="margin-top">
          <b-nav vertical>
            <div><font-awesome-icon fixed-width icon="stream"/><small class="text-uppercase">{{$t('nav.general')}}</small></div>
						<b-nav-item class="mt-2">
              <router-link to="/overview" class="va-m"><font-awesome-icon fixed-width icon="map"/>{{$t('nav.overview')}}</router-link>
            </b-nav-item>
            <b-nav-item class="mt-2">
              <router-link to="/dashboard" class="va-m"><font-awesome-icon fixed-width icon="tachometer-alt"/>{{$t('nav.dashboard')}}</router-link>
            </b-nav-item>
						<b-nav-item class="mt-2">
              <router-link to="/inventory" class="va-m"><font-awesome-icon fixed-width icon="boxes"/>{{$t('nav.inventory')}}</router-link>
            </b-nav-item>
            <b-nav-item class="mt-2">
              <router-link to="/recipe" class="va-m"><font-awesome-icon fixed-width icon="file-alt"/>{{$t('nav.recipe')}}</router-link>
            </b-nav-item>
            <b-nav-item class="mt-2">
              <router-link to="/report" class="va-m"><font-awesome-icon fixed-width icon="tools"/>{{$t('nav.report')}}</router-link>
            </b-nav-item>
            <hr class="sidebar-divider">
            <div><font-awesome-icon fixed-width icon="cog"/><small class="text-uppercase">{{$t('nav.settings')}}</small></div>
            <b-nav-item class="mt-2">
              <router-link to="/permissions" class="va-m"><font-awesome-icon fixed-width icon="user-shield"/>{{$t('nav.permissions')}}</router-link>
            </b-nav-item>
						<hr class="sidebar-divider">
            <div><font-awesome-icon fixed-width icon="check-circle"/><small class="text-uppercase">{{$t('nav.status')}}</small></div>
            <b-nav-item class="mt-2">
							<div class="d-flex flex-justify-between text-bold">
								<router-link to="/dashboard" class="va-m text-white p-t-b-0"><font-awesome-icon fixed-width icon="robot"/>{{$t('nav.machine')}}</router-link>
								<router-link to="/dashboard" class="va-m text-white p-t-b-0" :class="mClass">{{$t('nav.'+mStatus)}} <font-awesome-icon fixed-width icon="power-off"/></router-link>
							</div>
            </b-nav-item>
						<b-nav-item>
							<div class="d-flex flex-justify-between text-bold">
								<router-link to="/recipe" class="va-m text-white p-t-b-0"><font-awesome-icon fixed-width icon="lemon"/>{{$t('nav.recipe')}}</router-link>
								<router-link to="/recipe" class="va-m text-white p-t-b-0" :class="rClass">{{$t('nav.'+rStatus)}} <font-awesome-icon fixed-width icon="link"/></router-link>
							</div>
            </b-nav-item>
            <hr class="sidebar-divider">
            <div><font-awesome-icon fixed-width icon="hdd"/><small class="text-uppercase">{{$t('nav.others')}}</small></div>
            <b-nav-item class="mt-2">
              <router-link to="/log" class="va-m"><font-awesome-icon fixed-width icon="server"/>{{$t('nav.changelog')}}</router-link>
            </b-nav-item>
            <hr class="sidebar-divider">
						<div><font-awesome-icon fixed-width icon="globe"/><small class="text-uppercase">{{$t('nav.languages')}}</small></div>
						<b-form-group class="text-center mt-3">
							<b-form-radio-group v-model="$i18n.locale" :options="langs" button-variant="outline-light" size="sm" buttons></b-form-radio-group>
						</b-form-group>
          </b-nav>
        </div>
			</slot>
		</div>
	</div>
</template>

<script>
import { db, onSnapshot, doc, perf, trace } from "../fire"
import store from '../store/store'
import { mapGetters } from 'vuex'

export default {
  name:'sidebbar',
  props:{
		isVisible:{type:Boolean,default:true},
		showCloseButton:{type:Boolean,default:false}
	},
  data(){
    return{
			brandL: store.getters.getLocation,
			background: 'white',
			mStatus: 'offline',
			mClass: 's-off',
			rStatus: 'not synced',
			rClass: 's-off',
      langs:[
				{text:'EN',value:'en'},
				{text:'中文',value:'zh'}
			]
    }
  },
	computed:{
		...mapGetters([
      'getLocation'
    ])
	},
	watch:{
    getLocation(val){
      this.brandL = val;
			if(val !== '-'){
				this.getMStatus();
			}
    }
  },
	methods:{
		closeSidebar(){this.$emit('close-sidebar')},
		getMStatus(){
			const t = trace(perf,"getMachineStatus");
			t.start();
			const unsub = onSnapshot(doc(db, "status", this.brandL), (doc) => {
				if(doc.exists){
					this.mStatus = doc.data()['state'];
					if(this.mStatus == "online"){this.mClass = 's-on'}
					else{this.mClass = 's-off'}
					if(doc.data()['Recipe-Update']){
						this.rStatus = 'synced';
						this.rClass = 's-on';
					}else{
						this.rStatus = 'not synced';
						this.rClass = 's-off';
					}
				}else{
					this.mStatus = 'offline';
					this.mClass = 's-off';
					this.rStatus = 'not synced';
					this.rClass = 's-off';
				}
			});
			t.stop();
		}
	}
}
</script>>

<style scoped>
.vd-sidebar-container{
	z-index: 1000;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	width: 250px;
	box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
	background-color:#084e74 !important;
	color:white;
	overflow-y: auto;
	overflow-x: hidden;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
}
.vd-sidebar-container.hidden{
	left: -250px;
	opacity: 0;
}
.nav-link,.nav-item a{
	padding: 8px 0;
	color:#eaeaeae0;
}
.nav-item a:hover,.router-link-active{
	color: white !important;
	font-weight: bold;
}
.close-btn{
	color:#eaeaea;
	position: absolute;
	z-index: 200;
	right: 1px;
	top: 0;
	background-color: transparent !important;
	/* font-size: 2rem; */
	font-size: 20px;
	border: none;
	cursor: pointer;
}
.vd-sidebar-header{
	z-index: 45;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	width: 250px;
	height: 100px; /*130*/
	overflow-y: auto;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	background-color: inherit;
	overflow: hidden;
}
.vd-sidebar-header.hidden{
	left: -250px;
	opacity: 0;
}
.vd-sidebar-content{
	padding: 100px 1rem 0rem 1rem;
	width: 250px;
	overflow: scroll;
}
.header{
	padding: 1rem;
}
.logo{
	width: 80px;
}
.sidebar-divider{
	width: 100% !important;
	border:1px solid #eaeaea3d !important;
}
.router-link-exact-active{
	font-weight: bold;
	color: white !important;
}
.va-m{
	vertical-align: middle !important;
}
.m-t-4{
	margin-top: 4px;
}
.p-t-b-0{
	padding-top: 0 !important;
	padding-bottom: 0 !important;
}
.s-on{
	color:#00ff09 !important;
}
.s-off{
	color: #eaeaea !important;
}
small{
	font-weight: bold !important;
}
.svg-inline--fa{
	vertical-align: middle;
	margin-right: 0.5rem;
}
</style>