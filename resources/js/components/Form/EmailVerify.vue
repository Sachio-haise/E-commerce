<template>
    <Master>
        <div class="container my-5">
            <div class="row">
                <div class="col-6 offset-3 paper text text-center p-5">

                    <h1 class="mb-3">
                        <i class="fa-solid fa-shopping-bag"></i>
                        Shop
                    </h1>
                    <h6 class="mb-3">
                        Welcome <span class="text-success">{{user.user.name}}!</span><br>
                        <span class="text-success" v-if="resendFlag">Email Resend!</span>  Please Check your email!
                    </h6>
                    <p>
                        We sent your code to:<br/>
                        <span class="text-success">{{ user.user.email }}!</span>
                    </p>
                    <a href="#" for="resend">Didn't get email?</a> <br>
                    <button  class="btn btn-primary py-2 mt-2" id="resend" :disabled="loading" @click.prevent="resend">Resent Email <i class="fa-solid fa-paper-plane ms-2 "></i></button>
                </div>
            </div>
        </div>
    </Master>
</template>
<script>
import Master from "../layouts/Master";
export default {
    components: {Master},
    data(){
        return{
            resendFlag:false,
            loading:false
        }
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    computed:{
        user(){
            return this.$store.state.auth;
        },
        verify(){
            return this.$store.state.EmailVerification;
        }
    },
    methods:{
        async   resend(){
            this.loading =true;
            await  axios.get('/api/email/verification-notification', {
                headers: {
                    'Authorization': `Bearer ${this.user.token}`
                }
            })
                .then((res)=> {
                    console.log(res.data);
                    this.loading = false;
                    this.resendFlag = true;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                    this.resendFlag = true;
                });

        }
    }

}
</script>
<style scoped>
.paper{
    background-color: whitesmoke;
    box-shadow: 0px 4px 14px 4px rgba(0,0,0,0.62);
    border-radius: 5px;
    min-width: 400px;
}
a{
    text-decoration: none;
    color: #1877F2;
}
.btn-primary{
    background-color: #1877F2;
    border: none;
}
</style>
