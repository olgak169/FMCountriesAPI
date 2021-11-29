<template>
  <main class="container">
    <Top-panel :main="true" />
    <Loader-comp v-if="this.$store.state.loading"/>
    <p v-else-if="count < 1">No results</p>
    <div class="cards" :class="{ start: count < 4 }" v-else>
      <transition-group name="cards-move" mode="out-in">
        <Country-card 
        v-for="(country, index) in countryList" 
        :key="index" 
        :country="country" />
      </transition-group>
    </div>
    <button class="btn btn-up" @click="scrollToTop">Scroll to top</button>
  </main>
</template>

<script>
import CountryCard from '@/components/CountryCard.vue'
import LoaderComp from '@/components/LoaderComp.vue'
import TopPanel from '@/components/TopPanel.vue'
export default {

  name: 'Home',
  components: {
    CountryCard,
    TopPanel,
    LoaderComp,
  },
  created() {
    document.addEventListener('scroll', this.scrollBtnHandle)
  },
  computed: {
    countryList(){
      return this.$store.state.results
    },
    count() {
      return this.$store.getters.resultCount
    }
  },
  methods: {
    scrollToTop() {
      document.documentElement.scrollTo({
        top:0,
        behavior: 'smooth'
      })
    },
    scrollBtnHandle() {
      let yPos = document.querySelector('html').scrollTop
      if (yPos > 3000) {
        document.querySelector('.btn-up').classList.add('active')
      } else {
        document.querySelector('.btn-up').classList.remove('active')
      }
    },
  },
  unmounted(){
    document.removeEventListener('scroll', this.scrollBtnHandle)
  }
}
</script>

