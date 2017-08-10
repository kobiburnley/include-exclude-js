// @flow

require('chai').should();
import {RulesSet} from "../rules.set";
import {GeoLevel} from "./mock/geo.level";
import {testItems} from './mock/items';
import {rulesSets} from './mock/rules.sets';

describe('determine included', function () {
  this.timeout(1000000);


  describe('INCLUDE_COUNTRY', () => {
    const rulesSet = new RulesSet(rulesSets.INCLUDE_COUNTRY, GeoLevel.COUNTRY);
    it('1', () => {
      rulesSet.testItem(testItems.A1).should.eq(true);
    });

    it('2', () => {
      rulesSet.testItem(testItems.B1).should.eq(false);
    })
  });

  describe.only('INCLUDE_CITY_IN_EXCLUDED_COUNTRY', () => {
    const rulesSet = new RulesSet(rulesSets.INCLUDE_CITY_IN_EXCLUDED_COUNTRY, GeoLevel.COUNTRY);
    it('1', () => {
      rulesSet.testItem(testItems.A1).should.eq(true);
    });
    it('2', () => {
      rulesSet.testItem(testItems.A2).should.eq(false);
    });
    it('3', () => {
      rulesSet.testItem(testItems.B1).should.eq(true);
    });
    it('4', () => {
      rulesSet.testItem(testItems.C1).should.eq(true);
    });
    it('5', () => {
      rulesSet.testItem(testItems.C2).should.eq(false);
    });
  });

  describe('INCLUDE_CITY', () => {
    const rulesSet = new RulesSet(rulesSets.INCLUDE_CITY, GeoLevel.COUNTRY);

    it('1', () => {
      rulesSet.testItem(testItems.A1).should.eq(true);
      rulesSet.testItem(testItems.B2).should.eq(true);
    });
    it('2', () => {
      rulesSet.testItem(testItems.A2).should.eq(false);
    });
    it('3', () => {
      rulesSet.testItem(testItems.B1).should.eq(false);
    });
  });

  describe('EXCLUDE_CITY_IN_INCLUDED_COUNTRY', () => {
    const rulesSet = new RulesSet(rulesSets.EXCLUDE_CITY_IN_INCLUDED_COUNTRY, GeoLevel.COUNTRY);

    it('1', () => {
      rulesSet.testItem(testItems.A1).should.eq(false);
    });

    it('2', () => {
      rulesSet.testItem(testItems.A2).should.eq(true);
    });

    it('3', () => {
      rulesSet.testItem(testItems.B1).should.eq(false);
    });

    it('4', () => {
      rulesSet.testItem(testItems.B2).should.eq(true);
    });
  })
});