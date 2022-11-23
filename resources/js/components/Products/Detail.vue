<template>
    <Master>
        <section class="py-5" style="min-height: 472px">
            <div class="container" v-if="!product">
                <h1>There is no products named by <span>"{{ this.$route.params.slug }}"</span></h1>
            </div>
            <div class="container" v-else>
                
                <div class="row">
                    <div class="col-sm-12 col-lg-6">
                        <div
                            class="w-100 d-flex justify-content-center"
                            style="height: 530px"
                        >
                            <img :src="product.images" alt="" style="height:100%;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6">
                        <div class="pl-3">
                            <h4 class="" v-text="product.name"></h4>
                            <div class="my-3">
                                <span
                                    class="text-black-50"
                                    v-text="product.category.name"
                                ></span>
                                <span class="text-black-50 fw-bold mx-2">
                                    .
                                </span>
                                <span class="text-black-50">
                                    <i class="fa-solid fa-shopping-basket"></i>
                                    {{ product.order_count === 0 ? 0 : product.order_count }} {{ product.order_count > 1 ? 'orders' : 'order' }}
                                </span>
                                <span class="text-black-50 fw-bold mx-2">
                                    .
                                </span>
                                <span
                                    :class="
                                        product.inventory === 0
                                                ? 'text-black-50 text-decoration-line-through'
                                                : 'text-success'
                                    "
                                    v-text="
                                        product.inventory === 0
                                            ? 'Out of stock'
                                            : 'In stock'
                                    "
                                ></span>
                            </div>
                            <h3
                                class="mb-3"
                                v-text="formatCurrency(product.price)"
                            ></h3>
                            <p
                                class="text-black-50"
                                v-text="product.description"
                            ></p>
                            <hr />
                            <div class="row mb-4">
                                <div class="col-md-4 col-6">
                                    <label class="form-label">Size</label>
                                    <select class="form-select" v-model="size">
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                                <div class="col-md-3 col-6">
                                    <label class="form-label">Quantity</label>
                                    <vue-number-input
                                        v-if="product.inventory === 0"
                                        id="quantity"
                                        :min="0"
                                        v-model.number="outofstock"
                                        :max="0"
                                        inline
                                        center
                                        controls
                                    ></vue-number-input>
                                    <vue-number-input
                                        v-else
                                        id="quantity"
                                        :min="1"
                                        v-model.number="quantity"
                                        :max="product.inventory"
                                        inline
                                        center
                                        controls
                                    ></vue-number-input>
                                </div>
                            </div>
                            <button
                                @click.prevent="
                                    this.$store.state.EmailVerification
                                        ? this.$store.dispatch('addToCart', {
                                              product,
                                              quantity,
                                              size,
                                          })
                                        : $router.push('/login')
                                "
                                class="btn btn-secondary me-2"
                                :class="
                                    product.inventory === 0
                                            ? 'disabled text-decoration-line-through'
                                            : ''
                                "
                            >
                                <i class="fa-solid fa-shopping-basket"></i>
                                {{
                                    product.inventory === 0
                                            ? "Out Of Stock"
                                            : "Add To Cart"
                                    
                                }}
                            </button>
                
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
                            <p
                                class="mt-3 fw-bold"
                            >{{ isInCart? isInCart.quantity : 0 }} in cart</p>
                        </div>
                    </div>
                </div>

                <h5 class="text fw-bold comment-count text-start mt-5">
                    {{ product.comment_count }} {{ product.comment_count > 1 ? "Comments" : "Comment" }}
                </h5>
                <div class="d-flex mt-4" v-if="this.$store.state.auth">
                    <img
                        class="profile me-2"
                        :src="
                            this.$store.state.auth
                                ? this.$store.state.auth.user.profile
                                : '/images/default.png'
                        "
                        alt="Profile"
                    />
                    <form
                        class="comment-form mt-2"
                        @submit.prevent="
                            this.$store.state.EmailVerification
                                ? this.$store
                                      .dispatch('addComment', {
                                          body,
                                          product,
                                      })
                                      .then((_) => (body = ''))
                                : $router.push('/login')
                        "
                    >
                        <div class="input-group">
                            <input
                                type="text"
                                v-model="body"
                                class="form-control input-form"
                                style="border-right: none"
                                placeholder="Add Comment"
                            />
                            <button
                                type="submit"
                                class="input-group-text"
                                style="
                                    background-color: white;
                                    border-left: none;
                                "
                            >
                                <i class="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="row mt-5">
                    <Comments
                        :comment="comment"
                        v-for="comment in product.comments"
                        :key="comment.id"
                        :product="product"
                    />
                </div>
            </div>
        </section>
    </Master>
</template>
<script>
import VueNumberInput from "@chenfengyuan/vue-number-input";
import Comments from "./Comments.vue";
import Master from "../layouts/Master";
export default {
    data() {
        return {
            quantity: 1,
            outofstock : 0,
            size: "small",
            body: "",
        };
    },
    created(){
        this.$Progress.start();
        if(this.isInCart){
            this.quantity = this.isInCart.quantity;
        }
    },
    mounted(){
        this.$Progress.finish();
    },
    components: { Master, VueNumberInput, Comments },
    computed: {
        product() {
            if (this.$route.params.slug) {
                return this.$store.state.products.find(
                    (product) => product.slug === this.$route.params.slug
                );
            }
        },
        isInCart() {
            const slug = this.$route.params.slug;
            const carts = this.$store.state.cart;
            const isInCart = carts.find((cart) => cart.product.slug == slug);
            return isInCart;
        },
        
    },
    methods: {
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

<style scoped>
.comment-form {
    min-width: 350px;
    width: 90%;
}
.profile {
    width: 50px;
    border-radius: 50%;
}

.input-group-text {
    color: #e73862;
    font-size: 1.3rem;
}
</style>
