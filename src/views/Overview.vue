<template>
  <div class="wrapper">
		<b-container class="bv-example-row mt-2 noMaxWidth no-putters">
      <h3>{{$t('overview.title')}}</h3>
		</b-container>

		<div class="mt-2 noMaxWidth container no-padding">
      <b-row>
        <b-col cols="12" lg="6" class="mt-2">
          <b-card
            overlay
            img-src="https://picsum.photos/900/250/?image=3"
            img-alt="Card Image"
            text-variant="white"
            title="Location"
            sub-title="Subtitle"
          >
            <b-card-text>
              Stats
            </b-card-text>
          </b-card>
        </b-col>
        <!-- https://source.unsplash.com/random/900x300/?taipei -->
        <b-col cols="12" lg="6" class="mt-2">
          <b-card
            no-body
            img-src="https://picsum.photos/seed/london/900/300"
            img-alt="Image"
            img-top
          >
            <b-card-footer>Stats</b-card-footer>
          </b-card>
        </b-col>
        <b-col cols="12" lg="6" class="mt-2">
          <b-card
            no-body
            img-src="https://cdn.pixabay.com/photo/2015/08/13/20/06/flower-887443_1280.jpg"
            img-alt="Image"
            img-top
          >
          <!-- https://gradientjoy.com/200x300 -->
            <b-card-footer>Stats</b-card-footer>
          </b-card>
        </b-col>

        <b-col cols="12" lg="6" class="mt-2">
          <b-card overlay title="Location" img-src="https://picsum.photos/seed/paris/900/300">
            <b-card-text style="background-color:black;">Stats</b-card-text>
          </b-card>
        </b-col>
      </b-row>
			
		</div>
  </div>
</template>

<script>
	import { functions, httpsCallable, db } from "../fire";
	import store from '../store/store'
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'Dashboard',
		data(){
			return {
				showSke: true,
				showStats: false,
				brandL:'',
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
			}
		},
		methods:{
			setLoadingState(v1,v2){
				this.showSke = v1;
				this.showStats = v2;
			},
    },
		async mounted(){
			// this.rangeVal = store.getters.getDateRange;
			// if(this.brandL == ''){
			// 	this.brandL = this.getLocation;
			// 	this.getHealth();
			// 	this.dateClicked(this.rangeVal);
			// }
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
</style>
