<template>
    <Master>
        <div class="container">
            <div class="row my-5 d-flex justify-content-center">
                <div class="col-md-6">
                    <div class="box">
                        <h2 class="text-center">Sign In</h2>
                        <div class="m-3">
                            <p class="text-black-50 text-center mb-0">Don't have a account yet?
                                <router-link to="/register" class="text-decoration-none">
                                    Sign up here
                                </router-link>
                            </p>
                        </div>
                        <div class="m-3">
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-lg text-white w-100" @click="socialLogin('facebook')" style="background-color: #2374e1;">
                                        <i class="fa-brands fa-facebook-f"></i>
                                        Facebook
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-lg btn-danger w-100" @click="socialLogin('google')">
                                        <i class="fa-brands fa-google"></i>
                                        Google
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr class="text-black-50">
                        <form style="min-width:300px" @submit.prevent="login">

                            <div class="m-3">
                                <label for="email" class="form-label" >Email</label>
                                <input type="email" id="email" v-model="email" class="form-control" placeholder="E-mail">
                                <p class="text text-danger" v-if="errors.email">{{errors.email}}</p>
                            </div>
                            <div class="m-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" v-model="password" class="form-control" placeholder="********">
                                <p class="text text-danger" v-if="errors.password">{{errors.password}}</p>
                            </div>
                            <div class="m-3 d-flex justify-content-between align-items-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="remember">
                                    <label class="form-check-label" for="remember">
                                        keep me signed in
                                    </label>
                                </div>
                                <button class="btn btn-primary text-white" type="submit" :disabled="loading">Login</button>
                            </div>
                            
                            <div class="m-3">
                                <p class="text-black-50 mb-0">
                                    <router-link to="/forgot-password" class="text-decoration-underline">
                                        Forgot Password?
                                    </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Master>
</template>
<script>
import axios from 'axios'
import Master from "../layouts/Master";
export default {
    components: {Master},
    data(){
        return {
            email:'',
            password:'',
            loading:false,
            errors:{
                email:'',
                password:''
            }
        }
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    methods:{
        async login(){
            this.loading = true;
            const formData = new FormData();
            formData.append('email',this.email);
            formData.append('password',this.password);
            const res =await axios.post('/api/login',formData);
            const {success,data} = res.data;
            if(success === true){
                localStorage.setItem('auth',JSON.stringify(data));
                this.$store.dispatch('getAuth',data);
                this.$store.dispatch('getVerification');

                await axios.get('/api/me',{
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                }).then(res => {
                    if(res.data.verify){
                        this.$router.push({
                            name:"products.index",
                        });
                    }else{
                        this.$router.push({
                            name:"verify"
                        });
                        this.loading = false;
                    }

                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                });

            }else{
                if(data == 'User Doesn\'t Exist!'){
                    this.errors.email = data
                }
                if(data == 'Wrong Password!'){
                    this.errors.password = data
                }
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
    },
}
</script>
<style scoped>
.box{
    min-width: 400px;
    background-color:white;
    padding: 2rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.11);
    border-radius: 5px;
}
</style>
