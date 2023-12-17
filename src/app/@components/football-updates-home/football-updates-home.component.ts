import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamStandingsInfo, TeamStnding } from '../../@model/standings';
import { LEAGUE_IDS } from '../../@constants/countries-constant';
import { Country, TeamLeague, TeamLeagueInfo } from '../../@model/team-league';
import { FootballUpdatesInfoService } from '../../@services/football-updates-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-football-updates-home',
  templateUrl: './football-updates-home.component.html',
  styleUrls: ['./football-updates-home.component.css'],
})
export class FootballUpdatesHomeComponent implements OnInit, OnDestroy {
  countriesList: Country[] = [];
  teamLeaguesList: TeamLeague[] = [];
  teamStandingInfo: TeamStnding[] = [];
  selectedLeagueId: number;
  subscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private readonly footballUpdatesInfoService: FootballUpdatesInfoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getTeamLeagues();
  }

  getTeamLeagues(): void {
    this.subscription.add(
      this.footballUpdatesInfoService
        .getTeamLeagues()
        .subscribe((res: TeamLeagueInfo) => {
          this.teamLeaguesList = res.response.filter(
            (leagueInfo: TeamLeague) =>
              LEAGUE_IDS.find(
                (element: number) => element === leagueInfo.league.id
              ) === leagueInfo.league.id
          );
          const selectedLeague: TeamLeague =
            JSON.parse(localStorage.getItem('selectedLeagueInfo')!) ||
            this.teamLeaguesList[0];
          this.getStandingsForSelectedCountry(selectedLeague);
        })
    );
  }

  getStandingsForSelectedCountry(leagueInfo: TeamLeague): void {
    this.loading = true;
    this.selectedLeagueId = leagueInfo.league.id;
    localStorage.setItem('selectedLeagueInfo', JSON.stringify(leagueInfo));
    this.subscription.add(
      this.footballUpdatesInfoService
        .getStandingsForSelectedCountry(leagueInfo)
        .subscribe((res: TeamStandingsInfo) => {
          this.teamStandingInfo = res.response;
          this.loading = false;
        })
    );
  }

  goToTeamResults(id: number): void {
    this.router.navigate(['team-results', id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
