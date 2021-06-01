<template>
  <div class="matches container">
    <div class="match" v-for="match in competitionCalendar" :key="match.id">
      <div class="match__teams">
        <span class="match__team-one">{{ match.homeTeam.name }}</span>
        <span class="match__team-two">{{ match.awayTeam.name }}</span>
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
import {getCompetitionCalendarAPI} from "@/api/competitions.api";
import matchStatuses from '@/constants/matchStatuses.constants';
import dayjs from "dayjs";

export default {
  name: "CompetitionCalendar",
  data () {
    return {
      competitionCalendar: []
    }
  },
  computed: {
    season() {
      return this.$store.state.season;
    },
    dates() {
      return this.$store.state.dates;
    }
  },
  methods: {
    async getCompetitionCalendar() {
      const competitionId = this.$route.params.competitionId;

      const resp = await getCompetitionCalendarAPI(competitionId, dayjs(this.dates[0]).format('YYYY-MM-DD') , dayjs(this.dates[1]).format('YYYY-MM-DD'), this.season);

      this.competitionCalendar = resp.data.matches;
    },
  },
  created() {
    this.matchStatuses = matchStatuses;
  },
  mounted() {
    this.getCompetitionCalendar();
    this.$eventBus.$emit('updateRouteQueryParams');
  },
  watch: {
    dates() {
      this.getCompetitionCalendar();
    },
    season() {
      this.getCompetitionCalendar();
    }
  }
}


</script>

<style lang="scss" scoped>
.matches {
  @media screen and (max-width: 800px) {
    padding-top: 200px;
  }

  @media screen and (max-width: 500px) {
    padding-top: 175px;
  }

}

</style>