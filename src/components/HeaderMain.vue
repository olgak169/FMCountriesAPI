<template>
  <header>
    <div class="container container__header">
      <router-link class="heading-1" to="/">Where in the world?</router-link>
        <Toggle-icon />
    </div>
  </header>
</template>

<script>
import ToggleIcon from './ToggleIcon.vue'
export default {
  components: { ToggleIcon },
  name: 'HeaderMain',
}
</script>