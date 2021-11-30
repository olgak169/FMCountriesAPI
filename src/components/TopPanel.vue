<template>
  <div class="panel-inputs" v-if="main">
        <label for="search" class="label-search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="search-icon" d="M18 16.5762L12.686 11.2621C13.5681 10.085 14.0974 8.62927 14.0974 7.04869C14.0974 3.16184 10.9355 0 7.04869 0C3.16184 0 0 3.16184 0 7.04869C0 10.9355 3.16184 14.0974 7.04869 14.0974C8.62927 14.0974 10.085 13.5681 11.2621 12.686L16.5762 18L18 16.5762ZM0.671304 7.04869C0.671304 3.53206 3.53206 0.671304 7.04869 0.671304C10.5653 0.671304 13.4261 3.53206 13.4261 7.04869C13.4261 10.5653 10.5653 13.4261 7.04869 13.4261C3.53206 13.4261 0.671304 10.5653 0.671304 7.04869ZM11.9381 12.1147C11.9979 12.0569 12.0566 11.9982 12.1143 11.9385C12.1634 11.8878 12.2164 11.8411 12.2637 11.7891L17.0508 16.5762L16.5758 17.0511L11.7891 12.2637C11.8411 12.2164 11.8874 12.1633 11.9381 12.1147Z"/>
            </svg>
            <input type="search" name="search" id="search" autocomplete="off" placeholder="Search for a country..." v-model="inputName" @input="selectName">
        </label>
      <div class="label-select">
        <button @click="selectOpen = !selectOpen" class="btn btn-regions">
            <span>{{ this.$store.state.regionSelected === ''? 'Filter by region' :  this.$store.state.regionSelected }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="down-arrow" d="M5.88 9.2763L0 3.41789L0.7728 2.66669L5.88 7.7739L10.9872 2.66669L11.76 3.41789L5.88 9.2763Z"/>
            </svg>
        </button>
        <transition name="slide-open">
        <ul v-show="selectOpen" class="region-list">
            <li 
            v-for="region in regions" 
            :key="region"
            @click="selectRegion(region)"
            class="region-item">
                {{ region }}
            </li>
        </ul>
        </transition>
      </div>
  </div>
  <div class="panel-button" v-else>
    <button @click="$router.go(-1)" class="btn btn-back" aria-label="Go back">
        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000"><path d="M9 6l-6 6 6 6"/><path d="M21 12H4"/><path stroke-linecap="round" d="M3 12h1"/></svg>
        <span>Back</span>
    </button>
  </div>
</template>

<script>
export default {
    name: 'TopPanel',
    props: ['main'],
    data() {
        return {
            selectOpen: false,
            inputName: ''
        }
    },
    methods: {
        selectRegion(region) {
            this.inputName = ''
            this.selectOpen = false 
            this.$store.dispatch('selectRegion', region)
        },
        selectName() {
            this.selectOpen = false
            this.$store.dispatch('searchInput', this.inputName)
        }
    },
    computed: {
        regions(){
            return this.$store.state.regions
        }
    }
}
</script>