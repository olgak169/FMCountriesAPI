import { createStore } from 'vuex'

export default createStore({
    state: {
        countryList: [],
        results: [],
        regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania', 'All'],
        regionSelected: '',
        loading: true,
        error: '',
    },
    mutations: {
        SET_INITIAL(state, dataSet) {
            state.countryList = dataSet
            state.results = dataSet
        },
        SET_REGION(state, region) {
            state.regionSelected = region
            if (region === 'All') {
                state.results = state.countryList
            } else if (region == 'America') {
                state.results = state.countryList.filter(
                    country => country.region === 'Americas'
                )
            } else {
                state.results = state.countryList.filter(
                    country => country.region === region
                )
            }
        },
        SET_SEARCH(state, inputName) {
            state.regionSelected = ''
            let res = []
            state.countryList.forEach(country => {
                let countryName = country.name.common.toLowerCase()
                if (countryName.includes(inputName.toLowerCase())) {
                    res.push(country)
                }
            })
            state.results = res
        },
    },
    actions: {
        async loadData({ commit, state }) {
            const axios = require('axios')
            try {
                const data = await axios
                    .get('https://restcountries.com/v3.1/all')
                    .then(response => {
                        commit('SET_INITIAL', response.data)
                        state.loading = false
                    })
            } catch (error) {
                state.error = error.message
            }
        },
        selectRegion({ commit }, region) {
            commit('SET_REGION', region)
        },
        searchInput({ commit }, input) {
            commit('SET_SEARCH', input)
        },
    },
    getters: {
        findByName: state => name => {
            return state.countryList.find(country => country.name.common === name)
        },
        findByCode: state => code => {
            let res = state.countryList.find(country => country.cca3 === code)
            return res.name.common
        },
        resultCount: state => {
            return state.results.length
        },
    },
})
