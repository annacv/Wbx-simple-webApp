<template>
  <header role="banner" class="header">
    <div class="header__claim heading">
      {{ claim }}
    </div>
    <div class="header__image"/>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    claim: {
      type: String,
      default: 'Knowledge Frontend Test'
    }
  },

  setup (props) {
    return { props }
  }
}
</script>