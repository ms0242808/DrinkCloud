import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from './store/store'
import VueExcelXlsx from "vue-excel-xlsx"
import PortalVue from 'portal-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars,faMapMarkerAlt,faUserShield,faSignOutAlt,faStream,faMap,faTachometerAlt,faBoxes,faFileDownload,faTh,faBox,faFileAlt,faTools,faCog,faCheckCircle,faRobot,faPowerOff,faLemon,faLink,faHdd,faServer,faGlobe,faEye,faChartPie,faListOl,faCalendar,faCaretDown,faExchangeAlt,faTrashAlt,faPlus,faUpload,faLongArrowAltRight,faTimes,faIdBadge,faUser,faUserPlus,faEnvelope,faLock,faEdit,faPaperPlane,faWater,faLeaf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/theme.css'
import './registerServiceWorker'
import i18n from './i18n'
import "./infire"
import { getAuth,onAuthStateChanged } from 'firebase/auth'

Vue.use(VueRouter)
Vue.use(VueExcelXlsx)
Vue.use(PortalVue)
Vue.use(BootstrapVue)
library.add(faBars,faMapMarkerAlt,faUserShield,faSignOutAlt,faStream,faMap,faTachometerAlt,faBoxes,faFileDownload,faTh,faBox,faFileAlt,faTools,faCog,faUserShield,faCheckCircle,faRobot,faPowerOff,faLemon,faLink,faHdd,faServer,faGlobe,faEye,faChartPie,faListOl,faCalendar,faCaretDown,faExchangeAlt,faTrashAlt,faPlus,faUpload,faLongArrowAltRight,faTimes,faIdBadge,faUser,faUserPlus,faEnvelope,faLock,faEdit,faPaperPlane,faWater,faLeaf)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

const auth = getAuth();
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('Login');
  else if (!requiresAuth && currentUser) next('Home');
  else next();
});

router.afterEach((to, from) => {
	Vue.nextTick(() => {document.title = to.meta.title + ' | Drinktec Cloud' || 'Drinktec Cloud'});
});

let app = '';
onAuthStateChanged(auth,user => {
	store.commit('authStateChanged', user);
	if(!app){
		app = new Vue({
			router,
			store,
			i18n,
			render: h => h(App)
		}).$mount('#app')
	}
});
