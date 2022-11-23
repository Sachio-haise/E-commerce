<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Categories</li>
            </Breadcrumb>
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <i class="fa fa-list"></i>
                        Categories List
                    </div>
                    <div class="card-body">
                        <table class="table table-borderless table-hover">
                            <thead>
                            <tr class="table-light">
                                <th>#</th>
                                <th>Category</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="category in categories.data"
                                :key="category.id"
                            >
                                <td>{{ category.id }}</td>
                                <td>
                                    {{ category.name }}
                                </td>
                                <td>
                                        <span class="small">
                                            <i class="fa fa-calendar"></i>
                                            {{
                                                dateFormat(
                                                    category.created_at,
                                                    "MMM d YYYY"
                                                )
                                            }}
                                        </span>
                                    <br />
                                    <span class="small">
                                            <i class="fa fa-clock"></i>
                                            {{
                                            dateFormat(
                                                category.created_at,
                                                "h:mm"
                                            )
                                        }}
                                        </span>
                                </td>
                                <td class="text-nowrap">
                                    <router-link
                                        class="me-3"
                                        :to="{
                                                name: 'category.edit',
                                                params: { id: category.id },
                                            }"
                                    >
                                        <i
                                            class="fa fa-pencil text-black"
                                        ></i>
                                    </router-link>
                                    <button
                                        class="btn"
                                        @click="deleteCategory(category.id)"
                                    >
                                        <i
                                            class="fa fa-trash text-danger"
                                        ></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <Pagination
                            :data="categories"
                            @pagination-change-page="getResults"
                        ></Pagination>
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
import axios from "axios";
import Breadcrumb from "../../layouts/Breadcrumb";
export default {
    name: "Category-list",
    components: {Breadcrumb, Main, moment, Pagination: LaravelVuePagination },
    computed: {
        categories() {
            return this.$store.state.categories;
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
        deleteCategory(id) {
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
                        'Category has been deleted.',
                        'success'
                    )
                    axios
                        .delete("/api/dashboard/category/delete/" + id, {
                            headers: {
                                Authorization: `Bearer ${this.$store.state.auth.token}`,
                            },
                        })
                        .then((res) => this.getResults())
                        .catch((err) => console.log(err));
                }
            })

        },
        dateFormat(date, format) {
            return moment(date).format(format);
        },
        getResults(page) {
            if (typeof page === "undefined") {
                page = 1;
            }
            axios
                .get("/api/dashboard/categories?page=" + page, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((response) => {
                    this.$store.commit('updateCategories',response.data)
                });
        },
    },
};
</script>
