<template>
    <Master>
        <div class="row my-5">
            <section class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-8 mx-auto overflow-auto">
                        <h1 class="fw-bold mb-4 d-none d-md-block">
                            Payment History
                        </h1>
                        <h3 class="fw-bold mb-4 d-block d-md-none">
                            Payment History
                        </h3>
                        <table class="table table-striped w-100">
                            <thead>
                                <tr class="table-light text-center">
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Item Quantity</th>
                                    <th>Transaction ID</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-show="histories?.length !== 0">
                                <tr
                                    v-for="history in histories"
                                    :key="history.id"
                                    class="text text-center"
                                >
                                    <td>{{ history.id }}</td>
                                    <td>
                                        {{ formatDate(history.created_at) }}
                                    </td>
                                    <td>
                                        {{ history.products?.length }}
                                    </td>
                                    <td>{{ history.transaction_id }}</td>
                                    <td>{{ formatCurrency(history.total) }}</td>
                                    <td>
                                        <router-link
                                            :to="{
                                                name: 'history-details',
                                                params: {
                                                    id: history.transaction_id,
                                                },
                                            }"
                                            class="btn text-primary fw-bold"
                                            >View Details</router-link
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2
                            v-show="histories?.length === 0"
                            class="text-center text-primary"
                        >
                            No Order Yet!
                        </h2>

                        <div class="p-2 w-100 d-flex justify-content-center">
                            <router-link :to="{ name: 'cart' }">
                                <button class="btn btn-primary text-white">
                                    Go Back Store
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Master>
</template>
<script>
import Master from "../layouts/Master.vue";
import moment from "moment";
export default {
    data() {
        return {};
    },
    components: { Master },

    methods: {
        formatDate(date) {
            return moment(date).format("LL");
        },
        formatCurrency(price){
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        }
    },
    computed: {
        histories() {
            return this.$store.state?.order;
        },
    },
    created() {
        this.$Progress.start();
        this.$store
            .dispatch("getHistory")
            .then((res) => {})
            .catch((error) => console.log(error));
    },
    mounted(){
        this.$Progress.finish();
    },
};
</script>
