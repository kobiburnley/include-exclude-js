import {Level} from "../../level";
export class GeoLevel {

  id: string;
  nextLevel: () => Level;

  constructor(id: string, nextLevel: () => Level) {
    this.id = id;
    this.nextLevel = nextLevel;
  }

}

GeoLevel.CONTINENT = new GeoLevel('continent', () => GeoLevel.COUNTRY);
GeoLevel.COUNTRY = new GeoLevel('country', () => GeoLevel.CITY);
GeoLevel.CITY = new GeoLevel('city', () => null);
