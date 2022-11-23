<template>
    <Master>
        <div class="container mt-5">
            <div class="row card">
                <div class="col-12 d-flex profile">
                    <img
                        :src="this.$store.state.auth.user.profile"
                        class="img-thumbnail img"
                    />
                    <h1 class="ms-3 align-self-center profileName">
                        {{ this.$store.state.auth.user.name }} <br />

                        <router-link
                            to="history"
                            class="fs-6 btn"
                            style="color: white"
                        >
                            Show Histoy >>>
                        </router-link>
                    </h1>
                </div>
                <div class="col-12 table-responsive-lg">
                    <table class="table table-borderless mt-3">
                        <thead class="table-info">
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="cart in carts"
                                :key="cart.id"
                                v-if="carts.length"
                            >
                                <td class="ps-5" style="width: 150px">
                                    <img
                                        style="width: 100%"
                                        :src="cart.product.images"
                                        alt=""
                                    />
                                </td>
                                <td class="text-center">
                                    {{ cart.product.name }}
                                </td>
                                <td class="text-center">
                                    {{ formatCurrency(cart.product.price) }}
                                </td>
                                <td class="text-center">
                                    {{ cart.quantity }}
                                </td>
                                <td class="text-center">
                                    {{
                                        formatCurrency(
                                            cart.product.price * cart.quantity
                                        )
                                    }}
                                </td>
                                <td class="text-center">
                                    <router-link
                                        class="btn"
                                        :to="`/products/${cart.product.slug}`"
                                    >
                                        <i class="fa fa-edit"></i>
                                    </router-link>
                                    <button
                                        class="btn"
                                        @click="
                                            this.$store.dispatch('removeCart', {
                                                cart,
                                            })
                                        "
                                    >
                                        <i class="fa fa-trash text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-else class="">
                                <td
                                    colspan="6"
                                    class="text-center text-black-50"
                                >
                                    There is no product in cart
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="text-end">Total Product</td>
                                <td colspan="5">
                                    {{ formatCurrency(TotalProduct) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-end">Total Shipping</td>
                                <td colspan="5">
                                    {{ formatCurrency(discount) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-end">Total</td>
                                <td colspan="5">{{ formatCurrency(Total) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr v-if="carts.length" />
                <div
                    class="card-body"
                    :class="carts.length ? 'd-block' : 'd-none'"
                >
                    <div class="w-75">
                        <div class="row d-flex align-items-center">
                            <div class="col-4">
                                <p class="">
                                    Full Name <span class="text-danger">*</span>
                                </p>
                            </div>
                            <div class="col-4">
                                <small
                                    class="text-danger"
                                    v-if="errors.first_name"
                                    >{{ errors.first_name[0] }}</small
                                >
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    id="first_name"
                                    :class="
                                        errors.first_name ? 'border-danger' : ''
                                    "
                                    v-model="customer.first_name"
                                    :disabled="paymentProcessing"
                                />
                                <small class="form-text">First Name</small>
                            </div>
                            <div class="col-4">
                                <small
                                    class="text-danger"
                                    v-if="errors.last_name"
                                    >{{ errors.last_name[0] }}</small
                                >
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    id="last_name"
                                    :class="
                                        errors.last_name ? 'border-danger' : ''
                                    "
                                    v-model="customer.last_name"
                                    :disabled="paymentProcessing"
                                />
                                <small class="form-text">Last Name</small>
                            </div>
                        </div>
                        <div class="row d-flex align-items-center mt-5">
                            <div class="col-4">
                                <p class="mb-0">
                                    Phone Number
                                    <span class="text-danger">*</span>
                                </p>
                            </div>
                            <div class="col-8">
                                <small
                                    class="text-danger"
                                    v-if="errors.phone"
                                    >{{ errors.phone[0] }}</small
                                >
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="09 000-000-000"
                                    id="phone"
                                    :class="errors.phone ? 'border-danger' : ''"
                                    v-model="customer.phone"
                                    :disabled="paymentProcessing"
                                />
                            </div>
                        </div>
                        <div class="row d-flex align-items-center mt-5">
                            <div class="col-4">
                                <p class="mb-0">
                                    E-mail <span class="text-danger">*</span>
                                </p>
                            </div>
                            <div class="col-8">
                                <small
                                    class="text-danger"
                                    v-if="errors.email"
                                    >{{ errors.email[0] }}</small
                                >
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="ex: myname@example.com"
                                    id="email"
                                    :class="errors.email ? 'border-danger' : ''"
                                    v-model="customer.email"
                                    :disabled="paymentProcessing"
                                />
                                <small class="form-text"
                                    >example@example.com</small
                                >
                            </div>
                        </div>
                        <div class="row d-flex mt-5">
                            <div class="col-4">
                                <p class="mb-0">
                                    Delivery Address
                                    <span class="text-danger">*</span>
                                </p>
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12">
                                        <small
                                            class="text-danger"
                                            v-if="errors.address"
                                            >{{ errors.address[0] }}</small
                                        >
                                        <input
                                            type="text"
                                            class="form-control bg-light"
                                            id="address"
                                            :class="
                                                errors.address
                                                    ? 'border-danger'
                                                    : ''
                                            "
                                            v-model="customer.address"
                                            :disabled="paymentProcessing"
                                        />
                                        <small class="form-text"
                                            >Street Address</small
                                        >
                                    </div>
                                    <div class="col-6 mt-4">
                                        <small
                                            class="text-danger"
                                            v-if="errors.city"
                                            >{{ errors.city[0] }}</small
                                        >
                                        <input
                                            type="text"
                                            class="form-control bg-light"
                                            id="city"
                                            :class="
                                                errors.city
                                                    ? 'border-danger'
                                                    : ''
                                            "
                                            v-model="customer.city"
                                            :disabled="paymentProcessing"
                                        />
                                        <small class="form-text">City</small>
                                    </div>
                                    <div class="col-6 mt-4">
                                        <small
                                            class="text-danger"
                                            v-if="errors.state"
                                            >{{ errors.state[0] }}</small
                                        >
                                        <input
                                            type="text"
                                            class="form-control bg-light"
                                            id="State"
                                            :class="
                                                errors.state
                                                    ? 'border-danger'
                                                    : ''
                                            "
                                            v-model="customer.state"
                                            :disabled="paymentProcessing"
                                        />
                                        <small class="form-text"
                                            >State/Province</small
                                        >
                                    </div>
                                    <div class="col-12 mt-4">
                                        <small
                                            class="text-danger"
                                            v-if="errors.zip_code"
                                            >{{ errors.zip_code[0] }}</small
                                        >
                                        <input
                                            type="text"
                                            class="form-control bg-light"
                                            id="zip_code"
                                            :class="
                                                errors.zip_code
                                                    ? 'border-danger'
                                                    : ''
                                            "
                                            v-model="customer.zip_code"
                                            :disabled="paymentProcessing"
                                        />
                                        <small class="form-text"
                                            >Postal/Zip Code</small
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex align-items-center mt-5">
                            <div class="col-4">
                                <p class="mb-0">
                                    Credit Card Info
                                    <span class="text-danger">*</span>
                                </p>
                            </div>
                            <div class="col-8">
                                <p class="alert alert-warning">
                                    This payment process is in testing mode.
                                    Please use the credit number below : <br />
                                    <span class="badge bg-light text-dark">
                                        4242 4242 4242 4242</span
                                    >
                                </p>
                                <div id="card-element"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
                <router-link to="/" class="btn btn-success"
                    >Continue Shopping</router-link
                >
                <button
                    class="btn"
                    style="background-color: #428bca; color: white"
                    @click="processPayment"
                    :disabled="paymentProcessing"
                    v-text="paymentProcessing ? 'Processing...' : 'Pay Now'"
                    v-if="carts.length"
                ></button>
            </div>
        </div>
    </Master>
</template>
<script>
import Master from "../layouts/Master.vue";
import HistoryVue from "../History/History.vue";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
export default {
    components: {
        Master,
        HistoryVue,
    },
    data() {
        return {
            stripe: {},
            cardElement: {},

            customer: {
                user_id: this.$store.state.auth.user.id,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                address: "",
                city: "",
                state: "",
                zip_code: "",
            },
            paymentProcessing: false,
            discount: 2000,
            errors: "",
        };
    },
    async mounted() {
        this.stripe = await loadStripe(
            "pk_test_51Kibw8F76516hBQxar6uOj2AAwfolm3t8hp9pNbEJ6b2Mwvyfck7sM5L7Dx8Wr5RDjvgt7bmaOqMdFfxeVCIkuwx00aMgVq9W5"
        );
        console.log(this.stripe);
        const elements = this.stripe.elements();
        this.cardElement = elements.create("card", {
            classes: {
                base: "bg-gray rounded border bg-light border-gray p-3 ",
            },
        });
        this.cardElement.mount("#card-element");
    },
    created() {
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

        axios.get("/api/order-user").then((res) => {
            if (
                res.data?.find(
                    (user) => user.user_id === this.$store.state.auth.user.id
                )
            ) {
                const user = res.data?.find(
                    (user) => user.user_id === this.$store.state.auth.user.id
                );
                this.customer.first_name = user.first_name;
                this.customer.last_name = user.last_name;
                this.customer.email = user.email;
                this.customer.phone = user.phone_number;
                this.customer.address = user.address;
                this.customer.city = user.city;
                this.customer.state = user.state;
                this.customer.zip_code = user.zip_code;
            } else {
                console.log("false");
            }
        });
    },
    computed: {
        carts() {
            return this.$store.state.cart;
        },
        TotalProduct() {
            var total = 0;
            this.carts.forEach((cart) => {
                total += cart.product.price * cart.quantity;
            });
            return total;
        },
        Total() {
            return this.TotalProduct - this.discount;
        },
    },
    methods: {
        loadOnce: function () {
            window.location.reload();
        },
        formatCurrency(price) {
            price = price / 100;
            return price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        async processPayment(paymentMethodData) {
            this.paymentProcessing = true;
            const { paymentMethod, error } =
                await this.stripe.createPaymentMethod(
                    "card",
                    this.cardElement,
                    {
                        billing_details: {
                            name:
                                this.customer.first_name +
                                " " +
                                this.customer.last_name,
                            phone: this.customer.phone,
                            email: this.customer.email,
                            address: {
                                line1: this.customer.address,
                                city: this.customer.city,
                                state: this.customer.state,
                                postal_code: this.customer.zip_code,
                            },
                        },
                    }
                );

            if (error) {
                this.paymentProcessing = false;
                console.error(error);
            } else {
                console.log(paymentMethod);
                this.customer.payment_method_id = paymentMethod.id;
                this.customer.amount = this.Total;
                this.customer.cart = JSON.stringify(this.$store.state.cart);

                axios
                    .post("/api/purchase", this.customer)
                    .then((res) => {
                        this.paymentProcessing = false;
                        console.log(res.data);
                        if (res.data.success === false) {
                            this.errors = res.data.error;
                        } else {
                            this.errors = "";
                            this.$store.commit("updateOrder", res.data);
                            for (const cart of this.carts) {
                                this.$store.dispatch("removeCart", { cart });
                            }
                            this.$store.commit(
                                "toast",
                                "payment processed successfully"
                            );
                            this.$router.push({
                                name: "purchase",
                            });
                        }
                    })
                    .catch((error) => {
                        this.paymentProcessing = false;
                        console.error(error.response);
                    });
            }
        },
    },
};
</script>

<style scoped>
.img {
    width: 200px;
    height: 200px;
}
.container {
    min-width: 600px;
}
.profile {
    background-color: #e6619f;
    padding: 2rem;
    border-radius: 10px 10px 0px 0px;
}
.img {
    border-radius: 50%;
}
.profileName {
    color: rgb(253, 253, 253);
}

thead > tr > th {
    padding: 1rem 0;
    text-align: center;
}
.card {
    border: none;
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.08);
    border-radius: 10px;
}
</style>
