<template>
    <master>
        <div class="row my-5">
            <section class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-8 mx-auto overflow-auto">
                        <h6
                            class="text-black-50"
                        >Transaction ID: {{ order.transaction_id }}</h6>
                        <h1 class="fw-bold mb-4 d-none d-md-block">
                            Ordered Details
                        </h1>
                        <h3 class="fw-bold mb-4 d-block d-md-none">
                            Ordered Details
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
                                    v-for="product in order?.products"
                                    :key="product.id"
                                >
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.pivot.quantity }}</td>
                                    <td>
                                        {{
                                            formatCurrency(product.price *
                                            product.pivot.quantity)
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-2 w-100 d-flex justify-content-center">
                            <button
                                @click="this.$router.go(-1)"
                                class="btn btn-primary text-white"
                            >
                                Go Back
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
        formatCurrency(price) {
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        cartLineTotal(item) {
            let amount = item.price * item.pivot.quantity;
            amount = amount / 100;
            return amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    computed: {
        order() {
            var order;
            order = this.$store.state.order.find(
                (order) => order.transaction_id === this.$route.params.id
            );
            if (order) {
                return order;
            } else {
                return this.$store.state.orderLists.find(
                    (order) => order.transaction_id === this.$route.params.id
                );
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
};
</script>
