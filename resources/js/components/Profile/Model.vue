<template>
    <div>
        <div
            class="modal fade"
            :id="id"
            tabindex="-1"
            aria-labelledby="confirmActionLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5
                            class="modal-title"
                            id="confirmActionLabel"
                            v-text="title"
                        />
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body" v-html="description" />
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            data-bs-dismiss="modal"
                            type="button"
                            class="btn btn-primary"
                            style="color: white"
                            @click.prevent="this.$emit('confirm')"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["title", "description", "id"],
};
</script>
