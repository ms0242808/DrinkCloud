<template>
  <div class="wrapper">
		<b-container class="mt-2 noMaxWidth">
			<RHeader :showSke="showSke" :showVal="showVal" :totalCat="totalCat" :totalDri="totalDri" :catList="catList" :ingList="ingList"/>
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
	import RHeader from '../components/recipe/Header.vue'

	export default {
		name: 'Recipe',
		components:{
			RHeader,
			Cards
		},
		data(){
			return {
				showSke: true,
				showVal: false,
				recipes: store.getters.getRecipe.recipeVal,
				brandL: '',
				nodata: false,
				totalCat: 0,
				totalDri: 0,
				catList: [],
				ingList: []
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
				onList = [],
				offList = [],
				c = '',
				getCat = await getCategory(this.brandL);
				var catTitle = getCat[0],
				catOn = getCat[1],
				catOff = getCat[2],
				[x,y] = [0,0];
				for(x in catOn){this.catList.push({title:catOn[x],state:true,og:true})}
				for(y in catOff){this.catList.push({title:catOff[y],state:false,og:false})}
				this.ingList = header.slice(8,-4);
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
						"class":border,
						"addShow":false,
						"addRecipe":'',
						'btnState':1
					});
					onList = onList.concat(onDrink);
					offList = offList.concat(offDrink);
				}
				store.commit('recipeChanged', recipes);
				store.commit('onDrinkUpdate', onList);
				store.commit('offDrinkUpdate', offList);
				this.totalCat = catTitle.length
				this.totalDri = onList.length + offList.length;
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
		var catName = [],
		catOn = [],
		catOff = [];
		await getCategory({docPath:'recipes/'+brandL}).then(result => {
			catName = result.data.catName;
			catOn= result.data.catOn;
			catOff = result.data.catOff;
		});
		return [catName,catOn,catOff];
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