import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import authStore from './modules/auth'
import rangeStore from './modules/daterange'
import statsStore from './modules/stats'
import recipeStore from './modules/recipe'
export default new Vuex.Store({
   modules: {
      authStore,
      rangeStore,
      statsStore,
      recipeStore
   }
});