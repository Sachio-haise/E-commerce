<template>
    <div class="card my-5 p-4 table-responsive">
        <table class="table">
            <thead>
                <tr class="text-center">
                    <th>ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>Portal Code</th>
                    <th>Orders</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="order in orders" :key="order.id">
                    <th scope="row">{{ order.id }}</th>
                    <td>{{ formatDate(order.created_at) }}</td>
                    <td>{{ order.first_name + " " + order.last_name }}</td>
                    <td>{{ order.email }}</td>
                    <td>{{ order.phone_number }}</td>
                    <td>{{ order.city }}</td>
                    <td>{{ order.address }}</td>
                    <td>{{ order.state }}</td>
                    <td>{{ order.zip_code }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'dashboard-history',
                                params: {
                                    id: order.id,
                                },
                            }"
                            class="stretched-link text-primary"
                            >View Orders</router-link
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from "moment";
export default {
    methods: {
        formatDate(date) {
            return moment(date).format("LL");
        },
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    computed: {
        orders() {
            return this.$store.state.orderLists;
        },
    },
};
</script>
<style>
td {
    min-width: 200px;
}
</style>
