<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="scss">
  html,
  body {
    margin: 0;
    height: 100%;
    font-family: Roboto, sans-serif;
    text-rendering: optimizeLegibility;
    background-color: #ededed;
  }

  #app {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    height: 100vh;
  }
</style>