<template>
  <div>
    <div class="product__row">
      <div class="charger__device">
        <Img
          :image="chargerSession.type.toLowerCase()"
          class="charger__image"
          format="png"
        />
        <div class="charger__info">
          <span class="charger__type">{{ chargerSession.type }}</span>
          <span class="charger__uuid">{{ chargerSession.serialNumber }}</span>
          <span class="charger__time">Time {{ getTime(chargerSession.chargingTime) }}</span>
        </div>
      </div>
      <Chip :type="checkStatus(chargerSession.status)" />
      <div class="charger__connectivity">
        <Img
          :image="chargerSession.connectivityType"
          format="svg"
        />
        <span>{{ chargerSession.wifiSignal }}%</span>
      </div>
    </div>
    <div
      v-for="(item, index) in progress"
      :key="index"
      class="product__row"
    >
      <ProgressBar
        :end="item.end"
        :start="item.start"
        :reached="item.reached"
        :percentage="item.percentage"
        :units="item.units"
        :reachedLegend="item.reachedLegend"
        :total="item.total"
        :totalLegend="item.totalLegend"
      />
    </div>
  </div>
</template>

<script>
import Chip from '@/components/Chip'
import Img from '@/components/Img'
import ProgressBar from '@/components/ProgressBar'

import { checkStatus, getTime } from '@/helpers/formatData'

export default {
  name: 'ProductDetail',
  components: { Chip, Img, ProgressBar },
  props: {
    chargerSession: {
      type: Object,
      default: () => {}
    },
    progress: {
      type: Array,
      default: () => []
    }
  },

  setup(props) {    
    return {
      props,
      checkStatus,
      getTime
    }
  }
}
</script>

<style lang="scss" scoped>
  .product {
    &__row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;

      &:first-child {
        margin-bottom: 5rem;
      }
    }
  }
  .charger {
    &__device {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
    }

    &__image {
      width: auto;
      height: 3.75rem;
      margin-right: 0.375rem
    }

    &__info {
      display: flex;
      flex-flow: column nowrap;
    }

    &__type,
    &__uuid,
    &__connectivity {
      color: #8E98a7;
    }

    &__type,
    &__connectivity,
    &__time {
      line-height: 0.875rem;
      font-size: 0.875rem;
    }

    &__uuid {
      padding: 0.25rem 0;
      line-height: 0.75rem;
      font-size: 0.75rem;
    }

    &__connectivity {
      display: flex;
      align-content: center;
    }
  }
  
</style>