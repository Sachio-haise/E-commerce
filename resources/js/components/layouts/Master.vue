<template>
    <div>
        <HeaderTop></HeaderTop>
        <HeaderBottom></HeaderBottom>
        <slot></slot>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from "./Footer";
import HeaderTop from "./Header-top";
import HeaderBottom from "./Header-bottom";   
export default {
    components: {HeaderBottom, HeaderTop, Footer},
}
</script>
