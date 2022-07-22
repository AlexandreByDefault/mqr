type Difficulty = 'Difficile' | 'Moyen' | 'Facile';
export interface HickingProps {
  name: string;
  location: string;
  starting_point: string;
  duration: number;
  altitude: number;
  distance: number;
  description: string;
  tips: string;
  difficulty: Difficulty;
  image: string;
}
