import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Example    
const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => lazyLoadComponent(import('@/pages/Home.vue')),
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () => lazyLoadComponent(import('@/pages/ProductDetail.vue'))
    },
    { path: '*', redirect: '/home' }

]

//Create the router instance and pass the `routes` option
// You can pass in additional options here.
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

const lazyLoadComponent = AsyncView => {
    const AsyncHandler = () => ({
        component: AsyncView,
        delay: 400,
        timeout: 10000,
    })

    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children)
        },
    })
}

export default router
