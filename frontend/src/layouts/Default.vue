<style lang="scss">
  @import '@/assets/scss/layout.scss';
</style>

<template>
  <TheHeader />
    <main class="wrapper">
      <slot/>
    </main>
  <TheFooter />
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'Default',
  components: { TheHeader, TheFooter }
}
</script>