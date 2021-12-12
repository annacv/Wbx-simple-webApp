<template>
  <div class="data-table__body">
    <div
      v-for="(charger, index) in chargers"
      :key="index"
      class="data-table__row"
    >
      <div class="data-table__item">
        <div class="data-table__image-container">
          <Img
            :image="charger.type.toLowerCase()"
            format="png"
          />
        </div>
        <div :class="charger.type.toLowerCase()">
          <span>{{ charger.type }}</span>
          <span>{{ charger.serialNumber }}</span>
        </div>
      </div>
      <div class="data-table__item connectivity">
        <Img
          :image="charger.connectivityType"
          format="svg"
        />
        {{ charger.connectivityType }}
      </div>
      <div class="data-table__item">
        <Chip :type="checkStatus(charger.status)" />
      </div>
      <div class="data-table__item">
        {{ getTime(charger.chargingTime) }}
      </div>
      <div class="data-table__item">
        <span v-if="charger.energySupplied">{{ charger.energySupplied }} kWh</span>
      </div>
      <div class="data-table__item">
        {{ charger.chargingCurrent }}
      </div>
      <div class="data-table__item">
        {{ formatDate(charger.manufacturedDate) }}
      </div>
      <div class="data-table__item actions">
        <div class="btn-container">
          <Btn
            v-if="checkStatus(charger.status) === 'charging'"
            action="info"
            text="View Session"
            @onClick="view(charger)"
          />
          <Btn
            action="remove"
            text="Delete"
            @onClick="remove(charger.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import Chip from '@/components/Chip'
import Img from '@/components/Img'

import { checkStatus, formatDate, getTime } from '@/helpers/formatData'

export default {
  name: 'DataBody',
  components: { Btn, Chip, Img },
  props: {
    chargers: {
      type: Array,
      default: () => []
    }
  },
  emits: ['view', 'remove'],

  setup(props, { emit }) {
    function view (value) {
      emit('view', value)
    }

    function remove (value) {
      emit('remove', value)
    }

    return {
      props,
      checkStatus,
      formatDate,
      getTime,
      view,
      remove
    }
  }
}
</script>
