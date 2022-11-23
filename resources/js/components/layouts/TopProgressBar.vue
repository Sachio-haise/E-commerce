<template>
    <vue-progress-bar></vue-progress-bar>
</template>

<script>

export default {
    name: 'Top-progress-bar',
  mounted () {
    this.$Progress.start();

    // Use setTimeout for demo
    // setTimeout(() => {
    //   this.$refs.topProgress.done()
    // }, 2000)
  },

}
</script>