<template>
  <div class="teams-wrapper container">
    <div class="teams" v-if="teams">
      <span class="teams__caption">Клубы лиги</span>
      <div class="teams__item" v-for="team in filteredTeams" :key="team.id">
        <router-link class="teams__link" :to="`/team/${team.id}/matches`">
          <div class="teams__image">
            <img class="teams__icon" v-if="team.crestUrl" :src="team.crestUrl"/>
          </div>
          <span class="teams__name">{{ team.name }}</span>
          <div class="teams__info">
            <span class="teams__venue" v-if="team.venue">Стадион: {{ team.venue }}</span>
            <span v-if="team.founded">Основан в {{ team.founded }} году</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="teams-error" v-else>Список команд пуст</div>
  </div>
</template>

<script>
import {getTeamsAPI} from '@/api/teams.api';

export default {
  name: "Teams",
  data () {
    return {
      teams: null,
    }
  },
  computed: {
    season() {
      return this.$store.state.season;
    },
    searchQuery() {
      return this.$store.state.searchQuery;
    },
    filteredTeams() {
      return this.teams.filter(team => team.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },

  methods: {
    async getTeams() {
      const competitionId = this.$route.params.competitionId;

      try {
        const resp = await getTeamsAPI(competitionId, this.season);

        this.teams = resp.data.teams
      } catch (e) {
        this.teams = null;
        console.error(e);
      }
    },
  },
  mounted() {
    this.getTeams();
    this.$eventBus.$emit('updateRouteQueryParams');
    this.$eventBus.$emit('clearSearchQuery');
  },
  watch: {
    season(newValue, oldValue) {
      if (oldValue !== null) {
        this.getTeams();
      }
    },
  },
}
</script>

<style lang="scss">

.teams {
  padding-top: 160px;
  background-color: white;
  margin-bottom: 20px;
  min-width: 280px;

  @media screen and (max-width: 800px) {
    padding-top: 220px;
  }

  @media screen and (max-width: 500px) {
    padding-top: 180px;
  }


  &__caption {
    display: flex;
    color: #70757a;
    font-size: 27px;
    font-weight: normal;
    height: 12px;
    line-height: 12px;
    padding: 20px 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 500px) {
      justify-content: center;
      margin-bottom: 10px;
    }
  }

  &__item {
    padding: 10px 20px;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    font-size: 20px;
    font-weight: normal;

    &:hover {
      background-color: #e5e5e5;
    }

    @media screen and (max-width: 500px) {
      padding: 5px 10px;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    position:relative;

    @media screen and (max-width: 500px) {
      justify-content: center;
    }
  }

  &__name {
    line-height: 40px;
    vertical-align: middle;
    color: #000;

    @media screen and (max-width: 500px) {
      font-size: 15px;
    }
  }

  &__image {
    width: 54px;
    max-height: 74px;
    margin-right: 10px;

    @media screen and (max-width: 500px) {
      width: 34px;
      max-height: 44px;
      margin-right: 5px;
    }
  }

  &__icon {
    width: 100%;
    height: 100%;
    padding-right: 10px;
  }

  &__info {
    display:none;
    color: black;
    font-size: 12px;
    font-weight: 400;
  }

  &__link:hover &__info{
    display:block;
    position:absolute;
    right:170px;
    z-index:9;

    @media screen and (max-width: 1200px) {
      right:80px;
    }

    @media screen and (max-width: 700px) {
      right:10px;
    }

    @media screen and (max-width: 550px) {
      display: none;
    }

  }

  &__venue {
    margin-right: 20px;
  }

  &-error {
    padding-top: 160px;

    @media screen and (max-width: 800px) {
      padding-top: 220px;
    }
    @media screen and (max-width: 500px) {
      padding-top: 180px;
    }
  }
}

</style>