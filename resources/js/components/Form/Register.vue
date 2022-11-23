<template>
    <Master>
        <div class="container">
            <div class="row my-5 d-flex justify-content-center">
                <div class="col-md-6">
                    <div class="box">
                        <h2 class="text-center">Create Account</h2>
                        <div class="m-3">
                            <p class="text-black-50 text-center mb-0">
                                Already have an account?
                                <router-link
                                    to="/login"
                                    class="text-decoration-none"
                                >
                                    Sign in here
                                </router-link>
                            </p>
                        </div>
                        <div class="m-3">
                            <div class="row">
                                <div class="col-6">
                                    <button
                                        class="btn btn-lg text-white w-100"
                                        @click="socialLogin('facebook')"
                                        style="background-color: #2374e1"
                                    >
                                        <i class="fa-brands fa-facebook-f"></i>
                                        Facebook
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button
                                        class="btn btn-lg btn-danger w-100"
                                        @click="socialLogin('google')"
                                    >
                                        <i class="fa-brands fa-google"></i>
                                        Google
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr class="text-black-50" />
                        <form @submit.prevent="register">
                            <div class="m-3">
                                <label for="name" class="form-label"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    id="name"
                                    class="form-control"
                                    placeholder="Your Name"
                                    v-model="name"
                                />
                                <p v-if="errors.name" class="text text-danger">
                                    {{ errors.name[0] }}
                                </p>
                            </div>
                            <div class="m-3">
                                <label for="email" class="form-label"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    class="form-control"
                                    placeholder="E-mail"
                                    v-model="email"
                                />
                                <p v-if="errors.email" class="text text-danger">
                                    {{ errors.email[0] }}
                                </p>
                            </div>
                            <div class="m-3">
                                <label for="password" class="form-label"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    placeholder="********"
                                    v-model="password"
                                />
                                <p
                                    v-if="errors.password"
                                    class="text text-danger"
                                >
                                    {{ errors.password[0] }}
                                </p>
                            </div>
                            <div class="m-3">
                                <label
                                    for="profile"
                                    class="btn btn-outline-dark"
                                    ><i class="fa-solid fa-upload"></i> Choose
                                    Profile</label
                                >
                                <input
                                    type="file"
                                    id="profile"
                                    class="d-none form-control"
                                    @change="setProfile"
                                />
                                <p
                                    v-if="errors.profile"
                                    class="text text-danger"
                                >
                                    {{ errors.profile[0] }}
                                </p>
                            </div>

                            <div
                                class="m-3 d-flex justify-content-between align-items-center"
                            >
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="remember"
                                        required
                                    />
                                    <label
                                        class="form-check-label text-black-50"
                                        for="remember"
                                    >
                                        I accept the
                                        <a href="" class="text-decoration-none"
                                            >Terms and Conditions</a
                                        >
                                    </label>
                                </div>
                                <button
                                    class="btn btn-primary text-white me-3"
                                    type="submit"
                                    :disabled="loading"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Master>
</template>
<script>
import axios from "axios";
import Master from "../layouts/Master";
export default {
    components: { Master },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            profile: "",
            loading: false,
            errors: {},
        };
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    methods: {
        setProfile(e) {
            this.profile = e.target.files[0];
        },
        async register() {
            this.loading = true;
            const formData = new FormData();
            formData.append("name", this.name);
            formData.append("email", this.email);
            formData.append("password", this.password);
            formData.append("profile", this.profile);

            const res = await axios.post("/api/register", formData);
            console.log(res.data);
            const { success, data } = res.data;
            if (success === true) {
                localStorage.setItem("auth", JSON.stringify(data));
                this.$store.dispatch("getAuth", data);
                this.loading = false;
                this.$router.push({
                    name: "verify",
                });
            } else {
                this.errors = data;
                localStorage.clear();
                this.loading = false;
            }
        },
        socialLogin(provider) {
            this.$Progress.start();
            this.$store.dispatch("socialLogin", provider).then((resp) => {
                if (resp.data.url) {
                    this.$Progress.finish();
                    window.location.href = resp.data.url;
                }
                console.log(resp);
            });
        },
        cancel() {
            return false;
        },
    },
};
</script>
<style scoped>
.box {
    min-width: 400px;
    background-color: white;
    padding: 2rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.11);
    border-radius: 5px;
}
</style>
