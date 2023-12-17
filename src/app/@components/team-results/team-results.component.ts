import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamLeague } from '../../@model/team-league';
import { Fixture, FixturesInfo } from '../../@model/fixtures';
import { FootballUpdatesInfoService } from '../../@services/football-updates-info.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css'],
})
export class TeamResultsComponent implements OnInit, OnDestroy {
  teamResultsData: Fixture[] = [];
  selectedTeamId: string;
  subscription: Subscription = new Subscription();
  loading: boolean = false;
  constructor(
    private readonly footballUpdatesInfoService: FootballUpdatesInfoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.selectedTeamId = this.route.snapshot.paramMap.get('id');
    const selectedLeague: TeamLeague =
      JSON.parse(localStorage.getItem('selectedLeagueInfo')!) || [];
    this.getFixturesForSelectedTeam(
      this.selectedTeamId,
      selectedLeague.league.id
    );
  }

  getFixturesForSelectedTeam(id: string, leagueId: number): void {
    this.loading = true;
    this.subscription.add(
      this.footballUpdatesInfoService
        .getFixtures(id, leagueId)
        .subscribe((res: FixturesInfo) => {
          this.teamResultsData = res.response;
          this.loading = false;
        })
    );
  }

  backToFootballUpdates(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
