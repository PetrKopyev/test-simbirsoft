import httpClient from "./httpClient";

export const getTeamCalendarAPI = (teamId, dateFrom, dateTo) => httpClient.get(
    `teams/${teamId}/matches`,
    { params: { dateFrom, dateTo } },
)