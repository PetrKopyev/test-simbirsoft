<template>
  <div class="competitions container" >
    <div class="competitions__list" v-for="competition in filteredCompetitions" :key="competition.id">
      <router-link class="competitions__link" :to="`/competition/${competition.id}`">
        <span class="competitions__item">{{ competition.name }}</span>
        <span class="competitions__country">{{ competition.area.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {getCompetitionsAPI} from '@/api/competitions.api';

export default {
  name: 'Competitions',
  data () {
    return {
      competitions: [],
    }
  },
  computed: {
    searchQuery() {
      return this.$store.state.searchQuery;
    },
    filteredCompetitions() {
      return this.competitions.filter(competition => competition.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  methods: {
    async getCompetitions() {
      const resp = await getCompetitionsAPI()

      this.competitions = resp.data.competitions;
    },
  },
  mounted() {
    this.getCompetitions();
    this.$eventBus.$emit('updateRouteQueryParams');
    this.$eventBus.$emit('clearSearchQuery');
  }
}
</script>

<style lang="scss">


.competitions {
  padding-top: 170px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.8;
  color: #808488;

  @media screen and (max-width: 500px) {
    padding-top: 180px;
  }

  &__list {
    list-style: none;
    text-align: center;
    border: 1px solid #ddd;
    border-bottom: 3px solid #536591;
    padding: 20px 10px;
    cursor: pointer;
    width: calc(1/3*100% - 32px);
    margin: 5px;

    @media screen and (max-width: 810px) {
      width: calc(1/2*100% - 32px);
    }

    @media screen and (max-width: 560px) {
      width: 100%;
    }

    &:hover {
      background-color: #dddddd;
    }
  }

  &__link {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    text-decoration: none;
    color: #808488;
    align-items: center;
  }

  &__item {
    font-size: 13px;
    font-weight: bold;
  }

  &__country {
    font-size: 11px;
  }
}
</style>