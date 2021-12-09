const state = {
  recipeVal:[],
  header:[]
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
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}