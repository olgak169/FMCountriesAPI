<template>
  <Header-main />
  <router-view v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>
<script>
import HeaderMain from '@/components/HeaderMain.vue'
export default {
  components: {
    HeaderMain,
  },
  created() {
    this.$store.dispatch('loadData')
  }
}
</script>