<template>
    <Main>
        <div class="card my-5 p-4 table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products.products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.pivot.quantity }}</td>
                        <td>{{ formatCurrency(product.price) }}</td>
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
    </Main>
</template>
<script>
import moment from "moment";
import Main from "../Layout/Main.vue";
export default {
    components: { Main },
    computed: {
        products() {
            const order = this.$store.state.orderLists?.find(
                (order) => order.id == this.$route.params.id
            );
            return order.orders.find(
                (o) => o.transaction_id == this.$route.params.transaction
            );
        },
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    methods: {
        formatDate(date) {
            return moment(date).format("LL");
        },
        formatCurrency(price) {
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
    },
};
</script>
