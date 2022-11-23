<template>
    <Master>
        <section class="py-5" style="min-height: 472px">
            <div class="container">
                <div class="row py-3">
                    <div class="col-12">
                        <p class="text-black-50">search by <span class="text-black fw-bold">"{{ this.$route.params.search }}"</span></p>
                    </div>
                </div>
                <div class="row"> 
                    <h1 v-if="!products.length">There is no products named by <span>"{{ this.$route.params.search }}"</span></h1>
                    <div
                        class="col-12 col-md-6 col-lg-3"
                        v-for="product in products"
                        :key="product.id"
                        v-else
                    >
                        <figure class="card shadow-sm">
                            <div
                                    class="product-img d-flex justify-content-center"
                                    style="height: 200px; min-width: 291px"
                                >
                                    <img :src="product.images" alt="" class="p-3" style="height:100%;">
                                </div>
                            <figcaption class="p-3 text-start border-top">
                                <div class="price">
                                    <span
                                        class=""
                                        v-text="formatCurrency(product.price)"
                                    ></span>
                                </div>
                                <router-link
                                    class="text-decoration-none"
                                    :to="{
                                        name: 'products.detail',
                                        params: { slug: product.slug },
                                    }"
                                >
                                    <p
                                            class="title mb-0 text-black"
                                        
                                        >{{ product.name.substr(
                                                    0,
                                                    25
                                                ) }}{{  product.name.length > 25 ? '...' : ''  }}</p>
                                </router-link>
                                <p
                                    class="text-black-50"
                                    v-text="product.category.name"
                                ></p>
                                <div class="">
                                        <button
                                            class="btn me-2"
                                            :class="
                                            product.inventory === 0
                                            ? 'disabled text-decoration-line-through'
                                            : isInCart(product.id)
                                            ? 'btn-primary text-white'
                                            : 'btn-secondary'
                                            "
                                            v-text="
                                            product.inventory === 0
                                            ? 'Out of stock'
                                            : isInCart(product.id)
                                            ? 'In Cart'
                                            : 'Add To Cart'
                                            "
                                            @click="
                                                this.$store.state
                                                    .EmailVerification
                                                    ? this.$store.dispatch(
                                                          'addToCart',
                                                          {
                                                              product,
                                                              quantity,
                                                              size,
                                                          }
                                                      )
                                                    : $router.push('/login')
                                            "
                                        ></button>
                                        <button
                                            @click="
                                                this.$store.state
                                                    .EmailVerification
                                                    ? this.$store.dispatch(
                                                          'likeProduct',
                                                          {
                                                              product,
                                                              current,
                                                          }
                                                      )
                                                    : $router.push('/login')
                                            "
                                            class="btn btn-light"
                                        >
                                            <i
                                                :style="
                                                    product.is_like
                                                        ? 'color:#E73862'
                                                        : ''
                                                "
                                                class="fa fa-heart"
                                            ></i>

                                            &nbsp;
                                            <span class="text">{{
                                                product.like_count
                                            }}</span>
                                        </button>
                                    </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    </Master>
</template>
<script>
import Master from "../layouts/Master";
export default {
    components: { Master },
    data() {
        return {
            quantity: 1,
            size: "small",
        };
    },
    created(){
        this.$Progress.start();
    },
    mounted(){
        this.$Progress.finish();
    },
    computed: {
        products() {
            return this.$store.state.products.filter(
                    product => product.name.toLowerCase().includes(this.$route.params.search.toLowerCase()) || product.category.name.toLowerCase().includes(this.$route.params.search.toLowerCase())
                )
        },
    },
    methods: {
        isInCart(id){
            return this.$store.state.cart.find(item => item.product_id == id);
        },
        formatCurrency(price) {
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
    },
};
</script>
