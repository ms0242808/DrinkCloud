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
							<a class="d-inline-block">{{user.brand}} - </a> 
							<!-- <div @mouseover="onOver" @mouseleave="onLeave"> -->
								<b-form-select v-model="selected" v-on:change="location" :options="user.location" class="locationSelect d-inline-block"></b-form-select>
							<!-- </div> -->
						</b-col>
						<b-col cols="2" md="1" class="user">
							<b-button variant="link" id="popover-target-2">
								<b-skeleton type="avatar" v-show="avatarSke"></b-skeleton>
								<avatar :username="user.name" v-show="avatarShow"></avatar>
							</b-button>
							<b-popover target="popover-target-2" triggers="hover" placement="top">
								<b-btn variant="primary" @click.prevent.stop="logout">Logout</b-btn>
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
	// import { collection, getDocs, getFirestore} from "firebase/firestore";
	// import 'firebase/compat/firestore'
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
			// onOver() {
			// this.$refs.option.autofocus = true;
			// },
			// onLeave() {
			// this.$refs.option.autofocus = false;
			// },
			location(){
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
.brand{
	margin: 12px 0;
	padding: 0;
}
.user{
	padding-left:0 !important;
}
.locationSelect{
	background-color: unset;
	border: unset;
	width: 97px;
}
.container{
	max-width: unset !important;
}
</style>