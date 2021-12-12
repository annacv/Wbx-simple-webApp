<template>
  <div class="data-table">
    <tabs v-model="active">
      <tab title="ALL">
        <table-header/>
        <table-body
          :chargers="allChargers"
          @view="view"
          @remove="remove"
        />
        <table-footer :count="count"/>
      </tab>

      <tab title="READY">
        <table-header/>
        <table-body
          :chargers="readyChargers"
          @view="view"
          @remove="remove"
        />
        <table-footer :count="readyChargers.length" />
      </tab>
      <tab title="CHARGING">
        <table-header/>
        <table-body
          :chargers="chargingChargers"
          @view="view"
          @remove="remove"
        />
        <table-footer :count="chargingChargers.length" />
      </tab>
      <tab title="ERROR">
        <table-header/>
        <table-body
          :chargers="errorChargers"
          @view="view"
          @remove="remove"
        />
        <table-footer :count="errorChargers.length" />
      </tab>
    </tabs>
    <template v-if="sessionLoaded">
        <modal
          title="Current Session"
          @close="close"
        >
          <product-detail
            :chargerSession="chargerSession"
            :progress="progress"
          />
        </modal>
    </template>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import ProductDetail from '@/components/ProductDetail'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import TableHeader from '@/components/TableHeader'
import TableBody from '@/components/TableBody'
import TableFooter from '@/components/TableFooter'

import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  name: "DataTable",
  components: { Modal, ProductDetail, Tab, Tabs, TableHeader, TableBody, TableFooter },

  setup() {
    onMounted(() => {
      store.dispatch('loadChargers');
    })
    
    const store = useStore()
    const active = ref(0)
    const percentage = ref()

    const allChargers = computed(() => store.getters.allChargers)
    const count = computed(() => store.getters.chargersCount)
    let chargerSession = computed(() => store.getters.charger)
    const sessionLoaded = computed(() => store.getters.session)

    const readyChargers = computed(() =>
      allChargers.value.filter(charger => {
        return charger.status === 11 || charger.status === 10
      })
    )

    const chargingChargers = computed(() =>
      allChargers.value.filter(charger => {
        return charger.status === 20
      })
    )

    const errorChargers = computed(() =>
      allChargers.value.filter(charger => {
          return charger.status === 50 || charger.status === 51 || 
            charger.status === 52 || charger.status === 53 || 
            charger.status === 45 || charger.status === 55
        })
    )

    const progress = computed (() => [
      {
        end: 85,
        start: '0 kWh',
        reached: chargerSession.value.energySupplied,
        percentage: percentage.value,
        units: 'kWh',
        reachedLegend: 'Energy Supplied',
        total: '85 kWh',
        totalLegend: 'Max Capacity'
      },
      {
        end: 32,
        start: '0 A',
        reached: chargerSession.value.currentCharging,
        percentage: percentage.value,
        units: 'A',
        reachedLegend: 'Charging Current',
        total: '32 A',
        totalLegend: 'Max Charging'
      }
    ])

    function view (charger) {
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
      allChargers,
      readyChargers,
      chargingChargers,
      errorChargers,
      view,
      remove,
      chargerSession,
      sessionLoaded,
      close,
      percentage,
      progress
    }
  }
};
</script>

<style lang="scss">
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

      &:nth-child(even) {
        background-color: #fff;
      }

      &:nth-child(odd) {
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
        width: 8%;
      }

      &:nth-child(7) {
        width: 18%;
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

      &.connectivity {
        text-transform: capitalize;
      }

      &.actions {
        .btn-container {
          width: 100%;
        }
      }
    }

    &__image-container {
      display: flex;
      justify-content: center;
      margin-left: -4.875rem;
      width: 4.8rem;
    }
  }
</style>

