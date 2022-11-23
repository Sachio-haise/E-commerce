<template>
    <div class="header-top header-border-bottom small bg-black">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <!-- Left -->
                <div
                    class="d-flex align-items-center justify-content-center d-none d-lg-block"
                >
                    <ul class="nav white-link">
                        <li class="nav-link ps-0 me-3 text-white">
                            <span>
                                <i class="fa fa-clock me-2"></i>
                                Visit time: Mon-Sat 9:00-19:00
                            </span>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link text-white">
                                <i class="fa-solid fa-square-phone me-2"></i>
                                Call us now: +01 035-477-5588
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- Right -->
                <div class="d-flex align-items-center justify-content-center">
                    <!-- Top link -->
                    <ul class="nav ms-auto ms-lg-3">
                        <li class="nav-item">
                            <a href="#" class="nav-link text-white">Contact</a>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link text-white"
                                to="/login"
                                v-if="!isVerify"
                            >
                                <i class="fa fa-user-circle me-2"></i>Login
                            </router-link>
                            <button
                                class="btn text-white"
                                v-if="isVerify"
                                @click="this.$store.dispatch('logout')"
                            >
                                <i class="fa fa-sign-out me-2"></i>Logout
                            </button>
                        </li>
                    </ul>
                    <!-- Top social -->
                    <div
                        class="nav header-social justify-content-end d-none d-lg-block"
                    >
                        <a class="px-2 text-white" href="#"
                            ><i class="fa-brands fa-facebook"></i
                        ></a>
                        <a class="px-2 text-white" href="#"
                            ><i class="fa-brands fa-twitter"></i
                        ></a>
                        <a class="px-2 text-white" href="#"
                            ><i class="fa-brands fa-linkedin"></i
                        ></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Header-top",
    data() {
        return {
            isVerify: "",
        };
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
    },

    created() {
        if (this.$store.state.loadOnce) {
            location.reload();
            this.$store.commit("setLoadOnce");
        }
        const isAuth = JSON.parse(localStorage.getItem("auth"));
        if (isAuth) {
            const auth = JSON.parse(localStorage.getItem("auth")).token;

            axios
                .get("/api/me", {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                })
                .then((res) => {
                    this.isVerify = res.data.verify;
                    if (this.isVerify === false) {
                        console.log(this.isVerify);
                    }
                })
                .catch((err) => {
                    return err;
                });
        }
    },
};
</script>
