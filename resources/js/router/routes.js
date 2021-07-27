const Login = () => import('../Views/Login.vue');
const Register = () => import('../Views/Register.vue');
const Home = () => import('../Views/Home.vue');
const Welcome = () => import('../Views/Welcome.vue')

export default [{
    path: '/',
    component: Welcome,
    name: 'welcome',
},
{
    path: '/home',
    component: Home,
    name: 'home',
    meta: {
        guard: 'auth'
    }
},
{
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
        guard: 'guest'
    }
},
{
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
        guard: 'guest'
    }
},
{
    path: '/:pathMatch(.*)*',
    redirect: '/home',

}
];
