<template>
  <div class="data-table__header">
    <div
      v-for="(item, index) in tableHeaders" 
      :key="index"
      class="data-table__item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    tableHeaders: {
      type: Array,
      default: () => [
        'Device',
        'Connectivity',
        'Status',
        'Charging Time',
        'Energy Supplied',
        'Charging Current',
        'Manufactured Date',
        'Actions'
      ]
    }
  }
}
</script>