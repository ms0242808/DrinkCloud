const state = {
  isInited: false,
  isAuthed: false,
  email: '',
  name: '',
  role: '',
  brand: '',
  location: [],
  selected: '',
  accType: false
};
const getters = {
  getEmail: state => {
    return state.email
  },
  getAuthState: state => {
    return state.isAuthed
  },
  getUsername: state => {
    return state.name
  },
  getRole: state => {
    return state.role
  },
  getLocation: state => {
    return state.brand + "-" + state.selected
  },
  getLocationList:state => {
    return state.location
  },
  getAccType:state => {
    return state.accType
  },
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
    state.brand = val.brand;
    state.name = val.name;
    state.role = val.role;
    state.location = val.location;
    state.accType = val.accType;
  },
  brandUpdated(state,val){
    state.brand = val.brand;
    state.location = val.location;
  },
  locationChanged(state,val){
    state.selected = val;
  },
  userNameChanged(state,val){
    state.name = val;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}