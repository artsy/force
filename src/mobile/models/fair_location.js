/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FairLocation;
const { Location } = require('./location');

export default (_FairLocation = class FairLocation extends Location {

  singleLine() {
    return this.get('display');
  }

  toJSONLD() { return this.singleLine(); }
});
export const FairLocation = _FairLocation
