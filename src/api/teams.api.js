import httpClient from "./httpClient";

export const getTeamsAPI = (competitionId, season) => httpClient.get(
    `competitions/${competitionId}/teams`,
    { params: { season } },
    )