<template>
    <li class="menu-title d-flex">
        <span class="text-nowrap">
            {{ title }}
        </span>
        <i class="fas fa-ellipsis d-none"></i>
    </li>
</template>
<script>
export default {
    name: "Menu-title",
    props : ["title"]
}
</script>

