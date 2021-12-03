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
  <template v-if="src">
    <div
      role="button"
      :class="`btn btn--${action}`"
      @click="onClick"
    >
      <img
        :alt="alt"
        :src="src"
      />
    </div>
  </template>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    alt: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'info'
    },
    src: {
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

    return { props, onClick }
  }
}
</script>


<style lang="scss" scoped>
  .btn {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &--close,
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
      color: #5599ff;
      margin-right: 2.875rem;
    }

    &--remove {
      color: #ff6363;
    }
  }

</style>
