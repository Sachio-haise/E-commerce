<template>
    <li class="menu-item">
        <a class="menu-item-link"
           data-bs-toggle="collapse" :href="'#'+collapse" role="button" aria-expanded="false"
           :aria-controls="collapse">
            <div class="text-white inner-item d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <i :class="icon+' me-3'"></i>
                    <span class="menu-item-title text-nowrap">{{ title }}</span>
                </div>
                <i class="fas fa-chevron-down text-white" id="dropdown"></i>
            </div>
        </a>
        <div class="collapse collapse-item" :id="collapse">
            <ul class="child-menu">
                <slot></slot>
            </ul>
        </div>
    </li>
</template>
<script>
export default {
    name: "Collapse-menu",
    props : ["title","icon","collapse"]
}
</script>

