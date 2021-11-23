/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require('backbone');

export const UserInterestRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const interest = new Backbone.Model(this.get('interest'));

    return this.__related__ =
      {interest};
  }
};
