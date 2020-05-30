import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';

import Dashboard from '@/pages/Dashboard.vue';
import UserProfile from '@/pages/UserProfile.vue';
import Solicitacao from '@/pages/Solicitacao.vue';
import Typography from '@/pages/Typography.vue';
import Icons from '@/pages/Icons.vue';
import Maps from '@/pages/Maps.vue';
import Notifications from '@/pages/Notifications.vue';
import UpgradeToPRO from '@/pages/UpgradeToPRO.vue';
import Login from '@/pages/Login.vue';
import SignUp from '@/pages/SignUp.vue';
import Users from '@/pages/Users.vue';
import Simulacao from '@/pages/Simulacao.vue';
import SolicitacaoDetalhe from '@/pages/SolicitacaoDetalhe.vue';

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'user',
        name: 'User Profile',
        component: UserProfile,
      },
      {
        path: 'users',
        name: 'users',
        component: Users,
      },
      {
        path: 'simular-seguro',
        name: 'Simular Seguro',
        component: Simulacao,
      },
      {
        path: 'solicitacoes',
        name: 'Solicitações',
        component: Solicitacao,
      },
      {
        path: 'solicitacoes/:solicitacaoId',
        name: 'solicitacoes-detalhe',
        component: SolicitacaoDetalhe,
        props: true,
      },
    ],
  },
];

export default routes;
