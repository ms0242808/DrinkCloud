const state = {
  // stats: []
  madeVal : 'No data',
  topVal : 'No data',
  hrVal : 'No data',
  healthVal : 'No data',
  overviewVal: [],
  overviewLab: [],
  tpieVal: [],
  tpieLab: [],
  jpieVal: [],
  jpieLab: [],
  sradarVal1: [],
  sradarVal2: [],
  iradarVal1: [],
  iradarVal2: [],
  ipieVal: [],
  ipieLab: []
};
const getters = {
  getStats: state => {
    return state
  }
};
const actions = {

};
const mutations = {
  statsChanged(state, stats) {
    state.madeVal = stats[0];
    state.topVal = stats[1];
    // state.hrVal = stats[2];
    state.overviewLab = stats[3];
    state.overviewVal = stats[4];
    state.tpieLab = stats[5];
    state.tpieVal = stats[6];
    state.jpieLab = stats[7];
    state.jpieVal = stats[8];
    state.sradarVal1 = stats[9];
    state.sradarVal2 = stats[10];
    state.iradarVal1 = stats[11];
    state.iradarVal2 = stats[12];
    state.ipieLab = stats[13];
    state.ipieVal = stats[14];
  },
  healthUpdate(state,val){
    state.healthVal = val;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}