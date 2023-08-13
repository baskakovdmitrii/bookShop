import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import EditBookPage from "@/pages/EditBookPage.vue";
import CartPage from "@/pages/CartPage.vue";

const routes= [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/edit',
        component: EditBookPage
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;