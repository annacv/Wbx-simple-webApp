<style lang="scss" scoped>
  @import '@/assets/scss/progressBar.scss';
</style>

<template>
  <div class="progress">
    <div class="progress__info">
      <div>{{ start }}</div>
      <div class="progress__reached">{{ reached }}<span>{{ units }}</span></div>
      <div>{{ total }}</div>
    </div>
    <div class="progress__bar">
      <div
        class="progress__inner"
        :end="end"
        :reached="reached"
        :style="`width:${percentage}%`"
      />
    </div>
    <div class="progress__legend"> 
      <div>{{ reachedLegend }}</div>
      <div>{{ totalLegend }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ProgressBar",
  props: {
    end: {
      type: [Number],
      default: 100
    },
    reached: {
      type: Number,
      default: 0
    },
    reachedLegend: {
      type: String,
      default: ''
    },
    start: {
      type: String,
      default: ''
    },
    total: {
      type: String,
      default: ''
    },
    totalLegend: {
      type: String,
      default: ''
    },
    units: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const percentage = computed(() => (props.reached * 100)/props.end)

    return {
      props,
      percentage
    }
  }
}
</script>