<template>
  <div class="matches container">
    <div class="match" v-for="match in teamCalendar" :key="match.id">
      <div class="match__teams">
        <span class="match__team-one match__team" :class="{'match__team--winner': winnerHomeTeam(match)}">{{ match.homeTeam.name }}</span>
        <span class="match__team-two match__team" :class="{'match__team--winner': winnerAwayTeam(match)}">{{ match.awayTeam.name }}</span>
      </div>
      <div class="match__details">
        <div class="match__results">
          <span class="match__result-one">{{ match.score.fullTime.homeTeam }}</span>
          <span class="match__result-two">{{ match.score.fullTime.awayTeam }}</span>
        </div>
        <div class="match__info">
          <span class="match__status"> {{ matchStatuses[match.status] }} </span>
          <div class="match__time">
            <span class="match__date">{{ match.utcDate | dayjs('dd, D.MM') }}</span>
            <span class="match__exact-time">{{ match.utcDate | dayjs('HH:mm') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTeamCalendarAPI} from "@/api/teamCalendar.api";
import matchStatuses from '@/constants/matchStatuses.constants';
import dayjs from "dayjs";

export default {
  name: "TeamCalendar",
  data () {
    return {
      teamCalendar: []
    }
  },
  computed: {
    dates() {
      return this.$store.state.dates;
    },
  },
  methods: {
    async getTeamCalendar() {
      const teamId = this.$route.params.teamId;

      const resp = await getTeamCalendarAPI(teamId, dayjs(this.dates[0]).format('YYYY-MM-DD') , dayjs(this.dates[1]).format('YYYY-MM-DD'));

      this.teamCalendar = resp.data.matches;
    },
    winnerAwayTeam(match) {
      return match.score.fullTime.awayTeam > match.score.fullTime.homeTeam
    },
    winnerHomeTeam(match) {
      return match.score.fullTime.homeTeam > match.score.fullTime.awayTeam
    },
  },
  created() {
    this.matchStatuses = matchStatuses;
  },
  mounted() {
    this.getTeamCalendar();
    this.$eventBus.$emit('updateRouteQueryParams');
  },
  watch: {
    dates() {
      this.getTeamCalendar();
    }
  }
}


</script>

<style lang="scss">

.matches {
  padding-top: 155px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }

  @media screen and (max-width: 800px) {
    padding-top: 160px;
  }

  @media screen and (max-width: 500px) {
    padding-top: 160px;
  }
}

.match {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  border: solid 1px #ddd;
  align-items: center;
  width: 48%;
  min-height: 130px;

  @media screen and (max-width: 1300px) {
    width: 80%;
    margin: 0 30px;
    justify-content: space-between;
  }

  @media screen and (max-width: 800px) {
    width: 90%;
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    border: 0;
    width: 100%;
    justify-content: space-between;
  }

  &__details {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__teams {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    margin: 20px 60px 20px 30px;
    min-width: 150px;

    @media screen and (max-width: 1400px) {
      margin-left: 60px;
    }

    @media screen and (max-width: 800px) {
      margin-left: 10px;
    }
  }

  &__team {
    &--winner {
      color: red;
    }
  }

  &__team-one, &__team-two {
    min-width: 200px;
  }

  &__team-one, &__result-one {
    margin-bottom: 10px;
  }

  &__results {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    margin: 20px 30px;
    padding-right: 20px;
    border-right: solid 1px #ddd;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 30px;

    @media screen and (max-width: 1400px) {
      margin-right: 60px;
      padding-right: 0;
    }
    @media screen and (max-width: 800px) {
      margin-right: 10px;
      padding-right: 0;
    }

  }

  &__time {
    display: flex;
    flex-direction: column;
  }

  &__date {
    margin-bottom: 5px;
  }

  &__date, &__exact-time {
    font-family: arial,sans-serif-medium,sans-serif;
    font-size: 14px;
    align-items: center;
    text-align: center;
  }

  &__status {
    margin-bottom: 10px;
  }
}
</style>