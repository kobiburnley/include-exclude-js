// @flow

require('chai').should();
import {RulesSet} from "../rules.set";
import {GeoLevel} from "./mock/geo.level";
import {testItems} from './mock/items';
import {rulesSets} from './mock/rules.sets';

describe('determine included', function () {
  this.timeout(1000000);


  describe('CONTINENT_1', () => {
    const rulesSet = new RulesSet(rulesSets.CONTINENT_1, GeoLevel.CONTINENT);
    it('1', () => {
      rulesSet.testItem(testItems.TEL_AVIV).should.eq(true);
      rulesSet.testItem(testItems.TOKYO).should.eq(true);
      rulesSet.testItem(testItems.LONDON).should.eq(false);
    });
  });



});