import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'


import { TermsOfService, PrivacyPolicy, Home } from './Index/ComponentIndex'
import store from './Store/Store'

const routes = [
    {
        path: '/', component: Home
    },
    { path: '/term-of-service', component: TermsOfService },
    { path: '/privacy-policy', component: PrivacyPolicy },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})



const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
