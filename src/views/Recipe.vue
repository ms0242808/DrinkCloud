<template>
  <div class="wrapper">
		<b-container class="mt-2 noMaxWidth">
			<b-row>
				<b-col class="no-putters container" cols="5">
					<h3>{{$t('recipe.title')}}</h3>
				</b-col>
				<b-col class="no-putters" cols="7">
					<b-button-group class="float-right" v-if="machineType[0] && machineType[1]">
						<!-- <b-skeleton width="80px" height="30px"></b-skeleton> -->
					</b-button-group>
					<div class="float-right dflex">
						<b-button class="ml-1 mt-1 f-12" variant="outline-info" @click="swapMachine()"><font-awesome-icon fixed-width icon="sync"/> {{$t('dashboard.'+machineName)}}</b-button>
					</div>
				</b-col>
			</b-row>
		</b-container>
		<template v-if="machineName=='omica'">
			<b-container class="mt-2 noMaxWidth">
				<RHeader :showSke="showSke" :nodata="nodata" :showVal="showVal" :totalCat="allCount[0]" :totalDri="allCount[1]" :catList="catList" :ingList="ingList"/>
			</b-container>
			<div class="mt-3">
				<Cards :showSke="showSke" :showVal="showVal" :recipes="recipes" :nodata="nodata"/>
			</div>
		</template>
		<template v-else-if="machineName=='tea cooker'">
			<b-container class="mt-2 noMaxWidth no-putters">
				<RHeader :machineName="machineName"/>
			</b-container>
			<Cooker :showSke="showSke"/>
		</template>
  </div>
</template>

<script>
  import store from '../store/store'
	import { mapGetters } from 'vuex'
  import { functions, httpsCallable, perf, trace } from "../fire";
  import Cards from '../components/recipe/Cards.vue'
	import RHeader from '../components/recipe/Header.vue'
	import Cooker from '../components/recipe/Cooker.vue'

	export default {
		name: 'Recipe',
		components:{
			RHeader,
			Cards,
			Cooker
		},
		data(){
			return {
				showSke: true,
				showVal: false,
				recipes: store.getters.getRecipe.recipeVal,
				brandL: '',
				nodata: false,
				machineName: 'tea cooker',
			}
		},
		computed:{
			...mapGetters([
				'getLocation'
			]),
			'machineType':function(){
				var omica = false,
				robotics = false,
				machine = store.getters.getMachineType,
				m = '';
				for(m in machine){
					if(machine[m] == "omica"){omica = true;}
					else if(machine[m] == "robotics"){robotics = true}
				}
				return [omica,robotics]
			},
			allCount:function(){
				var recipes = store.getters.getRecipe.recipeVal,
				countCat = recipes.length,
				countDrink = 0,
				x = 0;
				for(x in recipes){countDrink += recipes[x].onDrink.length + recipes[x].offDrink.length;}
				return [countCat,countDrink]
			},
			catList:function(){
				var recipes = store.getters.getRecipe.recipeVal,
				cat = [],
				x = 0;
				for(x in recipes){cat.push({title:recipes[x].id,state:recipes[x].status,og:recipes[x].status})}
				return cat
			},
			ingList:function(){
				var header = store.getters.getRecipe.header;
				header = header.slice(8,-4);
				return header
			}
		},
		watch:{
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
			async swapMachine(){
				switch(this.machineName){
					case("omica"):
						this.machineName = "tea cooker";
						break;
					case("tea cooker"):
						this.machineName = "omica";
						break;
				}
			},
			async loadRecipe(){
				const t = trace(perf,"getRecipe");
				t.start();
				this.nodata = false;
				this.setLoadingState(true,false);
				const getRecipeHeader = httpsCallable(functions, 'getRecipeHeader');
				var header = [];
				await getRecipeHeader({docPath:'recipes/'+this.brandL}).then(result => {header = result.data.header.slice(1,-1)})
				store.commit('recipeHeader',header);
				var recipes = [],
				onList = [],
				offList = [],
				c = '',
				getCat = await getCategory(this.brandL);
				var catTitle = getCat[0];
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
				if(recipes.length === 0){
					this.nodata = true;
					this.setLoadingState(false,false);
				}else{
					this.setLoadingState(false,true);
					this.nodata = false;
				}
				t.stop();
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