import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from './store/store'
import firebase from 'firebase/compat/app'
import VueApexCharts from 'vue-apexcharts'
import PortalVue from 'portal-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/theme.css'
import './registerServiceWorker'
import i18n from './i18n'
import { auth } from './fire'

Vue.use(VueRouter)
Vue.use(VueApexCharts)
Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
library.add(fas)
Vue.component('apexchart', VueApexCharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('Login');
  else if (!requiresAuth && currentUser) next('Home');
  else next();
});

firebase.getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			unsubscribe();
			resolve(user);
		}, reject);
	})
};

let app = '';
auth.onAuthStateChanged(async user => {
	await store.commit('authStateChanged', user);
	if(!app){
		app = new Vue({
			router,
			store,
			firebase,
			i18n,
			render: h => h(App)
		}).$mount('#app')
	}
});
