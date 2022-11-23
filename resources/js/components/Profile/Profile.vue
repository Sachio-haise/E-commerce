<template>
    <Main>
        <div class="row pt-4">
            <Breadcrumb>
                <li class="breadcrumb-item"><router-link :to="{name : 'dashboard'}" class="text-decoration-none">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Profile</li>
            </Breadcrumb>
            <div class="col-10">
                <div class="container-fluid">
                    <figure class="card row">
                        <div class="d-flex col-12 card-header p-5">
                            <img
                                class="img-fluid profile img-thumbnail me-5"
                                :src="userprofile"
                                alt=""
                            />
                            <div class="description ms-3">
                                <p class="text fs-1 text-bold">{{ user.name }}</p>
                                <p style="color: #e73862">
                                    {{ user.email }}
                                    <span style="color: black"> - {{ role === 'admin'? 'Administrator' : 'User' }}</span>
                                </p>

                                <label
                                    for="userProfile"
                                    class="btn btn-primary"
                                    style="color: white"
                                ><i class="fa-solid fa-upload"></i> Choose
                                    Profile</label
                                >
                                <input
                                    type="file"
                                    id="userProfile"
                                    class="d-none"
                                    @change="changeProfile"
                                />
                            </div>
                        </div>
                        <div class="card-body px-5">
                            <h3>Account</h3>
                            <form>
                                <div class="row my-5">
                                    <label for="name" class="col-4"
                                    >Username
                                        <span class="fs-5" style="color: #e73862">
                                *</span
                                        ></label
                                    >
                                    <input
                                        v-model="username"
                                        type="text"
                                        id="name"
                                        class="col-8 px-3 py-1"
                                    />
                                </div>
                                <div class="row my-5">
                                    <label for="email" class="col-4"
                                    >Email
                                        <span class="fs-5" style="color: #e73862">
                                *</span
                                        ></label
                                    >
                                    <input
                                        v-model="email"
                                        type="email"
                                        id="email"
                                        class="col-8 px-3 py-1"
                                    />
                                </div>
                                <div class="row my-5">
                                    <label for="password" class="col-4"
                                    >Password
                                        <span class="fs-5" style="color: #e73862">
                                *</span
                                        ></label
                                    >
                                    <input
                                        v-model="password"
                                        type="password"
                                        id="password"
                                        class="col-8 px-3 py-1"
                                        placeholder=""
                                    />
                                </div>
                                <div class="row my-5">
                                    <label for="profile" class="col-4"
                                    >Profile
                                        <span class="fs-5" style="color: #e73862">
                                *</span
                                        ></label
                                    >
                                    <label for="profile" class="btn btn-outline-dark col-8"
                                    ><i class="fa-solid fa-upload"></i> Choose
                                        Profile</label
                                    >
                                    <input
                                        type="file"
                                        id="profile"
                                        class="d-none"
                                        @change="setProfile"
                                    />
                                </div>

                                <div class="row my-5">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirmAction"
                                        :class="{ disabled: loading }"
                                        style="color: white"
                                    >
                                        Save Changes
                                    </button>
                                    <Model
                                        title="Reviews and confirm changes"
                                    id="confirmAction"
                                        :description="`<p>The following changes have been made:</p>
                        <p>Username : <span>${username}</span>.</p>
                        <p>Email    : ${email}.</p>
                        <p>Password : ${
                            password ? password : 'No changes'
                        }.</p>
                        Are you sure you want to submit?`"
                                        v-on:confirm="updateInfos"
                                    />
                                </div>
                            </form>
                        </div>
                    </figure>
                </div>

            </div>
        </div>
    </Main>
</template>
<script>
import axios from "axios";
import Model from "./Model.vue";
import Main from "../dashboard/Layout/Main";
import Breadcrumb from "../layouts/Breadcrumb";
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            profile: "",
            role: "",
            userprofile: "",
            loading: false,
            confirm: false,
        };
    },
    created(){
        this.$Progress.start();
        this.role = this.$store.state.auth.role;
    },
    mounted(){
        this.$Progress.finish();
    },
    components: {Breadcrumb, Main, Model },
    computed: {
        user() {
            const user = this.$store.state.auth.user;
            this.username = user.name;
            this.email = user.email;
            this.userprofile = user.profile;
            return user;
        },
    },
    methods: {
        changeProfile(e) {
            this.profile = e.target.files[0];

            this.updateInfos();
        },
        setProfile(e) {
            this.profile = e.target.files[0];
        },
        async updateInfos() {
            this.loading = true;
            const formData = new FormData();
            const user_id = this.$store.state.auth.user.id;
            formData.append("password", this.password);
            formData.append("name", this.username);
            formData.append("email", this.email);
            formData.append("profile", this.profile);
            formData.append("role", this.role);
            const res = await axios.post(
                "/api/dashboard/admin/" + user_id,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                    },
                }
            );
            const { success, data } = res.data;
            if (success) {
                this.loading = false;
                this.$store.dispatch("getVerification");
            } else {
                this.loading = false;
            }
        },
    },
};
</script>
<style scoped>
.card {
    min-width: 400px;
}
.profile {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

input {
    border: 1px solid gray;
    border-radius: 10px;
}
</style>
