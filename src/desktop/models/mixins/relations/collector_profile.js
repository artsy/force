/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const CollectorProfileRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { UserInterests } = require('../../../collections/user_interests');
    const { UserFairActions } = require('../../../collections/user_fair_actions');

    const userInterests = new UserInterests;
    const userFairActions = new UserFairActions;

    return this.__related__ = {
      userInterests,
      userFairActions
    };
  }
};
