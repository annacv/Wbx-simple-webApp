<style lang="scss" scoped>
  @import '@/assets/scss/img.scss';
</style>

<template>
  <img
    :alt="`Image of ${image}`"
    :class="`image--${image}`" 
    :src="require(`../assets/images/${image}.${format}`)"
  />
</template>

<script>
export default {
  name: 'Image',
  props: {
    image: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: ''
    }
  },
  setup(props) {    
    return { props }
  }
}
</script>