export interface UserStatsProps {
  id: number;
  title: string;
  acessos: string;
}

export interface UserStatsGraphProps {
  data: UserStatsProps[];
}

export interface GraphDataProps {
  x: string;
  y: number;
}
