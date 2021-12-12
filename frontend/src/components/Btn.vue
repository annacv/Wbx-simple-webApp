<template>
  <template v-if="text">
    <button
      :class="`btn btn--${action}`"
      role="button"
      @click="onClick"
    >
      {{text}}
    </button>
  </template>
  <template v-if="image">
    <div
      role="button"
      :class="`btn btn--${action}`"
      @click="onClick"
    >
      <Img
        :aria-label="ariaLabel"
        :image="image"
        format="svg"
      />
    </div>
  </template>
</template>

<script>
import Img from '@/components/Img'

export default {
  name: 'Btn',
  components: { Img },
  props: {
    ariaLabel: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'info'
    },
    image: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
  },
  emits: ["onClick"],

  setup(props, { emit }) {
    function onClick() {
      emit('onClick');
    }

    return {
      props,
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &--close,
    &--info,
    &--remove {
      &:hover {
        opacity: 0.8;
      }
    }
    
    &--close {
      width: 0.875rem;
      height: 0.875rem;
    }

    &--info {
      float: left;
      color: #5599ff;
    }

    &--remove {
      float: right;
      color: #ff6363;
    }
  }

</style>
