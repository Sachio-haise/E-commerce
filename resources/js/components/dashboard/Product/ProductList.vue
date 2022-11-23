<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Products</li>
            </Breadcrumb>
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3 d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <i class="fa fa-list me-2"></i>
                            Products List
                        </div>
                        <router-link :to="{name : 'products.create'}" class="text-decoration-none">
                            <i class="fa fa-plus-circle"></i>
                        </router-link>
                    </div>
                    <div class="card-body table-responsive">
                        <table class="table table-borderless table-hover">
                            <thead>
                                <tr class="table-light">
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Inventory</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="product in products.data"
                                    :key="product.id"
                                >
                                    <td style="min-width:50px">{{ product.id }}</td>
                                    <td>
                                        <span class="text-nowrap">
                                            {{ product.name }}
                                        </span>
                                        <br />
                                        <small class="text-nowrap text-black-50">
                                            {{
                                                product.description.substr(
                                                    0,
                                                    50
                                                )
                                            }}...
                                        </small>
                                    </td>
                                    <td>{{ product.category.name }}</td>
                                    <td style="min-width:100px">{{ formatCurrency(product.price) }}</td>
                                    <td style="min-width:100px">{{ product.inventory }}</td>
                                    <td>
                                        <span class="small">
                                            <i class="fa fa-calendar"></i>
                                            {{
                                                dateFormat(
                                                    product.created_at,
                                                    "MMM d YYYY"
                                                )
                                            }}
                                        </span>
                                        <br />
                                        <span class="small">
                                            <i class="fa fa-clock"></i>
                                            {{
                                                dateFormat(
                                                    product.created_at,
                                                    "h:mm a"
                                                )
                                            }}
                                        </span>
                                    </td>
                                    <td class="text-nowrap">
                                        <button class="btn" @click="show(product.id)">
                                            <i
                                                class="fa fa-circle-info text-warning" style="font-size: 1.4em"
                                            ></i>
                                        </button>
                                        <button class="btn" @click="editProduct(product.id)">
                                            <i
                                                class="fa fa-pencil text-black"
                                            ></i>
                                        </button>
                                        <button class="btn" @click="deleteProduct(product.id)">
                                            <i
                                                class="fa fa-trash text-danger"
                                            ></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-between align-items-center">
                            <Pagination
                                :data="products"
                                @pagination-change-page="getResults"
                            ></Pagination>
                            <p class="fw-bold">Total Products : {{ products.total }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Main>
</template>
<script>
import Main from "../Layout/Main.vue";
import moment from "moment";
import LaravelVuePagination from "laravel-vue-pagination";
import Breadcrumb from "../../layouts/Breadcrumb";
export default {
    name: "Product-list",
    components: {Breadcrumb, Main, moment, Pagination: LaravelVuePagination },
    computed: {
        products() {
            return this.$store.state.paginateProducts;
        }
    },
    created() {
        this.$Progress.start();
        this.getResults();
    },
    mounted(){
        this.$Progress.finish();
    },
    methods: {
        formatCurrency(price) {
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        dateFormat(date, format) {
            return moment(date).format(format);
        },
        getResults(page) {
            if (typeof page === "undefined") {
                page = 1;
            }

            axios
                .get("/api/products/paginate?page=" + page)
                .then((response) => {
                    this.$store.commit('updatePaginateProducts',response.data)
                    console.log(this.products);
                });

        },
        show(id){
            this.$router.push({name : 'products.show',params: {id : id,page : this.products.current_page}})
        },
        editProduct(id){
            this.$router.push({name : 'products.edit',params: {id : id,page : this.products.current_page}})
        },
        deleteProduct(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted successfully!',
                        'Product has been deleted.',
                        'success'
                    )
                    axios
                        .delete(`/api/products/delete/${id}`)
                        .then(response => {
                            console.log(response.data)
                            if (response.data.success === true){
                                this.getResults()
                            }

                        })
                        .catch((err) => console.error(err));
                }
            })
        },
    },
};
</script>
