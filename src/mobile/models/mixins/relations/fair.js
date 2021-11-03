/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const FairRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { Profile } = require('../../../models/profile');

    const profile_id = this.get('default_profile_id') || __guard__(this.get('organizer'), x => x.profile_id);

    const profile = new Profile({id: profile_id});

    return this.__related__ =
      {profile};
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
