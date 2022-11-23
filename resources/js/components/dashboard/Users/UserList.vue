<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Users</li>
            </Breadcrumb>
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <i class="fa fa-list"></i>
                        Users List
                    </div>
                    <div class="card-body table-responsive">
                        <table class="table table-borderless table-hover">
                            <thead>
                                <tr class="table-light">
                                    <th>#</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Email Verify At</th>
                                    <th>Role</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users.data" :key="user.id">
                                    <td style="min-width: 50px">
                                        {{ user.id }}
                                    </td>
                                    <td>
                                        <img
                                            style="width: 100px"
                                            :src="
                                                user.profile
                                                    ? user.profile
                                                    : '/images/default.png'
                                            "
                                            alt="Profile"
                                        />
                                    </td>
                                    <td>
                                        {{ user.name }} <br />
                                        <small
                                            v-if="user.id == User"
                                            class="text text-success fw-bold"
                                            >This is you!</small
                                        >
                                    </td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <span class="small">
                                            <i class="fa fa-calendar"></i>
                                            {{
                                                dateFormat(
                                                    user.email_verify_at,
                                                    "MMM d YYYY"
                                                )
                                            }}
                                        </span>
                                    </td>
                                    <td>
                                        {{ user.role.role }}
                                        <router-link
                                            :to="{
                                                name: 'user.edit',
                                                params: { id: user.id },
                                            }"
                                            class="ms-3"
                                        >
                                            <i
                                                class="fa fa-pencil text-black"
                                            ></i>
                                        </router-link>
                                    </td>
                                    <td>
                                        {{
                                            user.address
                                                ? user.address
                                                : "No Order yet"
                                        }}
                                    </td>
                                    <td>
                                        {{
                                            user.city
                                                ? user.city
                                                : "No Order yet"
                                        }}
                                    </td>

                                    <td>
                                        {{
                                            user.state
                                                ? user.state
                                                : "No Order yet"
                                        }}
                                    </td>
                                    <td>
                                        <span class="small">
                                            <i class="fa fa-calendar"></i>
                                            {{
                                                dateFormat(
                                                    user.created_at,
                                                    "MMM d YYYY"
                                                )
                                            }}
                                        </span>
                                        <br />
                                        <span class="small">
                                            <i class="fa fa-clock"></i>
                                            {{
                                                dateFormat(
                                                    user.created_at,
                                                    "h:mm"
                                                )
                                            }}
                                        </span>
                                    </td>
                                    <td class="text-nowrap">
                                        <button
                                            v-if="user.id !== User"
                                            class="btn"
                                            type="button"
                                            data-bs-toggle="modal"
                                            :data-bs-target="`#user${user.id}`"
                                        >
                                            <i
                                                class="fa fa-trash text-danger"
                                            ></i>
                                            Delete
                                        </button>
                                        <router-link
                                            v-if="user.id === User"
                                            to="/dashboard"
                                            class="btn text fw-bold text-success"
                                            type="button"
                                        >
                                            <i
                                                class="fa-solid fa-house-user"
                                            ></i>
                                            Dashboard
                                        </router-link>
                                        <Model
                                            :id="`user${user.id}`"
                                            title="User Delete Confirmation"
                                            :description="`<p>The following changes have been made:</ p>
                                            <p>Username : <span>${user.name}</span>.</p>
                                            <p>Email    : ${user.email}.</p>
                                            Are you sure you want to delete this user?`"
                                            v-on:confirm="deleteUser(user.id)"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination
                            :data="users"
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
import Model from "../../Profile/Model.vue";
import Breadcrumb from "../../layouts/Breadcrumb";
export default {
    name: "Product-list",
    components: {Breadcrumb, Main, Model, moment, Pagination: LaravelVuePagination },
    data() {
        return {
            users: [],
        };
    },
    created() {
        this.getResults();
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
                .get("/api/dashboard/users?page=" + page, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((response) => {
                    this.users = response.data;
                });
        },
        deleteUser(id) {
            axios
                .delete("/api/dashboard/user/delete/" + id, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((res) => this.getResults())
                .catch((err) => console.log(err));
        },
    },
    computed: {
        User() {
            return JSON.parse(localStorage.getItem("auth")).user.id;
        },
    },
};
</script>
<style scoped>
td {
    min-width: 150px;
}
</style>
