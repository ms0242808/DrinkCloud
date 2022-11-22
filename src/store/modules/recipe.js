const state = {
  recipeVal:[],
  header:[],
  onDrink:[],
  offDrink:[],
  cookVal:[],
  publishBtn: false
};
const getters = {
  getRecipe: state =>{
    return state
  },
  getCook: state =>{
    return state.cookVal
  },
  getCookPublish: state =>{
    return state.publishBtn
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
  },
  cookChanged(state,val){
    state.cookVal = val;
  },
  cookPublish(state,val){
    state.publishBtn = val;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}