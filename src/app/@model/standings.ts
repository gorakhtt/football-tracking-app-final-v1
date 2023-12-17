export interface TeamStnding {
  league: TeamStandingLeague;
}

export interface TeamStandingsInfo {
  response: TeamStnding[];
}

export interface TeamStandingLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Array<Standings[]>;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface AllHomeAway {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

export interface Goals {
  for: number;
  against: number;
}

export interface Standings {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: AllHomeAway;
  home: AllHomeAway;
  away: AllHomeAway;
  update: string;
}
