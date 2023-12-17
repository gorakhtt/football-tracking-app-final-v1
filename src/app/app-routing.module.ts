import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballUpdatesHomeComponent } from './@components/football-updates-home/football-updates-home.component';
import { TeamResultsComponent } from './@components/team-results/team-results.component';

const footBallInfoRoutes: Routes = [
  { path: '', component: FootballUpdatesHomeComponent, pathMatch: 'full' },
  { path: 'team-results/:id', component: TeamResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(footBallInfoRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
