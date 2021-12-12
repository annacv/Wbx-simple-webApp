<style lang="scss" scoped>
  @import '@/assets/scss/productDetail.scss';
</style>

<template>
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