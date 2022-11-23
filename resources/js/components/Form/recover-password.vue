<template>
    <Master>
        <div class="container">
            <div class="row my-5 d-flex justify-content-center">
                <div class="col-md-6">
                    <form
                        style="min-width: 300px"
                        @submit.prevent="reset"
                        v-if="!correct"
                    >
                        <h2 class="text-center">Enter Security Code</h2>
                        <div class="m-3 row">
                            <div class="col-6">
                                <input
                                    type="text"
                                    id="code"
                                    v-model="code"
                                    class="col-6 form-control border"
                                    placeholder="Enter code"
                                    :class="{ 'border-danger': errors.code }"
                                />
                                <p v-if="errors.code" class="text text-danger">
                                    {{ errors.code[0] }}
                                </p>
                            </div>
                            <p class="col-6">
                                We sent your code to: <br />
                                <span
                                    v-if="match"
                                    class="text fw-bold"
                                    style="color: #e73862"
                                    >{{ email }}</span
                                >
                            </p>
                        </div>
                        <div class="m-3">
                            <router-link class="cancel btn me-3" to="/login"
                                >Cancel</router-link
                            >
                            <button
                                class="btn btn-primary text-white"
                                type="submit"
                                :disabled="loading"
                            >
                                Continue
                            </button>
                        </div>
                    </form>

                    <form
                        style="min-width: 300px"
                        @submit.prevent="recover"
                        v-if="correct"
                    >
                        <h2 class="text-center">Choose a New Password</h2>
                        <div class="m-3 row">
                            <label for="password" class="form-label"
                                >Create a new password that is at least 8
                                characters long. A strong password is
                                combination of letters, numbers, and punctuation
                                marks.</label
                            >
                            <input
                                type="password"
                                id="password"
                                v-model="password"
                                class="col-6 form-control border"
                                placeholder="New Password"
                                :class="{ 'border-danger': errors.code }"
                            />
                            <p v-if="errors.password" class="text text-danger">
                                {{ errors.password[0] }}
                            </p>
                        </div>
                        <div class="m-3">
                            <router-link class="cancel btn me-3" to="/login"
                                >Cancel</router-link
                            >
                            <button
                                class="btn btn-primary text-white"
                                type="submit"
                                :disabled="loading"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Master>
</template>
<script>
import Master from "../layouts/Master.vue";
import axios from "axios";
export default {
    components: {
        Master,
    },
    data() {
        return {
            code: "",
            loading: false,
            errors: {
                code: "",
                password: "",
            },
            email: "",
            match: false,
            password: "",
            correct: false,
        };
    },
    mounted() {
        this.$Progress.finish();
    },
    methods: {
        async reset() {
            this.loading = true;
            const formData = new FormData();
            formData.append("code", this.code);
            formData.append("email", this.email);
            const res = await axios.post("/api/check-code", formData);
            const { data, success } = res.data;
            if (success) {
                this.correct = true;
                this.loading = false;
            } else {
                this.correct = false;
                this.loading = false;
                this.errors.code = data.code;
            }
        },
        async recover() {
            const formData = new FormData();
            formData.append("password", this.password);
            formData.append("email", this.email);
            const res = await axios.post("/api/reset-password", formData);
            const { data, success } = res.data;
            if (success) {
                console.log(data);
                this.loading = false;
                console.log(data);
                this.$router.push("/");
            } else {
                this.loading = false;
                this.errors.password = data.password;
            }
        },
    },

    created() {
        this.$Progress.start();
        const EncryptedEmail = JSON.parse(localStorage.getItem("R_E"));
        const DecryptedEmail = this.$CryptoJS.AES.decrypt(
            EncryptedEmail,
            "Secret Email"
        ).toString(this.$CryptoJS.enc.Utf8);
        this.email = DecryptedEmail;
        if (this.$route.query.em) {
            const payload = this.$route.query.em;
            const key = "/FQp533/ovEEf2snGLSROHG2kx0V6XjXasFO37TZ8xs=";
            let encryptStr = this.$CryptoJS.enc.Base64.parse(payload);
            let encryptData = encryptStr.toString(this.$CryptoJS.enc.Utf8);
            encryptData = JSON.parse(encryptData);
            let iv = this.$CryptoJS.enc.Base64.parse(encryptData.iv);
            var decrypted = this.$CryptoJS.AES.decrypt(
                encryptData.value,
                this.$CryptoJS.enc.Base64.parse(key),
                {
                    iv: iv,
                    mode: this.$CryptoJS.mode.CBC,
                    padding: this.$CryptoJS.pad.Pkcs7,
                }
            );
            decrypted = this.$CryptoJS.enc.Utf8.stringify(decrypted);
            // decrypted.toString(this.$CryptoJS.enc.Utf8)

            const email = decrypted.match(
                /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
            );
            if (email[0] === DecryptedEmail) {
                this.match = true;
            }
        }
    },
};
</script>
<style scoped>
.cancel {
    background-color: rgb(228, 230, 235);
    color: #4b4f56;
    font-weight: bold;
}
form {
    min-width: 400px;
    background-color: white;
    padding: 2rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.11);
    border-radius: 5px;
}
</style>
