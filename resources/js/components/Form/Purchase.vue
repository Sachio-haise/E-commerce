<template>
    <master>
        <div class="row my-5">
            <section class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-8 mx-auto overflow-auto">
                        <h6
                            class="text-black-50"
                            v-text="'Transaction ID: ' + order.transaction_id"
                        ></h6>
                        <h1 class="fw-bold mb-4 d-none d-md-block">
                            Thank you for your purchase
                        </h1>
                        <h3 class="fw-bold mb-4 d-block d-md-none">
                            Thank you for your purchase
                        </h3>
                        <table class="table table-borderless w-100">
                            <thead>
                                <tr class="table-light">
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="item in order.products"
                                    :key="item.id"
                                >
                                    <td v-text="item.name"></td>
                                    <td v-text="item.pivot.quantity"></td>
                                    <td v-text="cartLineTotal(item)"></td>
                                </tr>
                                <tr class="fw-bolder py-2">
                                    <td>Total Amount</td>
                                    <td v-text="orderTotalQuantity"></td>
                                    <td v-text="orderTotal"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-2 w-100 d-flex justify-content-center">
                            <button
                                class="btn btn-primary text-white"
                                @click="goback"
                            >
                                Go Back Store
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </master>
</template>
<script>
import Master from "../layouts/Master.vue";
export default {
    components: { Master },
    methods: {
        cartLineTotal(item) {
            let amount = item.price * item.pivot.quantity;
            amount = amount / 100;
            return amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        goback() {
            this.$router.push("/");
            this.$store.commit("setLoadOnce");
        },
    },
    mounted(){
        this.$Progress.finish();
    },
    computed: {
        order() {
            if (this.$store.state.order.data === undefined) {
                this.$router.push("/");
            } else {
                console.log(this.$store.state.order.data);
                return this.$store.state.order.data;
            }
        },
        orderTotal() {
            var total = 0;
            this.order.products.forEach((cart) => {
                total += cart.price * cart.pivot.quantity;
            });
            total = total / 100;
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        orderTotalQuantity() {
            var total = 0;
            this.order.products.forEach((cart) => {
                total += cart.pivot.quantity;
            });
            return total;
        },
    },
    created() {
        this.$Progress.start();
        console.log(this.$store.state.order.data);

        //  this.$store.commit("setLoadOnce");
    },
};
</script>
