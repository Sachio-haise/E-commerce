<template>
    <nav
        class="navbar position-fixed top-0 w-100 navbar-expand-lg navbar-light bg-light p-0"
    >
        <!-- Container wrapper -->
        <div class="container-fluid ps-0 py-2">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Navbar brand -->
                <a
                    class="nav-header text-decoration-none mt-2 mt-lg-0"
                    href="#"
                >
                    <h4 class="ps-3 d-flex mb-0 text-black">
                        <i
                            class="fa-solid fa-shopping-bag me-2 text-primary"
                        ></i>
                        <span class="brand-text">
                            Sh<span class="text-primary">o</span>p
                        </span>
                    </h4>
                </a>
                <a @click="toggleNavBtn" class="ms-3" href="#">
                    <i class="fa fa-bars"></i>
                </a>
                <form class="d-flex ms-3 search-item">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <i class="fa fa-search text-black-50"></i>
                </form>
            </div>
            <!-- Collapsible wrapper -->

            <!-- Right elements -->
            <div class="d-flex align-items-center">
                <!-- Icon -->
                <router-link to="/cart" class="nav-link text-black">
                    <div class="position-relative">
                        <i class="fa-solid fa-shopping-cart"></i>
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                            style="font-size: 0.5em"
                        >
                            {{ this.$store.state.cartCount }}
                        </span>
                    </div>
                </router-link>

                <!-- Notifications -->
                <div class="dropdown">
                    <button
                        class="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            :src="this.$store.state.auth.user.profile"
                            class="user-img rounded-circle shadow-sm"
                            style="width: 25px;height: 25px"
                            alt=""
                        />
                    </button>
                    <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li>
                            <router-link class="dropdown-item" :to="{name: 'products.index'}">
                                To Store
                            </router-link>
                        </li>
                        <li>
                            <a class="dropdown-item" href="">{{
                                this.$store.state.auth
                                    ? this.$store.state.auth.user.name
                                    : ""
                            }}</a>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li>
                            <button
                                class="btn dropdown-item"
                                @click="this.$store.dispatch('logout')"
                            >
                                <i class="fa fa-sign-out me-2"></i>Logout
                            </button>
                        </li>
                    </ul>
                </div>
                <!-- Avatar -->
            </div>
            <!-- Right elements -->
        </div>
        <!-- Container wrapper -->
    </nav>
</template>
<script>
export default {
    methods: {
        toggleNavBtn() {
            $(".wrapper").toggleClass("slide-nav-toggle");
            return false;
        },
    },
};
</script>
