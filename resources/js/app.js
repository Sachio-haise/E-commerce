require("./bootstrap");
require("bootstrap/dist/js/bootstrap.bundle");

window.$ = require("jquery");
window.Swal = require("sweetalert2");
import VueSweetalert2 from "vue-sweetalert2";
import axios from "axios";
import { createApp, nextTick } from "vue";

import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import { createStore } from "vuex";

import VueCryptojs from "vue-cryptojs";

import VueProgressBar from "@aacassandra/vue3-progressbar";

const options = {
    color: "#E73862",
    failedColor: "#874b4b",
    thickness: "3px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
  };

const router = new createRouter({
    history: createWebHistory(),
    routes: require("./routes"),
});

router.beforeEach((to, from, next) => {
    
    const verify = localStorage.getItem("verify");
    const isAdmin = localStorage.getItem("r%o%l%e");
    store.dispatch("getProducts");
    store.dispatch("getCategories");
    store.dispatch("getOrderLists");
    console.log(isAdmin);
    if (verify == "true") {
        if (!to.meta.isAuth) {
            return router.go(-1);
        }
    }
    if (isAdmin == "user") {
        if (to.meta.isAdmin) {
            return router.push("/");
        }
    }
    next();

});

router.afterEach((to, from) => {
    window.scroll(0,0);
  })

const store = createStore({
    state() {
        return {
            products: [],
            paginateProducts: [],
            categories: [],
            cart: [],
            order: [],
            search: "",
            auth: [],
            orderLists: [],
            EmailVerification: false,
            cartCount: 0,
            loadOnce: false,
        };
    },
    mutations: {
        updateProducts(state, products) {
            state.products = products;
        },
        updatePaginateProducts(state,products){
            state.paginateProducts = products;
        },
        setLoadOnce(state) {
            state.loadOnce = !state.loadOnce;
        },
        updateCategories(state, categories) {
            state.categories = categories;
        },
        removeFromCart(state, index) {
            state.cart.splice(index, 1);
        },
        updateOrder(state, order) {
            console.log(order);
            state.order = order;
        },
        updateOrderList(state, orders) {
            console.log(orders + "here");
            state.orderLists = orders;
        },
        updateCart(state, cart) {
            state.cart = cart;
        },
        setAuth(state, payload) {
            state.auth = payload;
        },
        setEmailVerification(state, payload) {
            state.EmailVerification = payload;
        },
        setCarts(state, payload) {
            state.cart = payload.data;
            state.cartCount = payload.count;
        },
        setLogout(state) {
            localStorage.clear();
            localStorage.setItem("verify", null);
            state.auth = [];
            state.EmailVerification = false;
        },
        toast(state, title) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "success",
                title: title,
            });
        },
    },
    actions: {
        getProducts({commit}){
            const user = JSON.parse(localStorage.getItem("auth"));
            if (user) {
                const user_id = JSON.parse(localStorage.getItem("auth")).user
                    .id;

                axios
                    .post("/api/products", { user_id })
                    .then((response) => {
                        commit("updateProducts", response.data);
                    })
                    .catch((error) => console.error(error));
            } else {
                axios
                    .get("/api/products")
                    .then((response) => {
                        commit("updateProducts", response.data);
                    })
                    .catch((error) => console.error(error));
            }
        },
        getPaginateProducts({ commit }, page) {
            const user = JSON.parse(localStorage.getItem("auth"));
            if (typeof page === "undefined") {
                page = 1;
            }
            page = JSON.parse(localStorage.getItem("p%g"));
            if (user) {
                const user_id = JSON.parse(localStorage.getItem("auth")).user
                    .id;

                axios
                    .post("/api/products/paginate?page=" + page, { user_id })
                    .then((response) => {
                        commit("updatePaginateProducts", response.data);
                    })
                    .catch((error) => console.error(error));
            } else {
                axios
                    .get("/api/products/paginate?page=" + page)
                    .then((response) => {
                        commit("updatePaginateProducts", response.data);
                    })
                    .catch((error) => console.error(error));
            }
        },
        getCategories({ commit }) {
            axios
                .get("/api/categories")
                .then((response) => {
                    commit("updateCategories", response.data);
                })
                .catch((error) => console.error(error));
        },
        clearCart({ commit }) {
            commit("updateCart", []);
        },
        getAuth(context, payload) {
            if (localStorage.getItem("auth")) {
                context.commit(
                    "setAuth",
                    JSON.parse(localStorage.getItem("auth"))
                );
            } else {
                context.commit("setAuth", payload);
            }
        },
        async getVerification({ commit }) {
            const res = await axios.get("/api/me", {
                headers: {
                    Authorization: `Bearer ${this.state.auth.token}`,
                },
            });
            const { data, verify } = res.data;
            if (verify === true) {
                this.dispatch("getCarts");
                this.dispatch("getHistory");
            }
            localStorage.setItem("verify", verify);
            localStorage.setItem("r%o%l%e", data.role);
            localStorage.setItem("token", data.token);
            commit("setAuth", data);
            commit("setEmailVerification", verify);
        },
        async addToCart({ commit, state }, { product, quantity, size }) {
            const formData = new FormData();
            formData.append("product_id", product.id);
            formData.append("quantity", Number(quantity));
            formData.append("size", size);
            formData.append("user_id", state.auth.user.id);
            const res = await axios.post("/api/add-to-cart", formData, {
                headers: {
                    Authorization: `Bearer ${this.state.auth.token}`,
                },
            });
            const { data, success, count } = res.data;
            commit("setCarts", { data, count });
        },
        async getCarts({ commit, state }) {
            const res = await axios.post(
                "/api/carts",
                { user_id: state.auth.user.id },
                {
                    headers: {
                        Authorization: `Bearer ${state.auth.token}`,
                    },
                }
            );
            const { data, count, success } = res.data;
            commit("setCarts", { data, count });
        },
        async removeCart({ commit }, { cart }) {
            const cart_id = cart.product.id;
            const formData = new FormData();
            formData.append("product_id", cart_id);
            formData.append("user_id", this.state.auth.user.id);
            const res = await axios.post("/api/delete-cart", formData, {
                headers: {
                    Authorization: `Bearer ${this.state.auth.token}`,
                },
            });
            const { data, success, count } = res.data;
            commit("setCarts", { data, count });
        },
        socialLogin({ commit }, provider) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/api/authorize/" + provider)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        socialLoginCallback({ commit }, { payload, provider }) {
            console.log(provider);
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios
                    .get("/api/authorize/" + provider + "/callback", {
                        params: payload,
                    })
                    .then((response) => {
                        if (response.data.data.token) {
                            localStorage.setItem(
                                "auth",
                                JSON.stringify(response.data.data)
                            );
                            commit(
                                "setAuth",
                                JSON.parse(localStorage.getItem("auth"))
                            );
                            axios
                                .get("/api/me", {
                                    headers: {
                                        Authorization: `Bearer ${this.state.auth.token}`,
                                    },
                                })
                                .then((res) => {
                                    const { data, verify } = res.data;
                                    localStorage.setItem("verify", verify);
                                    commit("setEmailVerification", verify);
                                    if (res.data.verify) {
                                        router.push({
                                            name: "products.index",
                                        });
                                    } else {
                                        router.push({
                                            name: "verify",
                                        });
                                    }
                                });
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        async likeProduct({ commit, state }, { product, current }) {
            const user_id = state.auth.user.id;
            const res = await axios.post(
                "/api/product-like",
                {
                    product_id: product.id,
                    user_id: user_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.state.auth.token}`,
                    },
                }
            );
            this.dispatch("getPaginateProducts", current);
            this.dispatch("getProducts");
        },
        async likeComment({ commit, state }, { comment }) {
            const user_id = state.auth.user.id;
            const res = await axios.post(
                "/api/comment-like",
                {
                    comment_id: comment.id,
                    user_id: user_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.state.auth.token}`,
                    },
                }
            );
            this.dispatch("getPaginateProducts");
            this.dispatch("getProducts");
        },
        addComment({ commit, state }, { product, body, comment }) {
            const user_id = state.auth.user.id;
            axios.post(
                "/api/comment",
                {
                    product_id: product.id,
                    user_id,
                    body,
                    parent_id: comment ? comment.id : "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.state.auth.token}`,
                    },
                }
            );
            this.dispatch("getProducts");
            this.dispatch("getPaginateProducts");
        },
        editComment({ commit, state }, { product, body, comment }) {
            const user_id = state.auth.user.id;

            axios.post(
                `/api/comment/${comment.id}`,
                {
                    product_id: product.id,
                    user_id,
                    body,
                    parent_id: comment ? comment.id : "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.state.auth.token}`,
                    },
                }
            );
            this.dispatch("getProducts");
            this.dispatch("getPaginateProducts");
        },
        deleteComment({ commit }, { comment }) {
            axios.delete(`/api/comment/${comment.id}`, {
                headers: {
                    Authorization: `Bearer ${this.state.auth.token}`,
                },
            });
            this.dispatch("getProducts");
            this.dispatch("getPaginateProducts");
        },
        async getHistory({ commit, state }) {
            const res = await axios.post(
                "/api/history",
                { email: state.auth.user.email },
                {
                    headers: {
                        Authorization: `Bearer ${this.state.auth.token}`,
                    },
                }
            );
            commit("updateOrder", res.data.data);
        },
        async getOrderLists({ commit, state }) {
            await axios
                .get("/api/dashboard/orders", {
                    headers: {
                        Authorization: `Bearer ${state.auth.token}`,
                    },
                })
                .then((res) => {
                    const orders = res.data.data.orders;

                    commit("updateOrderList", orders);
                });
        },
        logout({ commit, state }) {
            commit("setLogout");
            router.push("/login");
            commit("updateCart", []);
            commit("updateOrder", []);
            commit("updateOrderList", []);
            state.cartCount = 0;
        },
    },
});

const app = createApp({
    created() {
        store
            .dispatch("getProducts")
            .then((_) => {})
            .catch((error) => console.error(error));
        store
            .dispatch("getPaginateProducts")
            .then((_) => {})
            .catch((error) => console.error(error));
        store
            .dispatch("getCategories")
            .then((_) => {})
            .catch((error) => console.error(error));
        store
            .dispatch("getAuth")
            .then((_) => {})
            .catch((error) => console.log(error));
        store
            .dispatch("getVerification")
            .then((_) => {})
            .catch((error) => console.log(error));
        //get carts
        const verify = localStorage.getItem("verify");
        if (verify == "true") {
            store
                .dispatch("getCarts")
                .then((res) => {})
                .catch((error) => console.log(error));
            store
                .dispatch("getHistory")
                .then((res) => {})
                .catch((error) => console.log(error));
        }
        const isAdmin = localStorage.getItem("r%o%l%e");
        if (isAdmin === "admin") {
            store
                .dispatch("getOrderLists")
                .then((res) => {})
                .catch((error) => console.log(error));
        }
    },
});

// if(localStorage.getItem('auth')){
//     const token = JSON.parse(localStorage.getItem('auth')).token;
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

app.use(store);
app.use(router);
app.use(VueCryptojs);
app.use(VueProgressBar, options)
app.use(VueSweetalert2);
app.mount("#app");


$(document).on("mouseenter mouseleave", ".wrapper > .sidebar", function (e) {
    if (e.type == "mouseenter") {
        $(".wrapper").addClass("sidebar-hover");
    } else {
        $(".wrapper").removeClass("sidebar-hover");
    }
    return false;
});

$(window).on("load",function (){
    $(".loader-container").fadeOut(500,function (){
        $(this).remove()
    })
});
