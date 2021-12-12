<template>
  <div>
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
          alt="Click to close the modal"
          image="cross"
          @onClick="close"
        >
        </Btn>
      </div>
      <div class="modal__content">
        <slot/>
      </div>
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

<style lang="scss" scoped>
  .modal {
    position: absolute;
    top: 16%;
    left: calc(45% - (10rem));
    z-index: 10000;
    border-radius: 0.75rem;
    background-color: #fff;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(80, 80, 80, 0.5);
    width: 32.75rem;
    height: 27.375rem;
    box-sizing: border-box;

    &__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.68);
      width: 100%;
      height: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
    }

    &__title {
      font-size: 1.125rem;
      line-height: 1.5rem;
    }

    &__content {
      padding: 0.5rem 1.5rem 0 1.5rem;
    }
  }
</style>