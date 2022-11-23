<template>
    <Main>
        <div class="row pt-4">
            <div class="col-12">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="card">
                            <div class="card-body rounded shadow-sm">
                                <div class="row">
                                    <div class="col-6 text-center py-2">
                                        <h4 class="d-block">
                                            {{ user_count }}
                                        </h4>
                                        <span class="d-block text-black-50"
                                            >Total Users</span
                                        >
                                    </div>
                                    <div
                                        class="col-6 d-flex align-items-center justify-content-center py-2"
                                    >
                                        <i class="fa fa-users fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="card">
                            <div class="card-body rounded shadow-sm">
                                <div class="row">
                                    <div class="col-6 text-center py-2">
                                        <h4 class="d-block">
                                            {{ order_count }}
                                        </h4>
                                        <span class="d-block text-black-50"
                                            >Total Orders</span
                                        >
                                    </div>
                                    <div
                                        class="col-6 d-flex align-items-center justify-content-center py-2"
                                    >
                                        <i
                                            class="fas fa-shopping-bag fa-3x"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="card">
                            <div class="card-body rounded shadow-sm">
                                <div class="row">
                                    <div class="col-6 text-center py-2">
                                        <h4 class="d-block">
                                            {{ product_count }}
                                        </h4>
                                        <span class="d-block text-black-50"
                                            >Total Products</span
                                        >
                                    </div>
                                    <div
                                        class="col-6 d-flex align-items-center justify-content-center py-2"
                                    >
                                        <i class="fas fa-box fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="card">
                            <div class="card-body rounded shadow-sm">
                                <div class="row">
                                    <div class="col-8 text-center py-2">
                                        <h4 class="d-block">14</h4>
                                        <span class="d-block text-black-50"
                                            >Support Locations</span
                                        >
                                    </div>
                                    <div
                                        class="col-4 d-flex align-items-center justify-content-center py-2"
                                    >
                                        <i class="fa fa-map-location fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OrdersLists />
        </div>
    </Main>
</template>
<script>
import Main from "./Layout/Main";
import OrdersLists from "./OrderLists/OrdersLists.vue";
import axios from "axios";
export default {
    components: { Main, OrdersLists },
    name: "Dashboard",
    data() {
        return {
            showHistory: false,
            product_count: 0,
            user_count: 0,
            order_count: 0,
        };
    },
    methods: {
        getCount() {
            axios
                .get("/api/dashboard/count", {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((res) => {
                    const { order_count, product_count, user_count } =
                        res.data.data;
                    this.order_count = order_count;
                    this.product_count = product_count;
                    this.user_count = user_count;
                });
        },
    },
    mounted(){
        this.$Progress.finish();
    },
    created() {
        this.$Progress.start();
        this.getCount();
    },
};
</script>
