<template>
  <div class="vd-header-container">
    <div class="vd-header">
      <button class="menu-btn" v-if="showMenuButton"  @click="openMenu">
        |||
      </button>
			<header>
				<b-container>
					<b-row class="headerContent">
						<b-col cols="9" md="11" class="brand">
							<a class="d-inline-block text-dark va-m">{{user.brand}} - </a>
							<div class="d-inline-block" @mouseover="onOver" @mouseleave="onLeave">
								<b-dropdown :text="selected" ref="dropdown" variant="transparent" size="sm" no-caret>
									<template #button-content>{{selected}} <font-awesome-icon fixed-width icon="map-marker-alt"/></template>
									<b-dropdown-header><small class="ft-10" ><font-awesome-icon fixed-width icon="map-marker-alt"/> {{$t('nav.location')}}:</small></b-dropdown-header>
									<b-dropdown-item-button v-for="item in user.location" :key="item" @click="location(item)" class="ft-14">{{item}}</b-dropdown-item-button>
								</b-dropdown>
							</div>
						</b-col>
						<b-col cols="2" md="1" class="user">
							<b-button variant="link" id="popover-target-2">
								<b-skeleton type="avatar" v-show="avatarSke"></b-skeleton>
								<avatar :username="user.name" v-show="avatarShow" :size="35" :lighten="1000"></avatar>
							</b-button>
							<b-popover target="popover-target-2" triggers="hover" placement="top">
								<b-btn variant="primary" @click.prevent.stop="logout">{{$t('nav.logout')}}</b-btn>
							</b-popover>
						</b-col>
					</b-row>
				</b-container>
			</header>
    </div>
  </div>
</template>

<script>
	import {auth, db} from '../fire'
	import Avatar from 'vue-avatar'
	import { mapGetters } from 'vuex'
	import store from '../store/store'

	export default {
		name:"HeaderItems",
		props:{
			showMenuButton: { type: Boolean , default: true }
		},
		data(){
			return {
				pageBackground: '#f8f8f8',
				background: 'white',
				user:{
					email: store.getters.getEmail,
					name:'',
					brand:'',
					role:'',
					location:[]
				},
				selected: '',
				avatarSke: true,
				avatarShow: false
			}
		},
		computed:{
			...mapGetters([
				'getEmail'
			])
		},
		components: {
			Avatar
		},
		async created(){
			var email = this.getEmail;
			await db.collection("users").where('email','==',email).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					this.user.name = doc.data()['name'];
					this.user.brand = doc.data()['brand'];
					this.user.role = doc.data()['role'];
					this.user.location = doc.data()['location'];
					this.selected= this.user.location[0];
					store.commit('brandChanged', doc.data()['brand']);
					store.commit('locationChanged', doc.data()['location'][0]);
				});
			});
		},
		mounted(){
			setTimeout(() => {
				this.setLoadingState(false,true)
			}, 1000)
		},
		methods: {
			onOver() {
			this.$refs.dropdown.visible = true;
			},
			onLeave() {
			this.$refs.dropdown.visible = false;
			},
			location(item){
				this.selected = item;
				store.commit('locationChanged', this.selected);
			},
			openMenu() {
				this.$emit('open-menu');
			},
			setLoadingState (value1,value2) {
				this.avatarSke = value1;
				this.avatarShow = value2;
			},
			logout(){
				auth.signOut().then(() => {
					this.$router.replace('login');
				});
			}
		}
	}
</script>

<style scoped>
.menu-btn {
  background-color: transparent !important;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  font-size: 2rem;
  border: none;
  cursor: pointer;
  height: 100%;
  float: left;
  margin-left: 1.5rem;
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
	.headerContent{
		margin-left: 4.5rem;
	}
}
@media screen and (max-width: 768px) {
	.user{
		margin-right: 8px;
	}
}
@media screen and (min-width: 768px) {
	.brand{
		padding: 0 15px !important;
	}
}
.brand{
	margin: auto;
	padding: 0;
}
.va-m{
	vertical-align: middle;
}
.user{
	padding-left:0 !important;
	margin-top: 8px;
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