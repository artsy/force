/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');

export const compactObject = (o) => {
  const clone = _.clone(o);
  _.each(clone, function(v, k) {
    if (!v) {
      return delete clone[k];
    }
  });
  return clone;
}
