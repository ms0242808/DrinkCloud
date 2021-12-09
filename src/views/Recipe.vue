<template>
  <div class="wrapper">
		<b-container class="mt-2 noMaxWidth">
			<b-row>
				<b-col class="no-putters" cols="8">
					<h3>{{$t('recipe.title')}}</h3>
				</b-col>
				<b-col class="no-putters" cols="4">
					<b-button-group class="float-right">
						<b-skeleton width="80px" height="30px"></b-skeleton>
						<b-skeleton width="80px" height="30px"></b-skeleton>
						<!-- <b-button variant="success">Success</b-button>
						<b-button variant="info">Info</b-button> -->
					</b-button-group>
				</b-col>
				<b-col class="no-putters" cols="8">
					<b-skeleton width="70%" height="30px"></b-skeleton>
				</b-col>
				<b-col class="no-putters" cols="4">
					<b-button-group class="float-right">
						<b-skeleton width="60px" height="30px"></b-skeleton>
						<b-skeleton width="60px" height="30px"></b-skeleton>
					</b-button-group>
				</b-col>
			</b-row>
		</b-container>
		<div class="mt-3">
			<Cards :showSke="showSke" :showVal="showVal" :recipes="recipes" :nodata="nodata"/>
		</div>
  </div>
</template>

<script>
  import store from '../store/store'
	import { mapGetters } from 'vuex'
  import { functions, httpsCallable } from "../fire";
  import Cards from '../components/recipe/Cards.vue'

	export default {
		name: 'Recipe',
		components:{
			Cards
		},
		data(){
			return {
				showSke: true,
				showVal: false,
				recipes: store.getters.getRecipe.recipeVal,
				brandL: '',
				nodata: false
			}
		},
		computed:{
			...mapGetters([
				'getLocation'
			])
		},
		watch: {
			getLocation(val){
				this.brandL = val;
				this.loadRecipe();
			}
		},
		methods:{
			setLoadingState(v1,v2){
				this.showSke = v1;
				this.showVal = v2;
			},
			async loadRecipe(){
				this.nodata = false;
				this.setLoadingState(true,false);
				const getRecipeHeader = httpsCallable(functions, 'getRecipeHeader');
				var header = [];
				await getRecipeHeader({docPath:'recipes/'+this.brandL}).then(result => {
					header = result.data.header.slice(1,-1);// remove first and last item
				});
				store.commit('recipeHeader',header);
				console.log(1, header);
				var recipes = [],
				c = '',
				catTitle = await getCategory(this.brandL);
				for(c in catTitle){
					var drinkName = await getCategoryDrink(catTitle[c],this.brandL),
					onDrink = drinkName[0],
					offDrink = drinkName[1],
					drinkLength = onDrink.length,
					status = drinkName[2],
					border = (status) ? "border-left-success":"border-left-dark";
					recipes.push({
						id: catTitle[c],
						"onDrink":onDrink,
						"offDrink":offDrink,
						"drinkCount":drinkLength,
						"status":status,
						"class":border
					});
				}
				store.commit('recipeChanged', recipes);
				if(header.length === 0){
					this.nodata = true;
					this.setLoadingState(false,false);
				}else{
					this.setLoadingState(false,true);
					this.nodata = false;
				}
			}
		},
		async created(){
			// if(typeof this.recipes[0] !== 'undefined'){
			// 	this.setLoadingState(false,true);
			// }
			// else
			if(this.brandL == ''){
				this.brandL = this.getLocation;
				this.loadRecipe();
			} 
			
		}
  }

	async function getCategory(brandL){
		const getCategory = httpsCallable(functions, 'getCategory');
		var catName = [];
		await getCategory({docPath:'recipes/'+brandL}).then(result => {
			catName = result.data.catName;
		});
		return catName;
	}

  async function getCategoryDrink(cat,brandL){
		const getCategoryDrink = httpsCallable(functions, 'getCategoryDrink');
		var [onDrink,offDrink,status] = [[],[],''];
		await getCategoryDrink({docPath:'recipes/'+brandL, category:cat}).then(result => {
			onDrink = result.data.onDrink;
			offDrink = result.data.offDrink;
			status = result.data.status;
		});
		return [onDrink,offDrink,status];
	}
</script>

<style scoped>
.noMaxWidth{
	max-width: unset !important;
}
</style>