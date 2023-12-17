export interface TeamLeagueInfo {
  response: TeamLeague[];
}

export interface TeamLeague {
  league: League;
  country: Country;
  seasons: Seasons[];
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Seasons {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface Coverage {
  fixtures: Fixtures;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface Fixtures {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}
