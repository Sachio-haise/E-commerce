<template>
    <nav class="nav-menu">
        <ul class="m-0 p-0 list-unstyled" id="accordionExample" v-if="role === 'admin'">
            <menu-spacer></menu-spacer>
            <menu-title title="MAIN"></menu-title>
            <menu-item link="dashboard" icon="fa fa-home" title="Dashboard"></menu-item>
            <menu-title title="PRODUCT MANAGER"></menu-title>
            <collapse-menu icon="fa fa-shirt" collapse="product" title="Product">
                <collapse-item link="products.list" text="Product List" icon="fa fa-list"></collapse-item>
                <collapse-item link="products.create" text="Create Product" icon="fa fa-plus-circle"></collapse-item>
            </collapse-menu>
            <menu-title title="CATEGORY MANAGER"></menu-title>
            <collapse-menu icon="fa fa-layer-group" collapse="category" title="Category">
                <collapse-item link="categories.list" text="Category List" icon="fa fa-list"></collapse-item>
                <collapse-item link="category.create" text="Create Category" icon="fa fa-plus-circle"></collapse-item>
            </collapse-menu>
            <menu-title title="USER MANAGER"></menu-title>
            <collapse-menu icon="fa fa-user" collapse="user" title="User">
                <collapse-item link="user.profile" text="Profile" icon="fa fa-user"></collapse-item>
                <collapse-item link="users.list" text="User List" icon="fa fa-list"></collapse-item>
            </collapse-menu>
        </ul>
        <ul class="m-0 p-0 list-unstyled" id="accordionExample" v-else>
            <menu-spacer></menu-spacer>
            <menu-item link="user.profile" icon="fa fa-user" title="Profile"></menu-item>
        </ul>
    </nav>
</template>
<script>
import MenuSpacer from "./MenuSpacer";
import MenuTitle from "./MenuTitle";
import MenuItem from "./MenuItem";
import CollapseItem from "./CollapseItem";
import CollapseMenu from "./CollapseMenu";
export default {
    components: {CollapseMenu, CollapseItem, MenuItem, MenuTitle, MenuSpacer },
    computed: {
        role(){
            return this.$store.state.auth.role;
        }
    }
};
</script>
