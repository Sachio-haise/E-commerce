<template>
    <div class="wrapper">
        <!-- Navbar -->
        <Header></Header>
        <!-- Navbar -->
        <!-- sidebar-->
        <div class="bg-primary sidebar" id="sidebar">
            <Sidebar></Sidebar>
        </div>
        <!-- sidebar-->
        <!--        content-->
        <div class="content" style="min-height: 960px">
            <slot></slot>
        </div>
        <!--        content-->
    </div>
</template>
<script>
import Header from "./Header";
import Sidebar from "./Sidebar";
export default {
    components: {Sidebar, Header}
}
</script>

