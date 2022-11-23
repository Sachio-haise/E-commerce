<template>
    <Main>
        <Breadcrumb>
            <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
            <li class="breadcrumb-item"><router-link :to="{name : 'categories.list'}" class="text-decoration-none">Categories</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Edit</li>
        </Breadcrumb>
        <div class="row pt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <i class="fa fa-pencil text-black me-2"></i>
                        Edit Category
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="edit" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-6">
                                    <div class="">
                                        <label for="title" class="form-label"
                                            >Category Name</label
                                        >
                                        <input
                                            type="text"
                                            v-model="title"
                                            class="form-control"
                                            id="title"
                                        />
                                        <p
                                            v-if="errors.name"
                                            class="text text-danger fw-bold mt-2"
                                        >
                                            {{ errors.name[0] }}
                                        </p>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <button
                                        type="submit"
                                        class="btn btn-primary text-white mt-4 w-100"
                                    >
                                        Edit product
                                    </button>
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
    components: {Breadcrumb, Main, VueNumberInput },
    data() {
        return {
            title: "",
            errors: "",
        };
    },
    mounted(){
        this.$Progress.finish();
    },
    computed: {},
    methods: {
        async getCategory() {
            await axios
                .get("/api/dashboard/category/" + this.$route.params.id, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((res) => {
                    this.title = res.data.name;
                });
        },
        async edit() {
            const formData = new FormData();
            formData.append("name", this.title);
            await axios
                .post(
                    "/api/dashboard/category/edit/" + this.$route.params.id,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.state.auth.token}`,
                        },
                    }
                )
                .then((res) => {
                    const { data, success } = res.data;
                    if (success) {
                        this.$router.push({name : "categories.list"})
                        this.$store.commit('toast',data)
                    } else {
                        this.errors = data;
                    }
                })
                .catch((err) => console.log(err));
        },
    },
    created() {
        this.$Progress.start();
        this.getCategory();
    },
};
</script>
