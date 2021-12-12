<style lang="scss" scoped>
  @import '@/assets/scss/modal.scss';
</style>

<template>
  <div
    class="modal__backdrop"
    @click="close"
  />
  <div class="modal">
    <div class="modal__header">
      <div class="modal__title">
        {{ title }}
      </div>
      <Btn
        action="close"
        aria-label="Click to close the modal"
        image="cross"
        @onClick="close"
      >
      </Btn>
    </div>
    <div class="modal__content">
      <slot/>
    </div>
  </div>

</template>

<script>
import Btn from '@/components/Btn'

export default {
  name: 'Modal',
  components: { Btn },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],

  setup(props, { emit }) {
    function close () {
      emit('close');
    }
    return { props, close }
  }
}
</script>