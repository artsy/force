/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FollowProfile;
const sd = require('sharify').data;
const Backbone = require('backbone');

export default (_FollowProfile = class FollowProfile extends Backbone.Model {

  urlRoot() {
    return `${sd.API_URL}/api/v1/me/follow/profile`;
  }
});
export const FollowProfile = _FollowProfile
