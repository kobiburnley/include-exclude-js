// @flow

import _ from 'lodash';
import {Level} from "./level";

function itemLevelId(item, level) {
  return level && item[level.id];
}

type RuleItem = {
  type: string,
  selection: 'include' | 'exclude'
}

type Dictionary<T> = {[index: string] : T}

type SelectionRules = {
  include: string[],
  exclude: string[]
}

type RuleItems = Dictionary<SelectionRules>;

export class RulesSet<T> {

  // static withRules<T>(rules: T&RuleItem[]): RulesSet<T> {
  //   const ruleItems: RuleItems<T[]> = _(rules).groupBy('type').mapValues(r => _.groupBy(r, 'selection')).value();
  //   return new RulesSet(ruleItems);
  // }

  ruleItems: RuleItems;
  level: Level;

  constructor(ruleItems: RuleItems, level: Level) {
    this.ruleItems = ruleItems;
    this.level = level;
  }

  testItem(item: T) {
    // console.log('testItem', item);
    // console.log('rules', JSON.stringify(this.ruleItems, null, 2));
    return this.testIncludedParentIncluded(item, this.level);
  }

  getIncludeRulesForLevel(level: Level) {
    return this.ruleItems[level.id]['include'];
  }

  getExcludeRulesForLevel(level: Level) {
    return this.ruleItems[level.id]['exclude'];
  }

  includeRulesContains(item: T, level: Level) {
    return this.getIncludeRulesForLevel(level).includes(item[level.id]);
  }

  excludeRulesContains(item: T, level: Level) {
    return this.getExcludeRulesForLevel(level).includes(item[level.id]);
  }

  testIncludedParentExcluded(item: T, level: Level): boolean {
    console.log(item, level);
    if (!level) {
      console.trace(`testNotExcludedParentIncluded`);
      return false;
    }

    return this.includeRulesContains(item, level) ?
      this.testNotExcludedParentIncluded(item, level.nextLevel()) :
      this.testIncludedParentExcluded(item, level.nextLevel());
  }

  testIncludedParentIncluded(item: T, level: Level): boolean {
    console.log(item, level);
    if (!level) {
      console.trace(`testNotExcludedParentIncluded`);
      return false;
    }

    return !this.getIncludeRulesForLevel(level).length ?
      this.testNotExcluded(item, level) :
      this.includeRulesContains(item, level) ?
        this.testNotExcludedParentIncluded(item, level.nextLevel()) :
        this.testIncludedParentExcluded(item, level.nextLevel());
  }

  testNotExcludedParentIncluded(item: T, level: Level): boolean {
    console.log(item, level);
    if (!level) {
      console.trace(`testNotExcludedParentIncluded`);
      return true;
    }

    return this.excludeRulesContains(item, level) ?
      this.testIncludedParentExcluded(item, level.nextLevel()) :
      this.testNotExcludedParentIncluded(item, level.nextLevel());
  }

  testNotExcluded(item: T, level: Level): boolean {
    console.log(item, level);
    if (!level) {
      console.trace(`testNotExcludedParentIncluded`);
      return true;
    }

    return !this.getExcludeRulesForLevel(level).length ?
      this.testIncludedParentIncluded(item, level.nextLevel()) :
      this.excludeRulesContains(item, level) ?
        this.testIncludedParentExcluded(item, level.nextLevel()) :
        this.testNotExcludedParentIncluded(item, level.nextLevel());
  }

}
