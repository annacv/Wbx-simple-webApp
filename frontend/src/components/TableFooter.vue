<template>
  <div class="data-table__footer">
    <div class="data-table__item">
      Total {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFooter',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
    return { props }
  }
}
</script>

