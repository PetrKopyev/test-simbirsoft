<template>
  <header class="header">
    <div class="header__leagues">
      <router-link class="header__item" to="/">Лиги</router-link>
    </div>
    <hr/>
    <div class="header__menu container">
      <div class="header__menu-main">
        <select class="header__season" v-model="season">
          <option
              v-for="year in years"
              :key="year"
              :value="year"
          >
            {{ year }}
          </option>
        </select>
        <el-date-picker
            v-show="isDatepickerShowed"
            v-model="dates"
            type="daterange"
            range-separator="по"
            start-placeholder="Дата начала"
            end-placeholder="Дата конца"
            format="dd.MM.yyyy"
            size="mini"
        />

        <div class="header__search" v-show="isSearchShowed">
          <input type="search" class="header__input" :placeholder="searchPlaceholder" v-model="searchQuery">
        </div>
      </div>

      <div class="header__links" v-show="isMenuShowed">
        <router-link class="header__link" :to="`/competition/${competitionId}/matches`">Матчи</router-link>
        <router-link class="header__link" :to="`/competition/${competitionId}/teams`">Команды</router-link>
      </div>
    </div>

  </header>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Header",
  data() {
    return {
      years: [],
    }
  },
  computed: {
    isDatepickerShowed() {
      return this.$route.name === 'TeamCalendar' || this.$route.name === 'CompetitionCalendar';
    },
    isMenuShowed() {
      return this.$route.name === 'Teams' || this.$route.name === 'CompetitionCalendar';
    },
    isSearchShowed() {
      return this.$route.name === 'Teams' || this.$route.name === 'Competitions';
    },
    searchPlaceholder() {
      let pageName = '';

      if (this.$route.name === 'Teams') {
        pageName = 'команды';
      } else if (this.$route.name === 'Competitions') {
        pageName = 'лиги';
      }

      return `Введите название ${pageName}`;
    },
    competitionId() {
      return this.$route.params.competitionId;
    },
    season: {
      get() {
        return this.$store.state.season;
      },
      set(value) {
        this.$store.dispatch('setSeason', value);
        this.updateRouteQueryParams();
      },
    },
    dates: {
      get() {
        return this.$store.state.dates;
      },
      set(value) {
        this.$store.dispatch('setDates', value);
        this.updateRouteQueryParams();
      },
    },
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.dispatch('setSearchQuery', value);
        this.updateRouteQueryParams();
      },
    },
  },
  methods: {
    init() {
      const minYear = 1950;
      const maxYear = new Date().getFullYear();
      const selectedYear = this.$route.query.selectedYear || maxYear;
      const today = dayjs();
      const selectedDateFrom = dayjs(this.$route.query.dateFrom, 'DD-MM-YYYY', true).isValid()
          ? dayjs(this.$route.query.dateFrom, 'DD-MM-YYYY')
          : today.subtract(1, 'month');
      const selectedDateTo = dayjs(this.$route.query.dateTo, 'DD-MM-YYYY', true).isValid()
          ? dayjs(this.$route.query.dateTo, 'DD-MM-YYYY')
          : today;

      this.searchQuery = this.$route.query.searchQuery || '';

      for (let i = minYear; i <= maxYear; i++) {
        this.years.push(i);
      }

      this.season = selectedYear;
      this.dates = [
        selectedDateFrom,
        selectedDateTo,
      ];
    },
    updateRouteQueryParams() {
      const query = {
        selectedYear: this.season,
      };

      if (this.searchQuery !== '') {
        query.searchQuery = this.searchQuery;
      }

      if (this.isDatepickerShowed) {
        query.dateFrom = dayjs(this.dates[0]).format('DD-MM-YYYY');
        query.dateTo = dayjs(this.dates[1]).format('DD-MM-YYYY');
      }

      this.$router.push({ query });
    },
    clearInput() {
      this.searchQuery = ''
    },
  },
  mounted() {
    this.init();
    this.$eventBus.$on('updateRouteQueryParams', this.updateRouteQueryParams);
    this.$eventBus.$on('clearSearchQuery', this.clearInput);
  },
}
</script>

<style lang="scss">
.header {
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 155px;
  background: #003472;

  &__leagues {
    padding: 20px 40px;

    @media screen and (max-width: 500px) {
      padding: 10px 20px;
    }
  }

  &__item {
    text-decoration: none;
    color: white;
    font-size: 37px;

    @media screen and (max-width: 500px) {
      font-size: 22px;
    }
  }

  &__menu {
    display: flex;
    align-items: center;

      &-main {
        display: flex;
        align-items: center;

        @media screen and (max-width: 500px) {
          flex-direction: column;
          margin-bottom: 20px;
        }
      }

    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
  }

  &__season {
    display: block;
    cursor: pointer;
    max-width: 200px;
    max-height: 40px;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    margin: 16px 20px 14px 5px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;

    @media screen and (max-width: 500px) {
      margin: 5px;
      padding: 5px 15px 5px 5px;
      background-position: right 2px top 50%, 0 0;
    }
  }

  &__links {
    @media screen and (max-width: 800px) {
      padding: 15px 0;
      margin-bottom: 12px;
    }

    @media screen and (max-width: 500px) {
      padding: 0;
      margin-bottom: 10px;
    }
  }

  &__link {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    padding: 22px 30px;

    &:first-child {
      margin-left: 50px;

      @media screen and (max-width: 800px) {
        //margin-left: 0;
      }

      @media screen and (max-width: 500px) {
        padding: 0;
      }
    }

    &.router-link-active {
      border-bottom: 2px solid #FFFFFF;

      @media screen and (max-width: 500px) {
        padding: 5px;
      }
    }

    &:hover {
      background-color: #01295A;

      @media screen and (max-width: 500px) {
        background-color: inherit;
      }
    }
  }

  &__input {
    display: block;
    padding: 0 10px;
    background: #E9EFF6;
    line-height: 40px;
    border-width: 0;
    border-radius: .5em;
    width: 350px;

    @media screen and (max-width: 500px) {
      width: 190px;
      font-size: 12px;
      height: 20px;
      margin-top: 10px;
    }
  }
}

hr {
  margin: 0;
  padding: 0;

  @media screen and (max-width: 500px) {
    margin-bottom: 10px;
  }
}


.el-input__inner {
  border-radius: .5em;
}
</style>