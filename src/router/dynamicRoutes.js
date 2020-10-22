let dynamicRoutes = [
    {
        path: "/",
        component: () => import( /**webpackChunkNmae: Home */ '../pages/Home'),
        name: "home",
        children: []
    },
    {
        path: "*",
        name: "page404",
        component: () => import( /** webpackChunkName:error*/ "../pages/page404")
    }
]

export default dynamicRoutes