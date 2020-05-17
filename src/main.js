import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// router setup
import routes from './routes/routes';
// store setup
import store from './store/store';

// Plugins
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import Notifications from './components/NotificationPlugin';

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard';

import Chartist from 'chartist';

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active',
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store,
  data: {
    Chartist: Chartist,
  },
});
