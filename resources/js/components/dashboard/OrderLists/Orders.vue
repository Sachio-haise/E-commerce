<template>
    <Main>
        <div class="card my-5 p-4 table-responsive">
            <table class="table">
                <thead>
                    <tr class="text-center">
                        <th>ID</th>
                        <th>Date</th>
                        <th>Item Quantity</th>
                        <th>Transaction ID</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="text-center"
                        v-for="o in order?.orders"
                        :key="o.id"
                    >
                        <td>
                            {{ o.id }}
                        </td>
                        <td>{{ formatDate(o.created_at) }}</td>
                        <td>{{ o.products.length }}</td>
                        <td>{{ o.transaction_id }}</td>
                        <td>{{ formatCurrency(o.total) }}</td>
                        <td>
                            <router-link
                                :to="{
                                    name: 'dashboard-history-details',
                                    params: {
                                        id: order.id,
                                        transaction: o.transaction_id,
                                    },
                                }"
                                class="btn text-primary fw-bold"
                                >View Details</router-link
                            >
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
    </Main>
</template>
<script>
import moment from "moment";
import Main from "../Layout/Main.vue";
export default {
    components: { Main },
    computed: {
        order() {
            return this.$store.state.orderLists?.find(
                (order) => order.id == this.$route.params.id
            );
        },
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
    created() {
        this.$Progress.start();
        console.log(this.order);
    },
};
</script>
<style>
td {
    min-width: 50px;
}
</style>
