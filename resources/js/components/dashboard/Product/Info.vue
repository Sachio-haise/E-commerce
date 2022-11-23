<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item"><router-link :to="{name : 'products.list'}" class="text-decoration-none">Products</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{product.name}}</li>
            </Breadcrumb>
            <div class="col-6">
                <div class="card">
                    <div class="card-header py-3">
                        <i class="fa fa-info-circle"></i>
                        Product Information
                    </div>
                    <div class="card-body">
                        <h4 class="fw-bold">{{ product.name }}</h4>
                        <div class="mt-2">
                        <span class="small me-2">
                            <i class="text-primary fa fa-layer-group"></i>
                            {{ product.category.name }}
                        </span>
                            <span class="small me-2">
                            <i class="text-primary fa fa-calendar"></i>
                            {{ dateFormat(
                                product.created_at,
                                "MMM d YYYY")
                            }}
                        </span>
                            <span class="small me-2">
                            <i class="text-primary fa fa-clock"></i>
                            {{
                                    dateFormat(
                                        product.created_at,
                                        "h:mm a"
                                    )
                                }}
                        </span>
                        </div>
                        <hr>
                        <p class="text-black-50">
                            {{ product.description }}
                        </p>
                        <div class="" v-if="product.images">
                            <img :src="product.images" alt="" style="width:300px">
                        </div>
                        <div class="mt-3">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Main>
</template>
<script>
import Main from "../Layout/Main";
import moment from "moment";
import Breadcrumb from "../../layouts/Breadcrumb";
import axios from "axios";
export default {
    components: {Breadcrumb, Main},
    computed : {
        product(){
            return this.$store.state.products.find((product) => product.id === Number(this.$route.params.id))
        }
    },
    mounted(){
        this.$Progress.finish();
    },
    created() {
        this.$Progress.start();
        console.log(this.$route.params.id)
        console.log(this.$route.params.page)
        localStorage.setItem("p%g",this.$route.params.page)

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
        editProduct(id){
            this.$router.push({name : 'products.edit',params: {id : id,page : this.$route.params.page}})
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
                            if (response.data.success === true){
                                this.$router.push({name : 'products.list'})
                            }
                        })
                        .catch((err) => console.error(err));
                }
            })
        },
    }
}
</script>
