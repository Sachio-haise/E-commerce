<template>
    <footer class="pt-4 px-3 mt-5 bg-light">
        <div class="container">
            <div class="row py-5">
                <div class="col-5">
                    <h5 class="mb-3">
                        Contact Us
                    </h5>
                    <h3 class="text-warning">1800 97 97 69</h3>
                    <p class="text-black-50 mb-4">
                        502 New Design Str, Melbourne, Australia <br>
                        contact@martfury.co
                    </p>
                    <div class="social-icons d-flex">
                        <i class="me-3 fa-brands fa-facebook-f"></i>
                        <i class="me-3 fa-brands fa-twitter"></i>
                        <i class="me-3 fa-brands fa-google-plus-g"></i>
                        <i class="me-3 fa-brands fa-instagram"></i>
                    </div>
                </div>
                <div class="col-7">
                    <div class="row">
                        <div class="col-4">
                            <h5 class="mb-3">
                                Categories
                            </h5>
                            <a href="" class="text-decoration-none" v-for="category in this.$store.state.categories" :key="category.id">
                                <p class="text-black-50 mb-0" v-text="category.name"></p>
                            </a>
                        </div>
                        <div class="col-4">
                            <h5 class="mb-3">
                                Company
                            </h5>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    About Us
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Affilate
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Career
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Contact
                                </p>
                            </a>
                        </div>
                        <div class="col-4">
                            <h5 class="mb-3">
                                Quick Links
                            </h5>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Policy
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Term & Condition
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Shipping
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    Return
                                </p>
                            </a>
                            <a href="" class="text-decoration-none">
                                <p class="text-black-50 mb-0">
                                    FAQs
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-top pt-3 px-4">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <p class="">&copy; 2022</p>
                    <p class="">created by <b>Wai Phyo Aung</b></p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: "Footer"
}
</script>
