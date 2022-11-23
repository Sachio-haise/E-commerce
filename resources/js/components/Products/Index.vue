<template>
    <Master>
        <section class="section-intro mb-3" style="height:750px">
            <div class="header_bg">
                <img src="/images/slider-bg.jpeg" alt="" class="w-100">
            </div>
            <div class="container h-100">
                <div class="row h-100">
                    <div
                        class="col-5 d-flex align-items-center"
                    >
                        
                        <article class="">
                            <h1 class="fw-bold mb-3" style="font-size:4rem;">
                                <span class="text-primary">
                                Sale 20% Off
                                </span>
                                <br>
                                On Everything
                            </h1>
                            <p>
                                Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                            </p>
                            <a href="#newProducts" class="btn btn-primary text-white me-2">
                                Shop Now</a
                            >
                        </article>
                    </div>
                </div>
            </div>
            <!-- container end.// -->
        </section>
        <section class="pt-5" id="newProducts">
            <div class="container">
                <header class="mb-3 border-bottom border-2">
                    <h3 class="">New Products</h3>
                </header>
                <div class="row">
                    <div class="p-5" v-if="!products">
                        <h1 class="fw-bold">There is no Product</h1>
                    </div>
                    <carousel
                        :breakpoints="breakpoints"
                        v-else
                    >
                        <slide
                            class=""
                            v-for="product in products"
                            :key="product.id"
                        >
                            <figure class="card shadow-sm mx-2" style="width: 306px !important">
                                <div
                                    class="product-img"
                                    style="height: 200px;"
                                >
                                    <img :src="product.images" alt="" class="p-3" style="height:100%;">
                                </div>
                                <figcaption class="p-3 text-start border-top">
                                    <div class="price">
                                        <span
                                            class=""
                                            v-text="
                                                formatCurrency(product.price)
                                            "
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
                        </slide>
                        <template #addons>
                            <navigation />
                        </template>
                    </carousel>
                </div>
            </div>
        </section>
        <section class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="position-relative overflow-hidden mb-3">
                            <div class="single_banner_info">
                                <h5 class="single_bn_title1">Super Sale</h5>
                                <h3 class="single_bn_title">New Collection</h3>
                                <a
                                    href=""
                                    class="text-decoration-none position-relative text-secondary"
                                    >Shop Now</a
                                >
                            </div>
                            <img src="/images/evos_home2-slide1.webp" alt="" class="w-100">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="position-relative overflow-hidden mb-3">
                            <img src="/images/evos_home3-slide1.webp" alt="" class="w-100">
                            <div class="single_banner_info">
                                <h3 class="single_bn_title">New Season</h3>
                                <h4 class="single_bn_title1">Sale 40% Off</h4>
                                <a
                                    href=""
                                    class="text-decoration-none position-relative text-secondary"
                                    >Shop Now</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="pt-4">
            <div class="container">
                <header class="mb-3 border-bottom border-2">
                    <h3 class="">Deal Of The Days</h3>
                </header>
                <div class="row">
                    <div class="p-5" v-if="!products">
                        <h1 class="fw-bold">There is no Product</h1>
                    </div>
                    <carousel
                        :settings="settings"
                        :breakpoints="breakpoints"
                        v-else
                    >
                        <slide
                            class=""
                            v-for="product in products"
                            :key="product.id"
                        >
                            <figure class="card shadow-sm mx-2" style="width: 306px">
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
                                            v-text="
                                                formatCurrency(product.price)
                                            "
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
                        </slide>
                        <template #addons>
                            <navigation />
                        </template>
                    </carousel>
                </div>
            </div>
        </section>
        <section class="py-5">
            <div class="container-fluid px-2">
                <div class="row mx-0">
                    <div class="col-md-4">
                        <div class="px-1 position-relative mb-3">
                            <img src="/images/shop-men_800x.webp" alt="" class="w-100">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="px-1 position-relative mb-3">
                            <img src="/images/shop-women_800x.webp" alt="" class="w-100">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="px-1 position-relative mb-3">
                            <img src="/images/hipster_girl_800x.jpeg" alt="" class="w-100">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="pt-4">
            <div class="container">
                <header class="mb-3 border-bottom border-2">
                    <h3 class="">Featured Products</h3>
                </header>
                <div class="row">
                    <div class="p-5" v-if="!paginateProductData">
                        <h1 class="fw-bold">There is no Product</h1>
                    </div>
                    <div class="col-12" v-else>
                        <div class="row">
                            <div
                                class="col-lg-3 col-md-6 col-sm-12"
                                v-for="product in paginateProducts.data"
                                :key="product.id"
                            >
                                <figure class="card shadow-sm">
                                    <div
                                    class="product-img d-flex justify-content-center"
                                    style="height: 200px; min-width: 291px"
                                >
                                    <img :src="product.images" alt="" class="p-3" style="height:100%;">
                                </div>
                                    <figcaption class="p-3 border-top">
                                        <div class="price">
                                            <span
                                                class=""
                                                v-text="
                                                    formatCurrency(
                                                        product.price
                                                    )
                                                "
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
                                                    20
                                                ) }}{{  product.name.length > 20 ? '...' : ''  }}</p>
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
                </div>
                <Pagination
                    :data="paginateProductData"
                    @pagination-change-page="getPaginateProducts"
                ></Pagination>
            </div>
        </section>
    </Master>
</template>
<script>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import LaravelVuePagination from "laravel-vue-pagination";
import Master from "../layouts/Master";
export default {
    components: {
        Master,
        Carousel,
        Slide,
        Navigation,
        Pagination: LaravelVuePagination,
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
        getPaginateProducts(page) {
            if (typeof page === "undefined") {
                page = 1;
            }

            this.current = page;
            localStorage.setItem("p%g", JSON.stringify(page));
            this.$store.dispatch("getPaginateProducts", page);

            this.productData = this.$store.state.PaginateProducts;
        },
    },
    created() {
        //  [App.vue specific] When App.vue is first loaded start the progress bar
    //   this.$Progress.start();
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          // parse meta tags
          this.$Progress.parseMeta(meta);
        }
        //  start the progress bar
        this.$Progress.start();
        //  continue to next page
        next();
      });
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish();
      });
        this.getPaginateProducts();
        if (this.$store.state.loadOnce) {
            window.location.reload();
        }
    },
    computed: {
        products() {
            return this.$store.state.products;
        },
        paginateProducts(){
            this.paginateProductData = this.$store.state.paginateProducts;
            return this.paginateProductData;
        },
        categories() {
            return this.$store.state.categories;
        },
    },
    data: () => ({
        // carousel settings
        quantity: 1,
        size: "small",
        paginateProductData: [],
        current: 1,
        // settings: {
        //     itemsToShow: 1,
        //     snapAlign: "center",
        // },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: "center",
            },
            // 1024 and up
            1024: {
                itemsToShow: 4,
                snapAlign: "start",
                wrapAround: false,
            },
        },
    }),
};
</script>
