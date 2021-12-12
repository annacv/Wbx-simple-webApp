<style lang="scss" scoped>
  @import '@/assets/scss/tabs.scss';
</style>

<template>
  <div class="tabs">
    <div
      v-for="(tab, i) of tabs"
      :key="i"
      :class="active === i ? 'tab tab--active' : 'tab tab--inactive'"
      @click="selectTab(i)"
    >
        {{ tab.props.title }}
    </div>
  </div>
  <slot />
</template>

<script>
import { provide, computed, ref } from "vue";

export default {
  name: "Tabs",
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const active = computed(() => props.modelValue)
    const tabs = ref([])

    function selectTab(tab) {
      emit("update:modelValue", tab)
    }

    provide("tabsState", {
      active,
      tabs,
    })

    return {
      tabs,
      active,
      selectTab,
    }
  },
}
</script>