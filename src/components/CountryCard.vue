<template>
  <div class="card" v-if="country" @click="$router.push({ name: 'Country', params: {name: country.name.common}})">
      <div class="card-flag">
        <img :src="country.flags.png" :alt="'Flag of ' + country.name.common">
      </div>
      <div class="card-details">
        <h2 class="heading-2">{{ country.name.common }}</h2>
        <h3 class="heading-3">Population: <span class="text-p">{{ population }}</span></h3>
        <h3 class="heading-3">Region: <span class="text-p">{{ country.region }}</span></h3>
        <h3 class="heading-3">Capital: <span class="text-p">{{ capital }}</span></h3>
      </div>
  </div>
</template>

<script>
export default {
    props: ['country'],
    computed: {
      capital() {
        if (this.country.capital) {
          return this.country.capital[0]
        } else {
          return 'none'
        }
      },
      population(){
        return this.country.population.toLocaleString()
      }
    }
}
</script>