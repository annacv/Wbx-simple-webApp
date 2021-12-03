<template>
  <div class="data-table">
    <tabs v-model="active">
      <tab title="ALL">
        <table-header/>
        <div class="data-table__body">
          <div
            v-for="(charger, index) in allChargers"
            :key="index"
            :class="`data-table__row ${checkIndex(index)}`"
          >
            <div class="data-table__item">
              <div class="data-table__image-container">
                <img
                  :alt="`Image of ${charger.type.toLowerCase()} charger`"
                  :class="`data-table__image--${charger.type.toLowerCase()}`" 
                  :src="require(`../../assets/${charger.type.toLowerCase()}.png`)"
                />
              </div>
              <div :class="`${charger.type.toLowerCase()}`">
                <span>{{ charger.type }}</span>
                <span>{{ charger.serialNumber }}</span>
              </div>
            </div>
            <div class="data-table__item">
              <img
                :alt="`${charger.connectivityType} icon`"
                :class="`data-table__image--${charger.connectivityType}`" 
                :src="require(`../../assets/${charger.connectivityType}.svg`)"
              />
              {{ charger.connectivityType }}
            </div>
            <div class="data-table__item">
              <Chip
                :text="checkStatus(charger.status).toUpperCase()"
                :type="checkStatus(charger.status)"
              />
            </div>
            <div class="data-table__item">
              {{ new Date(charger.chargingTime).getTime() }}
            </div>
            <div class="data-table__item">
              <span>{{ charger.energySupplied }}</span>
              <span v-if="charger.energySupplied">kWh</span>
            </div>
            <div class="data-table__item">
              {{ charger.chargingCurrent }}
            </div>
            <div class="data-table__item">
              {{ new Date(charger.manufacturedDate).toDateString() }}
            </div>
            <div class="data-table__item actions">
              <Btn
                v-if="checkStatus(charger.status) === 'charging'"
                action="info"
                text="View Session"
                @onClick="info(charger)"
              />
              <Btn
                action="remove"
                text="Delete"
                @onClick="remove(charger.id)"
              />
            </div>
          </div>
        </div>
        <div class="data-table__footer">
          <div class="data-table__item">
            Total {{ count }}
          </div>
        </div>
      </tab>

      <tab title="READY">
        <table-header/>
      </tab>
      <tab title="CHARGING">
        <table-header/>
      </tab>
      <tab title="ERROR">
        <table-header/>
      </tab>
    </tabs>
    <template v-if="sessionLoaded">
      <div
        class="modal__backdrop"
        @click="close"
      />
        <div
          v-if="sessionLoaded"
          class="modal"
        >
          <div class="modal__header">
            <div class="modal__title">
              Current Session
            </div>
            <Btn
              action="close"
              alt="Click to close the modal"
              :src="require(`../../assets/cross.svg`)"
              @onClick="close"
            >
            </Btn>
          </div>
          <div class="modal__content">
            <div class="modal__row">
              <div class="charger__device">
                <img
                  :alt="`Image of ${chargerSession.type.toLowerCase()} charger`"
                  class="charger__image" 
                  :src="require(`../../assets/${chargerSession.type.toLowerCase()}.png`)"
                />
                <div class="charger__info">
                  <span class="charger__type">{{ chargerSession.type }}</span>
                  <span class="charger__uuid">{{ chargerSession.serialNumber }}</span>
                  <span class="charger__time">{{ chargerSession.chargingCurrent }}</span>
                </div>
              </div>
              <Chip
                :text="checkStatus(chargerSession.status).toUpperCase()"
                :type="checkStatus(chargerSession.status)"
              />
              <div class="charger__connectivity">
                <img
                  :alt="`${chargerSession.connectivityType} icon`"
                  :class="`data-table__image--${chargerSession.connectivityType}`" 
                  :src="require(`../../assets/${chargerSession.connectivityType}.svg`)"
                />
                <span>{{chargerSession.wifiSignal}}%</span>
              </div>
            </div>
            <div class="modal__row">
              <ProgressBar
                :end="85"
                start="0 kWh"
                :reached="chargerSession.energySupplied"
                :percentage="percentage"
                units="kWh"
                reachedLegend="Energy Supplied"
                total="85 kWh"
                totalLegend="Max Capacity"
              />
            </div>
            <div class="modal__row">
              <ProgressBar
                :end="32"
                start="0 A"
                :reached="chargerSession.currentCharging"
                :percentage="percentage"
                units="A"
                reachedLegend="Charging Current"
                total="32 A"
                totalLegend="Max Charging"
              />
            </div>
          </div>
        </div>
    </template>
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import Chip from '@/components/Chip'
import ProgressBar from '@/components/ProgressBar'
import Tab from '@/components/ProductList/Tab'
import Tabs from '@/components/ProductList/Tabs'
import TableHeader from '@/components/ProductList/TableHeader'

import { useStore } from "vuex";
import { ref, computed } from "vue";

export default {
  name: "DataTable",
  components: { Btn, Chip, ProgressBar, Tab, Tabs, TableHeader },

  setup() {
    const active = ref(0)
    const percentage = ref()
    const store = useStore()

    const loadChargers = computed(() => store.dispatch('loadChargers'))
    const allChargers = computed(() => store.getters.allChargers)
    const count = computed(() => store.getters.chargersCount)
    let chargerSession = computed(() => store.state.charger)
    const sessionLoaded = computed(() => store.state.sessionLoaded)

    function checkStatus(value) {
      let chargerStatus
      if (value === 20) {
        chargerStatus = 'charging'
      } else if (value === 10 || value === 11) {
        chargerStatus = 'ready'
      } else {
        chargerStatus = 'error'
      }
      return chargerStatus 
    }

    function checkIndex(value) {
      return value%2 === 1 ? 'even' : 'odd'
    }

    function info (charger) {
      store.dispatch('loadSession', charger)
    }

    function remove (id) {
      store.dispatch('deleteCharger', id)
      store.dispatch('loadChargers')
    }

    function close () {
      store.commit('closeSession');
    }

    return { 
      active,
      count,
      loadChargers,
      allChargers,
      checkStatus,
      checkIndex,
      info,
      remove,
      chargerSession,
      sessionLoaded,
      close,
      percentage
    }
  }
};
</script>

<style lang="scss">
  .modal {
    position: absolute;
    top: 16%;
    left: calc(45% - (10rem));
    z-index: 10000;
    border-radius: 0.75rem;
    background-color: #fff;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(80, 80, 80, 0.5);
    width: 32.75rem;
    height: 27.375rem;
    box-sizing: border-box;

    &__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.68);
      width: 100%;
      height: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
    }

    &__title {
      font-size: 1.125rem;
      line-height: 1.5rem;
    }

    &__content {
      padding: 0.5rem 1.5rem 0 1.5rem;
    }

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
      &__uuid,
      &__connectivity {
        line-height: 0.875rem;
        font-size: 0.875rem;
      }

      &__uuid {
        line-height: 0.75rem;
        font-size: 0.75rem;
      }

      &__connectivity {
        display: flex;
        align-content: center;
      }
    }
  }

  .data-table {
    display: flex;
    flex-flow: row wrap;
    margin: 4rem 0;
    background-color: #fff;
    border: 0.0625rem solid #eee;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(166, 166, 166, 0.5);
    width: 100%;

    &__header,
    &__row {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &__header {
      padding: 0.875rem 4.875rem;
      border-top: 0.0625rem solid #ededed;
      border-bottom: 0.0625rem solid #ededed;
    }

    &__body {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      max-height: 12.5rem;
      overflow: scroll;
    }

    &__row {
      padding: 0.75rem 4.875rem;

      &.even {
        background-color: #fff;
      }

      &.odd {
        background-color: #fbfbfb;
      }
    }
    
    &__footer {
      padding: 0.875rem 1rem;
      border-top: 0.0625rem solid #ededed;
      line-height: 1.5rem;
      width: 100%;
    }

    &__item {
      display: flex;
      flex-flow: row nowrap;
      color: #8e98a7;
      line-height: 1rem;
      font-size: 0.875rem;
      text-transform: capitalize;

      &:nth-child(1) {
        width: 14%;
      }

      &:nth-child(2),
      &:nth-child(3) {
        width: 12%;
      }

      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        width: 9%;
      }

      &:nth-child(7) {
        width: 17%;
      }

      &:nth-child(8) {
        width: 20%;
      }

      .pulsar,
      .commander,
      .copper {
        display: flex;
        flex-flow: column nowrap;
      }

      &.actions {
        justify-content: flex-end;
      }
    }

    &__image-container {
      display: flex;
      justify-content: center;
      margin-left: -4.875rem;
      width: 4.8rem;
    }

    &__image {
      &--pulsar {
        width: auto;
        height: 1.875rem;
      }

      &--commander {
        width: auto;
        height: 2.125rem;
      }

      &--copper {
        width: auto;
        height: 2.25rem;
      }

      &--wifi,
      &--ethernet {
        width: auto;
        height: 1rem;
      }

      &--wifi {
        margin-right: 0.25rem;
      }

      &--ethernet {
        margin-right: 0.5rem;
      }
    }
  }
</style>

