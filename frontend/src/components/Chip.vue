<style lang="scss" scoped>
  @import '@/assets/scss/chip.scss';
</style>

<template>
  <div :class="`chip__status--${type}`">
    {{ type }}
  </div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return { props }
  }
}
</script>