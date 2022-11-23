<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item"><router-link :to="{name : 'products.list'}" class="text-decoration-none">Products</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Create</li>
            </Breadcrumb>
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3 d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <i class="fa fa-plus-circle me-2"></i>
                            Create New Product
                        </div>
                        <router-link :to="{name : 'products.list'}" class="text-decoration-none">
                            <i class="fa fa-list"></i>
                        </router-link>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="addProduct" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-3">
                                    <div class="">
                                        <label for="productCategory" class="form-label">Category</label>
                                        <select v-model="product.category_id" class="form-select" id="productCategory">
                                            <option selected disabled>select a category</option>
                                            <option
                                                v-for="category in categories"
                                                :key="category.id"
                                                :value="category.id"
                                            >{{ category.name }}</option>
                                        </select>
                                        <small v-if="this.errors.category_id" class="text-danger fw-bold">Please select a category</small>
                                    </div>
                                    <div class="mt-3">
                                        <label for="price" class="form-label">Product Price</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" id="price" v-model="product.price" class="form-control">
                                        </div>
                                        <small v-if="this.errors.price" class="text-danger fw-bold">{{this.errors.price[0]}}</small>
                                    </div>
                                    <div class="mt-3">
                                        <label for="quantity" class="form-label d-block">Product Quantity</label>
                                        <vue-number-input
                                            id="quantity"
                                            :min="1"
                                            v-model="product.quantity"
                                            center
                                            inline
                                            controls
                                        ></vue-number-input>
                                        <small v-if="this.errors.quantity" class="text-danger fw-bold">{{this.errors.quantity[0]}}</small>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="">
                                        <label for="title" class="form-label">Product Title</label>
                                        <input type="text" v-model="product.name" class="form-control" id="title">
                                        <small v-if="this.errors.name" class="text-danger fw-bold">{{this.errors.name[0]}}</small>
                                    </div>
                                    <div class="mt-3">
                                        <label for="description" class="form-label">Product Description</label>
                                        <small v-if="this.errors.description" class="text-danger fw-bold d-block">{{this.errors.description[0]}}</small>
                                        <textarea v-model="product.description" id="description" cols="30" rows="20" class="form-control">
                                        </textarea>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="">
                                        <label for="img" class="form-label">Product Image</label>
                                        <input type="file" @change="setImage" class="form-control" id="img" accept="image/png,image/jpeg">
                                        <small v-if="this.errors.image" class="text-danger fw-bold d-block">
                                            {{ this.errors.image[0] }}
                                        </small>
                                    </div>
                                    <button type="submit" :class="loading ? 'disabled' : ''" class="btn btn-primary text-white mt-4 w-100">create product</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Main>
</template>
<script>
import VueNumberInput from "@chenfengyuan/vue-number-input";
import axios from "axios";
import Main from "../Layout/Main";
import Breadcrumb from "../../layouts/Breadcrumb";
export default {
    components: {Breadcrumb, Main, VueNumberInput},
    data() {
        return {
            product : {
                "name" : "",
                "description" : "",
                "category_id" : "select a category",
                "price" : "",
                "quantity" : 1,
                "image" : ""
            },
            errors : {},
            success : "",
            loading: false
        }
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    computed : {
        categories(){
            return this.$store.state.categories;
        }
    },
    methods: {
        async addProduct(){
            this.$Progress.start();
            this.loading = true;
            const formData = new FormData();
            formData.append('name',this.product.name)
            formData.append('description',this.product.description)
            formData.append('category_id',this.product.category_id)
            formData.append('price',this.product.price)
            formData.append('quantity',this.product.quantity)
            formData.append('image',this.product.image)
            console.log(formData)
            const res = await axios.post('/api/products/store',formData);
            const {success,data} =res.data
            console.log(res.data)
            if (success === false){
                this.errors = data
                this.$Progress.fial()
            }else{
                this.errors = {};
                this.product = {
                    "name" : "",
                    "description" : "",
                    "category_id" : "select a category",
                    "price" : "",
                    "quantity" : 1,
                    "image" : ""
                };
                this.$router.push({name : 'products.list'})
                this.$store.commit('toast',data)
                this.loading = false;
                this.$Progress.finish();
            }
        },
        setImage(e) {
            this.product.image = e.target.files[0];
        }
    },
}
</script>
