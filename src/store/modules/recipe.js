const state = {
  recipeVal:[],
  header:[],
  onDrink:[],
  offDrink:[]
};
const getters = {
  getRecipe: state =>{
    return state
  }
};
const actions = {

};
const mutations = {
  recipeChanged(state, val) {
    state.recipeVal = val;
  },
  recipeHeader(state,val){
    state.header = val;
  },
  onDrinkUpdate(state,val){
    state.onDrink = val;
  },
  offDrinkUpdate(state,val){
    state.offDrink = val;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}