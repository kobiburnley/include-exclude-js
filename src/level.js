export interface Level {
  id: string;
  nextLevel: () => Level;
}