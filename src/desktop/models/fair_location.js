/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FairLocation;
const Backbone = require('backbone');

export default (_FairLocation = class FairLocation extends Backbone.Model {

  singleLine() {
    return this.get('display');
  }

  toJSONLD() { return this.singleLine(); }
});
export const FairLocation = _FairLocation
