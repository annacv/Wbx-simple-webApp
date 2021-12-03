<template>
  <TheHeader />
    <main class="wrapper">
      <slot/>
    </main>
  <TheFooter credits="Anna Condal" />
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'

export default {
  name: 'Default',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
.header,
.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #000;
}

.header {
  align-self: flex-start;
  padding: 1.25rem 5rem 1rem 5rem;
}

.footer {
  align-self: flex-end;
  padding: 0.75rem 5rem;
}

.heading {
  line-height: 1.75rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #fff;
}

.header {
  &__claim {
    align-self: center;
  }

  &__image {
    padding: 0.5rem 5rem;
    background-image: url('~@/assets/wallbox-logo.svg');
    background-position: 94% 50%;
    background-repeat: no-repeat;
    background-size: 132px 32px;
  }
}

.footer {
  &__credits {
    display: flex;
    align-items: center;
  }

  &__links {
    display: flex;
    margin-left: 1.25rem;
    text-decoration: none;

    &:hover {
      opacity: 0.9;
    }
  }
}

.wrapper {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 5rem;
  width: 100%;
  height: calc(100% - (4rem + 3.25rem));
}
</style>