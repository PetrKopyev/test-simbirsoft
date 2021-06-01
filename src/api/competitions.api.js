import httpClient from "./httpClient";

export const getCompetitionsAPI = () => httpClient.get('/competitions', { params: { plan: 'TIER_ONE' } })

export const getCompetitionCalendarAPI = (competitionId, dateFrom, dateTo, season) => httpClient.get(`/competitions/${competitionId}/matches`, { params: { dateFrom, dateTo, season } })
