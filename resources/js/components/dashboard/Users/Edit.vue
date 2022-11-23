<template>
    <Main>
        <div class="row pt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <i class="fa fa-pencil text-black me-2"></i>
                        Edit Role
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="edit">
                            <div class="row">
                                <div class="col-6">
                                    <div class="">
                                        <label for="userRole" class="form-label"
                                            >Roles</label
                                        >
                                        <select
                                            v-model="user"
                                            class="form-select"
                                            id="userRole"
                                        >
                                            <option selected disabled>
                                                select a role
                                            </option>
                                            <option
                                                v-for="role in roles"
                                                :key="role.id"
                                                :value="role"
                                            >
                                                {{ role }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <button
                                        type="submit"
                                        class="btn btn-primary text-white w-100"
                                        style="margin-top: 2rem"
                                    >
                                        Edit User Role
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
export default {
    components: { Main, VueNumberInput },
    data() {
        return {
            user: "",
            errors: "",
            roles: ["admin", "user"],
        };
    },
    computed: {},
    methods: {
        async getUser() {
            await axios
                .get("/api/dashboard/user/" + this.$route.params.id, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                })
                .then((res) => {
                    this.user = res.data.role.role;
                });
        },
        async edit() {
            const formData = new FormData();
            formData.append("role", this.user);
            await axios
                .post(
                    "/api/dashboard/user/edit/" + this.$route.params.id,
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
                        this.$router.push({
                            name: "users.list",
                        });
                        this.$store.commit('toast',`${data.name} changes to ${data.role.role} role!`)
                    } else {
                        this.errors = data;
                    }
                })
                .catch((err) => console.log(err));
        },
    },
    created() {
        this.getUser();
    },
};
</script>
