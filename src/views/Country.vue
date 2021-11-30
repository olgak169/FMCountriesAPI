<template>
  <main class="container">
      <top-panel :main="false"/>
      <Loader-comp v-if="this.$store.state.loading"/>
      <div class="country-container" v-if="country">
        <div class="country-flag">
          <img :src="country.flags.png" :alt="'Flag of ' + country.name.common">
        </div>
        <section class="country-details">
          <h1 class="country-name">{{ country.name.common }}</h1>
          <div class="country-details-column">
            <h2 class="heading-3">Native Name: <span class="text-p">{{ nativeName}}</span></h2>
            <h2 class="heading-3">Population: <span class="text-p">{{ population }}</span></h2>
            <h2 class="heading-3">Region: <span class="text-p">{{ country.region }}</span></h2>
            <h2 class="heading-3">Sub Region: <span class="text-p">{{ country.subregion || country.region}}</span></h2>
            <h2 class="heading-3">Capital: <span class="text-p">{{ capital }}</span></h2>
          </div>
          <div class="country-details-column">
            <h2 class="heading-3">Top Level Domain: <span class="text-p">{{ domains }}</span></h2>
            <h2 class="heading-3">Currencies: <span class="text-p">{{ currencies }}</span></h2>
            <h2 class="heading-3">Languages: <span class="text-p">{{ languages || 'none'}}</span></h2>
          </div>
          <div class="country-borders" >
              <h2 class="borders-title" :class="{ inline: !country.borders}">Border Countries: </h2>
              <div class="borders-list" v-if="country.borders">
                <button 
                v-for="(border, index) in borders" 
                :key="index"
                @click="$router.push({ name: 'Country', params: { name: border }})"
                class="btn">{{ border }}</button>
              </div>
              <span v-else>none</span>
          </div>
        </section>
      </div>
      <p v-else :class="{ show: this.$store.state.loading }">No results</p>
  </main>
</template>

<script>
import LoaderComp from '@/components/LoaderComp.vue'
import TopPanel from '@/components/TopPanel.vue'

export default {
  name: 'Country',
  data() {
    return {
      country: null,
      error: null,
      bordering: false,
      loading: this.$store.state.loading
    }
  },
  components: {
    TopPanel, 
    LoaderComp,
  },
  computed: {
    loadingState () {
      return this.$store.state.loading
    },
    routeName () {
      return this.$route.params.name
    },
    capital() {
      if (this.country.capital) {
        return this.country.capital[0]
      } else {
        return 'none'
      }
    },
    population(){
      return this.country.population.toLocaleString()
    },
    borders() {
      let br = []
      if (this.country.borders) {
        this.bordering = true
        this.country.borders.forEach(border => {
          br.push(this.$store.getters.findByCode(border))
        })
      } 
      return br
    },
    currencies(){
      let currs = []
      if(this.country.currencies) {
        for (const [key, value] of Object.entries(this.country.currencies)) {
          currs.push(value.name)
        }
        return currs.join(', ')
      } else {
        return 'none'
      }
    },
    languages() {
      let langs = []
      if (this.country.languages) {
        for (const [key, value] of Object.entries(this.country.languages)) {
          langs.push(value)
        }
        return langs.join(', ')
      }
    },
    nativeName(){
      let names = []
      if (this.country.name.nativeName) {
        for (const [key, value] of Object.entries(this.country.name.nativeName)) {
        names.push(value.common)
      }
        return names[names.length - 1]
      } else {
        return this.country.name.common
      }
    },
    domains() {
      return this.country.tld.join(', ')
    }
  },
  created(){
    if (!this.$store.state.loading) {
      this.fetchCountry()
    }
  },
  methods: {
    fetchCountry() {
      this.country = this.$store.getters.findByName(this.routeName)
    },
  },
  // if url is typed directly watch will trigger data load
  watch: {
    loadingState() {
      this.fetchCountry()
    },
    routeName() {
      this.fetchCountry()
    }
  }
}
</script>
