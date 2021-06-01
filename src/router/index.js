import Vue from 'vue'
import VueRouter from 'vue-router'
import Competitions from '@/components/Competitions'
import Teams from "@/components/Teams";
import TeamCalendar from "@/components/TeamCalendar"
import CompetitionCalendar from "@/components/CompetitionCalendar";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Competitions',
    component: Competitions,
  },
  {
    path: '/competition/:competitionId?',
    redirect: { name: 'Teams' },
  },
  {
    path: '/competition/:competitionId/teams',
    name: 'Teams',
    component: Teams,
  },
  {
    path: '/competition/:competitionId/matches',
    name: 'CompetitionCalendar',
    component: CompetitionCalendar,
  },
  {
    path: '/teams/:teamId?',
    redirect: { name: 'TeamCalendar' },
  },
  {
    path: '/team/:teamId/matches',
    name: 'TeamCalendar',
    component: TeamCalendar,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
