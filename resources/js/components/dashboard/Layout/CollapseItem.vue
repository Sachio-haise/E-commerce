<template>
    <li>
        <router-link :to="{name : link}" class="text-light text-nowrap">
            <i :class="icon+' me-3'"></i>
            {{ text }}
        </router-link>
    </li>
</template>
<script>
export default {
    name : "Collapse-item",
    props : ['link','text','icon']
}
</script>
