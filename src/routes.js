export const routes = [{
		path: '/',
		name: 'Home',
		redirect: {name:'Dashboard'},
		component: () => import(/* webpackChunkName: "Home" */ '@/components/Home.vue'),
		children:[{
			path: 'overview',
			name: 'Overview',
			component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Overview.vue')
		},{
			path: 'dashboard',
			name: 'Dashboard',
			component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
		},{
			path: 'dashboard/stats/:id',
			name: 'Stats',
			component: () => import(/* webpackChunkName: "Stats" */ '@/views/Stats.vue')
		},{
			path:'recipe',
			name:'Recipe',
			component: () => import(/* webpackChunkName: "Recipe" */ '@/views/Recipe.vue'),
		},{
			path:'recipe/:id',
			name:'Edit',
			component: () => import(/* webpackChunkName: "Recipe" */ '@/views/Edit.vue')
		},{
			path:'permissions',
			name:'Permissions',
			component: () => import(/* webpackChunkName: "Permissions" */ '@/views/Permissions.vue')
		},{
			path:'report',
			name:'Report',
			component: () => import(/* webpackChunkName: "Report" */ '@/views/Report.vue')
		}],
		meta: {
			requiresAuth: true
		}
	},{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ '@/components/Login.vue')
	},{
		path: '*',
		redirect: '/'
	}
];
