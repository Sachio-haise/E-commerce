<template>
    <nav class="navbar-light bg-white py-2 position-sticky top-0 shadow-sm" style="z-index: 10000">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <a class="navbar-brand fw-bold" href="/">
                    <h2>
                        <i class="fa-solid fa-shopping-bag text-primary"></i>
                        Sh<span class="text-primary">o</span>p
                    </h2>
                </a>
                <div class="">
                    <ul class="list-unstyled d-flex me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link text-black" to="/">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-black" href="#">Store</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link text-black dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li v-for="category in categories"
                                    :key="category.id">
                                    <router-link
                                        class="dropdown-item"
                                        :to="{name: 'products.category',params: {category: category.slug}}"
                                        v-text="category.name"
                                    ></router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-black" href="">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-black" href="">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="">
                    <ul class="list-unstyled d-flex align-items-center me-auto mb-2 mb-lg-0">

                        <li class="nav-item">
                            <a href="" class="nav-link text-black" type="button" data-bs-toggle="modal" data-bs-target="#searchModal">
                                <i class="fa fa-search"></i>
                            </a>
                            <!-- <ul class="dropdown-menu p-0" aria-labelledby="searchBox" style="width: 300px">
                                <div class="d-flex align-items-center px-1">
                                    <form class="d-flex search-item w-100 me-2" id="searchForm" @submit.prevent="search(searchText)">
                                        <input
                                            class="form-control me-2"
                                            v-model="searchText"
                                            placeholder="Search"
                                        />
                                        <i class="fa fa-search text-black-50"></i>
                                    </form>
                                    <button type="submit" form="searchForm" class="btn btn-primary text-white">Search</button>
                                </div>
                            </ul> -->
                        </li>
                        <!-- search modal -->
                        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
                                <div class="modal-content" style=" 
                                    background-color: rgba(0,0,0, 0.4);
                                    <!-- backdrop-filter: blur(3px) -->
                                ">
                                <div class="modal-body d-flex align-items-center justify-content-center">
                                    <button class="btn me-2" data-bs-dismiss="modal">
                                        <i class="fa fa-x"></i>
                                    </button>
                                    <form class="d-flex search-item me-2" @submit.prevent="submit()">
                                        <input
                                            id="searchBox"
                                            ref="searchBox"
                                            class="form-control form-control-lg me-2"
                                            v-model="searchText"
                                            placeholder="Search"
                                            autofocus
                                        />
                                        <i class="fa fa-search text-black-50" style="top: 13px"></i>
                                    </form>
                                    <button class="btn btn-primary text-white" @click="search(searchText)" id="modalBtn" data-bs-dismiss="modal">Search</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <li class="nav-item">
                            <router-link to="/cart" class="nav-link text-black">
                                <div class="position-relative">
                                    <i class="fa-solid fa-shopping-cart"></i>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="font-size: 0.50em">
                                    {{ this.$store.state.cartCount }}
                                </span>
                                </div>
                            </router-link>
                        </li>
                        <li class="nav-item"  v-if="!isVerify">
                            <a href="#" class="nav-link text-black" id="loginDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-user-circle fs-5"></i>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="loginDropdown">
                                <li>
                                    <router-link
                                        class="dropdown-item"
                                        to="/login"
                                    >Login</router-link>
                                </li>
                                <li>
                                    <router-link
                                        class="dropdown-item"
                                        to="/register"
                                    >Register</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item"  v-if="isVerify">
                            <div class="dropdown" v-if="user">
                                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img :src="user.profile" class="user-img rounded-circle shadow-sm"
                                         style="width: 25px;height: 25px" alt="">
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li v-if="role === 'admin'">
                                        <router-link class="dropdown-item" :to="{name : 'dashboard'}">Dashboard</router-link>
                                    </li>
                                    <li v-if="role === 'user'">
                                        <router-link class="dropdown-item" :to="{name : 'user.profile'}">Profile</router-link>
                                    </li>
                                    <li class="dropdown-divider"></li>
                                    <li>
                                        <button class="btn dropdown-item" @click="this.$store.dispatch('logout')">
                                            <i class="fa fa-sign-out me-2"></i>Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "Header-bottom",
    data(){
        return {
            isVerify:'',
            searchText : '',
        }
    },
    computed: {
        role(){
            return localStorage.getItem("r%o%l%e");
        },
        user(){
            return  this.$store.state.auth.user;
        },
        categories(){
            return this.$store.state.categories;
        }
    },
    created(){
        const isAuth = JSON.parse(localStorage.getItem('auth'));
        if(isAuth){
            const auth = JSON.parse(localStorage.getItem('auth')).token;

            axios.get('/api/me',{
                headers: {
                    'Authorization': `Bearer ${auth}`
                }
            }).then(res => {

                this.isVerify = res.data.verify;
                if(this.isVerify === false){
                    console.log(this.isVerify);
                }
            }).catch(err => {return err});
        }

    },
    methods: {
        submit(){
            $("#modalBtn").click();
        },
        search(text){
            if(this.searchText){
                this.$router.push({name : 'products.search',params: {search : text}})
            }
        },
    }
}
</script>
