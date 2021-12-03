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
        <img
          v-if="item.icon"
          :alt="item.icon.alt"
          :src="item.icon.src"
        />
      </a>
    </div>
  </footer>
</template>

<script>
import github from '@/assets/github.svg'
import linkedin from '@/assets/linkedin.svg'

export default {
  name: 'TheFooter',

  props: {
    credits: {
      type: String,
      default: 'Your Name and Surname'
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
          icon: {
            alt: 'github icon',
            src: github
          }
        },
        {
          ariaLabel: 'Link to linkedin profile page',
          href: 'https://www.linkedin.com/in/anna-condal-vela/',
          icon: {
            alt: 'linkedin icon',
            src: linkedin
          }
        }
      ]
    }
  }
}
</script>