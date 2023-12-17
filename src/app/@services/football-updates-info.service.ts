import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FixturesInfo } from '../@model/fixtures';
import { TeamStandingsInfo } from '../@model/standings';
import { TeamLeague, TeamLeagueInfo } from '../@model/team-league';

@Injectable()
export class FootballUpdatesInfoService {
  apiBaseUrl: string = 'https://v3.football.api-sports.io/';
  constructor(private readonly http: HttpClient) {}

  setHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', '96065ab40fb12af77d841372ee0bcb3d');
    return headers;
  }

  getTeamLeagues(): Observable<TeamLeagueInfo> {
    return this.http.get<TeamLeagueInfo>(`${this.apiBaseUrl}leagues`, {
      headers: this.setHeaders(),
    });
  }

  getStandingsForSelectedCountry(
    leagueInfo: TeamLeague
  ): Observable<TeamStandingsInfo> {
    const d = new Date();
    const year = d.getFullYear();
    return this.http.get<TeamStandingsInfo>(
      `${this.apiBaseUrl}standings?league=${leagueInfo?.league?.id}&season=${year}`,
      {
        headers: this.setHeaders(),
      }
    );
  }

  getFixtures(teamId: string, leagueId: number): Observable<FixturesInfo> {
    const d = new Date();
    const year = d.getFullYear();
    const status = 'FT';
    return this.http.get<FixturesInfo>(
      `${this.apiBaseUrl}fixtures?team=${teamId}&season=${year}&league=${leagueId}&last=10&status=${status}`,
      {
        headers: this.setHeaders(),
      }
    );
  }
}
