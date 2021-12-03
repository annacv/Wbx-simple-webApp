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
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const active = computed(() => props.modelValue);
    const tabs = ref([]);

    function selectTab(tab) {
      emit("update:modelValue", tab);
    }

    provide("tabsState", {
      active,
      tabs,
    });

    return {
      tabs,
      active,
      selectTab,
    };
  },
};
</script>

<style lang="scss">
.tabs {
  display: flex;
}

.tab {
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.5rem;

  &--active {
    border-bottom: 0.1875rem solid;
    color: #000;
  }

  &--inactive {
    border-bottom: none;
    color: #8e98a7;
  } 
}

</style>