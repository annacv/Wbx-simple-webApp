<template>
  <footer class="footer">
    <div class="footer__credits heading">
      {{ credits }}
    </div>
    <div class="footer__credits">
      <a
        v-for="(item, index) in network"
        :key="index"
        :aria-label="item.arialabel"
        :href="item.href"
        class="footer__links"
        rel="noopener nofollow"
        target="__blank"
      >
        <span class="heading" v-if="item.contact"> 
          {{ item.contact }}
        </span>
        <Img
          v-if="item.icon"
          :image="item.icon"
          format="svg"
        />
      </a>
    </div>
  </footer>
</template>

<script>
import Img from '@/components/Img'

export default {
  name: 'TheFooter',
  components: { Img },
  props: {
    credits: {
      type: String,
      default: 'Anna Condal'
    },
    network: {
      type: Array,
      default: () => [
        {
          ariaLabel: 'Write an email to',
          href: 'mailto:acondalv@mail.com',
          contact: 'acondalv@gmail.com'
        },
        {
          ariaLabel: 'Link to github profile page',
          href: 'https://github.com/annacv/',
          icon: 'github'
        },
        {
          ariaLabel: 'Link to linkedin profile page',
          href: 'https://www.linkedin.com/in/anna-condal-vela/',
          icon: 'linkedin'
        }
      ]
    }
  },
  setup (props) {
    return { props }
  }
}
</script>