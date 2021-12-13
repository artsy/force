/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Representative;
const { Profile } = require('./profile');

export default (_Representative = (function() {
  _Representative = class Representative extends Profile {
    static initClass() {
      this.prototype.idAttribute = 'default_profile_id';
    }
  };
  _Representative.initClass();
  return _Representative;
})());
export const Representative = _Representative
