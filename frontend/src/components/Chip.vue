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

<style lang="scss" scoped>
.chip {
  &__status {
    &--charging,
    &--ready,
    &--error {
      padding: 0.375rem 0;
      border-radius: 0.75rem;
      width: 4.25rem;
      line-height: 0.75rem;
      font-size: 0.625rem;
      text-align: center;
      text-transform: uppercase;
    }

    &--charging {
      color: #2f46ff;
      background: #d6dbff; 
    }

    &--ready {
      color: #52b89e;
      background: #d7fff5; 
    }

    &--error {
      color: #FF5050;
      background: #ffe7e6;
    }
  }
}
</style>