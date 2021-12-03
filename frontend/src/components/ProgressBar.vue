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
      type: Number,
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
    const percentage = computed(() => (props.reached * 100)%props.end)
    return { props, percentage }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  &__bar {
    position: relative;
    display: block;
    margin: 0.5rem 0;
    height: 0.625rem;
    overflow: hidden;
    border-radius: 0.375rem;
    background: #eee;
  }

  &__inner {
    position: absolute;
    height: 0.625rem;
    border-radius: 0.375rem;
    background: #000;
  }

  &__info,
  &__legend {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #8e98a7;
    line-height: 0.875rem;
    font-size: 0.875rem;
  }

  &__reached {
    color: #000;
  }

}
</style>