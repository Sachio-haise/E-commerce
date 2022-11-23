<template>
    <Master>
        <div class="container">
            <div class="row py-5">
                <div class="col-12 d-flex align-items-center justify-content-center" style="min-height: 376px">
                    <h5 class="text-black-50 my-auto">login with {{ this.$route.params.provider }} , please wait ....</h5>
                </div>
            </div>
        </div>
    </Master>
</template>
<script>
import Master from "../layouts/Master";
export default {
    components: {Master},
    methods:{
        loginUser(){
            this.$store.dispatch('socialLoginCallback',{
                payload : {code : this.$route.query.code},
                provider : this.$route.params.provider
            })
                .then((resp) => {
                    if (resp.data.data.token){
                        this.$router.push({
                            name : 'products.index'
                        })
                    }
                })
            console.log(this.$route.query.code)
        },

    },
    mounted(){
        this.$Progress.finish();
    },
    created() {
        this.$Progress.start();
        this.loginUser()
    }
}
</script>

