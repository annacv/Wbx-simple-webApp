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

<style lang="scss" scoped>
  .image {
    &--pulsar {
      width: auto;
      height: 1.875rem;
    }

    &--commander {
      width: auto;
      height: 2rem;
    }

    &--copper {
      width: auto;
      height: 2rem;
    }

    &--wifi,
    &--ethernet {
      width: auto;
      height: 1rem;
    }

    &--wifi {
      margin-right: 0.25rem;
    }

    &--ethernet {
      margin-right: 0.5rem;
    }
  }
  
</style>