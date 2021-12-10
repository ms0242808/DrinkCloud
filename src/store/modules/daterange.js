const state = {
  rangeVal: []
};
const getters = {
  getDateRange: state => {
    return state.rangeVal
  }
};
const actions = {

};
const mutations = {
  rangeChanged(state, range) {
    state.rangeVal = range;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}