<template>
    <div class="comment mb-3" :class="comment.parent_id !== null ? 'ms-5' : ''">
        <div class="comment-header d-flex">
            <img
                class="comment-profile me-4 mt-4"
                :src="comment.user.profile"
                alt=""
            />
            <div class="comment-text">
                <div class="row">
                    <div class="d-flex mt-3">
                        <p
                            class="text fw-bold me-2 fs-5"
                            style="color: #e73862"
                        >
                            {{ comment.user.name }} &nbsp;
                        </p>
                        <p class="text mt-1">{{ comment.date }}</p>
                    </div>
                    <p class="text mt-1">
                        {{ comment.body }}
                    </p>
                    <div>
                        <button
                            @click="
                                this.$store.state.EmailVerification
                                    ? this.$store.dispatch('likeComment', {
                                          comment,
                                      })
                                    : $router.push('/login')
                            "
                            class="btn btn-light"
                        >
                            <i
                                class="fa fa-heart"
                                :style="
                                    comment.likecount
                                        ? 
                                        this.$store.state.auth
                                        ?
                                        comment.likecount.user_id ===
                                          this.$store.state.auth.user.id
                                            ? 'color:#E73862'
                                            : 'color:black'
                                        :
                                        ''
                                        : ''
                                "
                            ></i>

                            &nbsp;
                            <span class="text">
                                <span>{{
                                    comment.likecount
                                        ? comment.likecount.like_count
                                        : 0
                                }}</span>
                            </span>
                        </button>
                        &nbsp;
                        <button
                            @click="
                                this.$store.state.EmailVerification
                                    ? commentAction('reply')
                                    : $router.push('/login')
                            "
                            class="reply text fw-bold"
                        >
                            Reply
                        </button>
                        <button
                            v-show="
                                this.$store.state.auth
                                    ? comment.user_id ==
                                      this.$store.state.auth.user.id
                                    : false
                            "
                            class="reply text fw-bold"
                            @click="
                                this.$store.state.EmailVerification
                                    ? commentAction('edit')
                                    : $router.push('/login')
                            "
                        >
                            Edit
                        </button>
                        <button
                            v-if="
                                this.$store.state.auth
                                    ?
                                     this.$store.state.auth.role == 'admin' ?
                                     true : comment.user_id ==
                                      this.$store.state.auth.user.id 
                                      :
                                      false 
                                      
                                    
                            "
                            class="reply text text-dark fw-bold"
                            @click="
                                this.$store.state.EmailVerification
                                    ? this.$store.dispatch('deleteComment', {
                                          comment,
                                      })
                                    : $router.push('/login')
                            "
                        >
                            Delete
                        </button>
                    </div>

                    <div class="d-flex my-4" v-if="takeActions">
                        <img
                            class="profile me-2"
                            :src="
                            this.$store.state.auth
                            ? this.$store.state.auth.user.profile
                                : '/images/default.png'
                            "
                            alt=""
                        />
                        <form
                            class="comment-form mt-2"
                            @submit.prevent="
                                isEdit
                                    ? this.$store
                                          .dispatch('editComment', {
                                              body,
                                              product,
                                              comment,
                                          })
                                          .then(
                                              (_) => (
                                                  (body = ''),
                                                  (takeActions = false)
                                              )
                                          )
                                    : isReply
                                    ? this.$store
                                          .dispatch('addComment', {
                                              body,
                                              product,
                                              comment,
                                          })
                                          .then(
                                              (_) => (
                                                  (body = ''),
                                                  (takeActions = false)
                                              )
                                          )
                                    : ''
                            "
                        >
                            <div class="input-group">
                                <input
                                    type="text"
                                    v-model="body"
                                    class="form-control input-form"
                                    style="border-right: none"
                                    placeholder="Add Comment"
                                />
                                <button
                                    type="submit"
                                    class="input-group-text"
                                    style="
                                        background-color: white;
                                        border-left: none;
                                    "
                                >
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Comments
            v-for="reply in comment.replies"
            :key="reply.id"
            :comment="reply"
            :product="product"
        />
    </div>
</template>
<script>
export default {
    props: ["comment", "product"],
    name: "Comments",
    data() {
        return {
            takeActions: false,
            body: "",
            isReply: false,
            isEdit: false,
            count: "",
        };
    },
    methods: {
        commentAction(action) {
            this.takeActions = !this.takeActions;
            if (action == "reply") {
                this.isReply = true;
            } else if (action == "edit") {
                this.isEdit = true;
            }
        },
    },
};
</script>

<style scoped>
.comment-form {
    min-width: 350px;
    width: 90%;
}
.profile {
    width: 50px;
    border-radius: 50%;
}

.comment {
    width: 95%;
}

.comment-profile {
    width: 50px;
    border-radius: 50%;
    height: 50px;
}
.input-group-text {
    color: #e73862;
    font-size: 1.3rem;
}
.input-form:focus {
    border: 0.5px solid #ced4da;
}
.reply {
    border: none;
    background-color: white;
    color: #e73862;
}
</style>
