import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    season: null,
    dates: [],
    searchQuery: '',
  },
  mutations: {
    SET_SEASON(state, season) {
      state.season = season;
    },
    SET_DATES(state, dates) {
      state.dates = dates;
    },
    SET_SEARCH_QUERY(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    setSeason({ commit }, season) {
      commit('SET_SEASON', season);
    },
    setDates({ commit }, dates) {
      commit('SET_DATES', dates);
    },
    setSearchQuery({ commit }, searchQuery) {
      commit('SET_SEARCH_QUERY', searchQuery);
    },
    clearSearchQuery({ commit }) {
      commit('SET_SEARCH_QUERY', '');
    },
  },
});

export default store;