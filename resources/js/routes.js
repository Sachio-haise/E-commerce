

const hasAuth = (to, from, next) => {
    const auth = localStorage.getItem("auth");
    const isverify = localStorage.getItem("verify");
    if (auth) {
        if (isverify == "true") {
            return next();
        } else {
    
            return next("/verify");
        }
    } else {

        return next("/login");
    }
};

module.exports = [
    {
        path: "/",
        name: "products.index",
        component: () => import("./components/Products/Index.vue"),
        meta: {
            progress: {
                func: [
                  { call: "color", modifier: "set", argument: "#E73862" },
                  { call: "fail", modifier: "set", argument: "#6e0000" },
                  { call: "location", modifier: "set", argument: "top" },
                  {
                    call: "transition",
                    modifier: "set",
                    argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                  },
                ],
              },
            isAuth: true,
            
        },
    },
    {
        path: "/products/:slug",
        name: "products.detail",
        component: () => import("./components/Products/Detail.vue"),
        meta: {
            isAuth: true,
        },
    },
    {
        path : "/product/search/:search",
        name: "products.search",
        component: () => import("./components/Products/ProductBySearch.vue"),
        meta: {
            isAuth: true,
        }
    },
    {
        path: "/categories/:category",
        name: "products.category",
        component: () => import("./components/Products/ProductByCategory.vue"),
        meta: {
            isAuth: true,
        },
    },
    {
        path: "/register",
        name: "register",
        component: () => import("./components/Form/Register.vue"),
        meta: {
            isAuth: false,
        },
    },
    {
        path: "/authorize/:provider/callback",
        name: "social-login",
        component: () => import("./components/Form/SocialLogin.vue"),
        meta: {
            isAuth: false,
        },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./components/Form/Login.vue"),
        meta: {
            isAuth: false,
        },
    },
    {
        path: "/verify",
        name: "verify",
        component: () => import("./components/Form/EmailVerify.vue"),
        meta: {
            isAuth: false,
        },
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import("./components/Form/cart.vue"),
        meta: {
            progress: {
                func: [
                  { call: "color", modifier: "set", argument: "#E73862" },
                  { call: "fail", modifier: "set", argument: "#6e0000" },
                  { call: "location", modifier: "set", argument: "top" },
                  {
                    call: "transition",
                    modifier: "set",
                    argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                  },
                ],
              },
            isAuth: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/purchase",
        name: "purchase",
        component: () => import("./components/Form/Purchase.vue"),
        meta: {
            isAuth: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/history",
        name: "history",
        props: true,
        component: () => import("./components/History/History.vue"),
        meta: {
            isAuth: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/history/:id",
        name: "dashboard-history",
        props: true,
        component: () => import("./components/dashboard/OrderLists/Orders.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/history-details/:id/:transaction",
        name: "dashboard-history-details",
        props: true,
        component: () =>
            import("./components/dashboard/OrderLists/OrderDetails.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/history-details/:id",
        name: "history-details",
        props: true,
        component: () => import("./components/History/Details.vue"),
        meta: {
            isAuth: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("./components/Form/forgot-password.vue"),
        meta: {
            isAuth: true,
        },
    },
    {
        path: "/recover-password",
        name: "recover-password",
        component: () => import("./components/Form/recover-password.vue"),
        meta: {
            isAuth: true,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("./components/dashboard/Home.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/products",
        name: "products.list",
        component: () =>
            import("./components/dashboard/Product/ProductList.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/products/create",
        name: "products.create",
        component: () => import("./components/dashboard/Product/Create.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/products/:page/:id/edit",
        name: "products.edit",
        component: () => import("./components/dashboard/Product/Edit.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/products/:page/:id/info",
        name: "products.show",
        component: () => import("./components/dashboard/Product/Info.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/categories",
        name: "categories.list",
        component: () =>
            import("./components/dashboard/Category/CategoryList.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/create-category",
        name: "category.create",
        component: () => import("./components/dashboard/Category/Create.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/edit-category/:id",
        name: "category.edit",
        component: () => import("./components/dashboard/Category/Edit.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/profile",
        name: "user.profile",
        component: () => import("./components/Profile/Profile.vue"),
        meta: {
            isAuth: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/users",
        name: "users.list",
        component: () => import("./components/dashboard/Users/UserList.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
    {
        path: "/dashboard/edit-user/:id",
        name: "user.edit",
        component: () => import("./components/dashboard/Users/Edit.vue"),
        meta: {
            isAuth: true,
            isAdmin: true,
        },
        beforeEnter: hasAuth,
    },
];
