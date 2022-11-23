<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item"><router-link :to="{name : 'categories.list'}" class="text-decoration-none">Categories</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Create</li>
            </Breadcrumb>
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <i class="fa fa-plus-circle"></i>
                        Create New Category
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="create">
                            <div class="row">
                                <div class="col-6">
                                    <div>
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
                                        :class="loading ? 'disabled' : ''"
                                        type="submit"
                                        class="btn btn-primary text-white w-100"
                                        style="margin-top: 2rem"
                                    >
                                        create product
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
            loading: false
        };
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        },
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    methods: {
        async create() {
            this.loading = true;
            const formData = new FormData();
            formData.append("name", this.title);
            await axios
                .post("/api/dashboard/category/store", formData, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((res) => {
                    const { data, success } = res.data;
                    if (success) {
                        this.$router.push({name : 'categories.list'})
                        this.$store.commit('toast',data)
                        this.loading = false;
                    } else {
                        this.errors = data;
                    }
                })
                .catch((err) => console.log(err));
        },

    },

};
</script>
