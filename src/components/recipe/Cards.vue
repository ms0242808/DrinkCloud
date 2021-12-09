<template>
  <b-card-group deck>
    <div v-show="skele[0]" class="w-100">
      <b-row>
        <b-col cols="8">
          <b-skeleton height="30px"></b-skeleton>
        </b-col>
        <b-col cols="4">
          <b-skeleton height="30px"></b-skeleton>
        </b-col>
      </b-row>
      <hr>
      <b-col lg="3" md="4">
        <b-card>
          <b-row>
            <b-col cols="3">
              <b-skeleton height="30px"></b-skeleton>
            </b-col>
            <b-col cols="6">
              <b-skeleton height="30px"></b-skeleton>
            </b-col>
            <b-col cols="3">
              <b-skeleton height="30px"></b-skeleton>
            </b-col>
            <b-col cols="12" class="mt-3">
              <b-skeleton height="50px"></b-skeleton>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </div>

    <b-row v-for="(item, index) in recipeVal" v-bind:key="index" v-show="skele[1]" class="w-100 no-gutters">
      <b-col cols="12" class="mt-3">
        <b-row>
          <b-col :class="item.class" cols="8">
            {{item.id}}
          </b-col>
          <b-col cols="4" class="text-end">
            {{item.onDrink.length}}/{{item.drinkCount}}
          </b-col>
        </b-row>
        <hr>
      </b-col>
      <b-col v-for="(title, index) in item.onDrink" :key="'on'+index" lg="3" md="4" class="mt-3">
        <b-card class="border-left-success" :class="{'opacity07':!item.status}">
          <b-row>
            <b-col cols="3" class="text-center">
              <font-awesome-icon fixed-width icon="exchange-alt"/>
            </b-col>
            <b-col cols="6" class="text-center no-putters" >
              {{title}}
            </b-col>
            <b-col cols="3" class="text-center text-danger">
              <font-awesome-icon fixed-width icon="trash-alt"/>
            </b-col>
            <b-col cols="12" class="mt-3 text-center">
              <b-button @click="$router.push('/recipe/'+title)" variant="outline-primary">Edit</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col v-for="(title, index) in item.offDrink" :key="'off'+index" lg="3" md="4" class="mt-3">
        <b-card class="border-left-dark" :class="{'opacity07':!item.status}">
          <b-row>
            <b-col cols="3" class="text-center">
              <font-awesome-icon fixed-width icon="exchange-alt"/>
            </b-col>
            <b-col cols="6" class="text-center no-putters" >
              {{title}}
            </b-col>
            <b-col cols="3" class="text-center">
              <font-awesome-icon fixed-width icon="trash-alt"/>
            </b-col>
            <b-col cols="12" class="mt-3 text-center">
              <b-button @click="$router.push('/recipe/'+title)">Edit</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <div class="nodata" v-show="showNodata">
      <div class="text-center w-100">
        <h3 class="font-weight-bold" dlang="recipe-no data">No data</h3>
        <p dlang="recipe-step1">Clcik <b>"+ ADD"</b> button on the top right corner</p>
        <p dlang="recipe-step2">Add a category name then add the related product</p>
      </div>
    </div>
  </b-card-group>
</template>

<script>
import store from '../../store/store'
export default {
  name:'cards',
  props: {
    showSke: {type: Boolean },
    showVal: {type: Boolean },
    nodata: {type: Boolean },
    recipes: {type: Array }
  },
  computed:{
    'skele': function(){
      return [this.showSke,this.showVal]
    },
    'recipeVal': function(){
      return store.getters.getRecipe.recipeVal
    },
    'showNodata': function(){
      return this.nodata
    }
  }
}
</script>

<style scoped>
.nodata{
  width: 100%;
  align-items: center;
  min-height: 70vh;
  display: flex;
}
@media (min-width: 576px){
	.card-deck{
		display: flex;
    flex-flow: row wrap;
	}
	.card{
		max-width: 100%;
	}
}

hr{
  margin: 6px 0;
}

.card{
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 0;
	word-wrap: break-word;
	background-color: #fff;
	background-clip: border-box;
	border: 1px solid #e3e6f0;
	border-radius: 0.35rem;
	box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}

.opacity07{
  opacity: 0.7;
}
</style>
