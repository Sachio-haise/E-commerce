<template>
    <li class="menu-item">
        <router-link class="menu-item-link" :to="{name : link}">
            <div class="text-white inner-item d-flex align-items-center">
                <i :class="icon+' me-3'"></i>
                <span class="menu-item-title text-nowrap">{{ title }}</span>
            </div>
        </router-link>
    </li>
</template>
<script>
export default {
    name: "Menu-item",
    props : ["title","icon","link"]
}
</script>

