const state = {
  isInited: false,
  isAuthed: false,
  email: '',
  brand: '',
  selected: ''
};
const getters = {
  getEmail: state => {
    return state.email
  },
  getAuthState: state => {
    return state.isAuthed
  },
  getLocation: state => {
    return state.brand + "-" + state.selected
  }
};
const actions = {
};
const mutations = {
  authStateChanged(state, user) {
    state.isAuthed = Boolean(user);
    state.isInited = true;
    if(user !== null){
      state.email = user.email;
    }
  },
  brandChanged(state,val){
    state.brand = val;
  },
  locationChanged(state,val){
    state.selected = val;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}