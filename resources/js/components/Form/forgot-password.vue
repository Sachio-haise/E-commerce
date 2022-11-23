<template>
    <Master>
        <div class="container">
           <div class="row my-5 d-flex justify-content-center">
               <div class="col-md-6">
                   <form style="min-width:300px" @submit.prevent="sentEmail">
                       <h2 class="text-center">Forgot Password</h2>
                       <div class="m-3">
                           <label v-if="!sendFlag" for="email" class="form-label" >Please enter your email address to send reset password mail.</label>
                           <input type="email" id="email" v-model="email" class="form-control" placeholder="E-mail">
                           <p class="text text-danger" v-if="errors.email">{{errors.email}}</p>
                       </div>
                       <div class="m-3 ">
                            <router-link class="cancel btn me-3" to="/login" >Cancel</router-link>
                            <button class="btn btn-primary text-white" type="submit" :disabled="loading">Send</button>
                       </div>                    
                   </form>
               </div>
           </div>
       </div>
    </Master>
</template>
<script>
import axios from 'axios';
import Master from '../layouts/Master.vue';

export default {
    components:{
        Master
    },
    data(){
        return{
            email:"",
            errors:{
                email:""
            },
            loading:false,
        }
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    methods:{
       async sentEmail(){
           this.loading = true;
           const formData = new FormData();
           formData.append('email',this.email);
           const res = await axios.post('/api/forgot-password',formData);
           const {data,success} = res.data;
           console.log(res.data);
           if(success){
                  this.loading = false;
                  const encryptedEmail = this.$CryptoJS.AES.encrypt(this.email, "Secret Email").toString();
                  localStorage.setItem('R_E',JSON.stringify(encryptedEmail));
                  this.$router.push(`/recover-password?em=${data.data}`);
           }else{
               this.errors.email =  data;
               this.loading = false;
           }
        }
    }
}
</script>
<style scoped>
 .cancel{
     background-color: rgb(228,230,235);
     color: #4B4F56;
     font-weight: bold;
 }
 form{
  min-width: 400px;
  background-color:white;
  padding: 2rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.11);
  border-radius: 5px;
}
</style>