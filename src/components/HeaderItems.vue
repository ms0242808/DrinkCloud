<template>
  <div class="vd-header-container">
    <div class="vd-header">
			<header>
				<b-container>
					<b-row class="headerContent">
						<b-col cols="2" v-if="showMenuButton">
							<button class="menu-btn" @click="openMenu">
								<!-- ||| -->
								<font-awesome-icon fixed-width icon="bars"/>
							</button>
						</b-col>
						<b-col cols="8" md="11" class="brand">
							<a class="d-inline-block text-dark va-m">{{locationSel[0]}} - </a>
							<div class="d-inline-block" @mouseover="onOver('locationD')" @mouseleave="onLeave('locationD')">
								<b-dropdown :text="locationSel[1]" ref="locationD" variant="transparent" size="sm" no-caret>
									<template #button-content>{{locationSel[1]}} <font-awesome-icon fixed-width icon="map-marker-alt"/></template>
									<b-dropdown-header><small class="ft-10" ><font-awesome-icon fixed-width icon="map-marker-alt"/> {{$t('nav.location')}}:</small></b-dropdown-header>
									<b-dropdown-item-button v-for="item in locationSel[2]" :key="item" @click="location(item)" class="ft-14">{{item}}</b-dropdown-item-button>
								</b-dropdown>
							</div>
						</b-col>
						<b-col cols="1" class="user">
							<template>
								<b-skeleton type="avatar" v-show="avatarSke"></b-skeleton>
								<div @mouseover="onOver('avatarD')" @mouseleave="onLeave('avatarD')">
								<b-dropdown size="sm" right ref="avatarD" variant="link" toggle-class="text-decoration-none" no-caret v-show="avatarShow">
									<template #button-content><avatar :username="user.name" :size="35" :lighten="1000" backgroundColor="#2760A3"></avatar></template>
									<b-dropdown-item><router-link to="/permissions" class="va-m text-dark ft-14"><font-awesome-icon fixed-width icon="user-shield"/> {{$t('nav.profile')}}</router-link></b-dropdown-item>
									<hr class="dhr">
									<b-dropdown-item @click.prevent.stop="logout" class="va-m text-dark ft-14"><font-awesome-icon fixed-width icon="sign-out-alt"/> {{$t('nav.logout')}}</b-dropdown-item>
								</b-dropdown>
								</div>
							</template>
						</b-col>
					</b-row>
				</b-container>
			</header>
    </div>
  </div>
</template>

<script>
	import {auth, db, perf} from '../fire'
	import Avatar from 'vue-avatar'
	import { mapGetters } from 'vuex'
	import store from '../store/store'

	export default {
		name:"HeaderItems",
		props:{
			showMenuButton: {type:Boolean,default:true}
		},
		data(){
			return {
				pageBackground: '#f8f8f8',
				background: 'white',
				user:{
					email: store.getters.getEmail,
					name: '',
					brand: '',
					role: '',
					location: [],
					accType: false
				},
				selected: '',
				avatarSke: true,
				avatarShow: false
			}
		},
		computed:{
			...mapGetters([
				'getEmail'
			]),
			'locationSel':function(){
				return [store.getters.getLocation.split('-')[0],store.getters.getLocation.split('-')[1],store.getters.getLocationList]
			}
		},
		components: {
			Avatar
		},
		async created(){
			var email = this.getEmail;
			const trace = perf.trace("getLoginData");
			trace.start();
			await db.collection("users").where('email','==',email).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					this.user.name = doc.data()['name'];
					this.user.brand = doc.data()['brand'];
					this.user.role = doc.data()['role'];
					this.user.location = doc.data()['location'];
					this.selected= this.user.location[0];
					this.user.accType = (doc.data()['brand']==="Drinktec") ? true:false;
					store.commit('brandChanged', this.user);
					store.commit('locationChanged', doc.data()['location'][0]);
				});
			});
			trace.stop();
		},
		mounted(){
			setTimeout(()=>{this.setLoadingState(false,true)}, 1000)
		},
		methods: {
			onOver(id){this.$refs[id].visible = true},
			onLeave(id){this.$refs[id].visible = false},
			location(item){
				this.selected = item;
				store.commit('locationChanged', this.selected);
			},
			openMenu(){this.$emit('open-menu')},
			setLoadingState (value1,value2) {
				this.avatarSke = value1;
				this.avatarShow = value2;
			},
			logout(){auth.signOut().then(() => {this.$router.replace('login')})}
		}
	}
</script>

<style scoped>
.menu-btn {
  background-color: transparent !important;
  /* transform: rotate(90deg); */
  /* -webkit-transform: rotate(90deg); */
  font-size: 20px;
  border: none;
  cursor: pointer;
  height: 100%;
	color: #2d2d2d;
	padding-top: 10px;
}
.vd-header-container {
  z-index: 30;
  position: fixed;
  top: 0;
  width: -webkit-calc(100% - 250px);
  width: -moz-calc(100% - 250px);
  width: calc(100% - 250px);
  background-color: var(--vd-page-background, white);
  padding: 1.5rem 1.5rem 0rem 1.5rem;
}
.vd-header {
  height: 4rem;
  background-color: var(--vd-header-background, white);
  border-radius: 10px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
}
@media screen and (max-width: 1200px) {
  .vd-header-container {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
	.user{
		margin-right: 8px;
	}
	.brand{
		text-align: center;
	}
}
@media screen and (min-width: 768px) {
	.brand{
		padding: 0 15px !important;
	}
}
.brand{
	margin: auto 0;
	padding-top: 10px;
}
.va-m{
	vertical-align: middle;
}
.user{
	padding-left:0 !important;
	margin-top: 8px;
}
.dhr{
	width: 80% !important;
  margin-top: 10px;
  margin-bottom: 10px;
}
.container{
	max-width: unset !important;
}
.ft-14{
	font-size: 14px;
}
.ft-10{
	font-size: 10px;
}
</style>