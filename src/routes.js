export const routes = [{
		path: '/',
		name: 'Home',
		redirect: {name:'Dashboard'},
		component: () => import(/* webpackChunkName: "Home" */ '@/components/Home.vue'),
		children:[{
			path: 'overview',
			name: 'Overview',
			component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Overview.vue'),
			meta:{title: 'Overview'}
		},{
			path: 'dashboard',
			name: 'Dashboard',
			component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
			meta:{title: 'Dashboard'}
		},{
			path: 'dashboard/stats/:id',
			name: 'Stats',
			component: () => import(/* webpackChunkName: "Stats" */ '@/views/Stats.vue'),
			meta:{title: 'Stats'}
		},{
			path:'recipe',
			name:'Recipe',
			component: () => import(/* webpackChunkName: "Recipe" */ '@/views/Recipe.vue'),
			meta:{title: 'Recipe'}
		},{
			path:'recipe/:id',
			name:'Edit',
			component: () => import(/* webpackChunkName: "Recipe" */ '@/views/Edit.vue'),
			meta:{title: 'Edit'}
		},{
			path:'permissions',
			name:'Permissions',
			component: () => import(/* webpackChunkName: "Permissions" */ '@/views/Permissions.vue'),
			meta:{title: 'Permissions'}
		},{
			path:'report',
			name:'Report',
			component: () => import(/* webpackChunkName: "Report" */ '@/views/Report.vue'),
			meta:{title: 'Report'}
		}],
		meta: {
			requiresAuth: true
		}
	},{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ '@/components/Login.vue'),
		meta:{title: 'Login'}
	},{
		path: '*',
		redirect: '/'
	}
];
