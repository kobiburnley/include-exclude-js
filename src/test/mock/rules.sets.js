import {GeoLevel} from './geo.level';
const {CONTINENT, COUNTRY, CITY} = GeoLevel;

export const rulesSets = {
  INCLUDE_COUNTRY: {
    country: {
      include: ['A'],
      exclude: []
    },
    city: {
      include: [],
      exclude: []
    }
  },

  INCLUDE_CITY_IN_EXCLUDED_COUNTRY: {
    country: {
      include: [],
      exclude: ['A', 'C']
    },
    city: {
      include: ['A1', 'C1'],
      exclude: []
    }
  },

  INCLUDE_CITY: {
    country: {
      include: [],
      exclude: []
    },
    city: {
      include: ['A1', 'B2'],
      exclude: []
    }
  },

  EXCLUDE_CITY_IN_INCLUDED_COUNTRY: {
    country: {
      include: ['A'],
      exclude: []
    },
    city: {
      include: ['B2'],
      exclude: ['A1']
    }
  },

  CONTINENT_1: {
    [CONTINENT.id]: {
      include: ['Asia'],
      exclude: []
    },
    [COUNTRY.id]: {
      include: [],
      exclude: ['IL']
    },
    [CITY.id]: {
      include: ['Tel-Aviv'],
      exclude: []
    }
  }
};
