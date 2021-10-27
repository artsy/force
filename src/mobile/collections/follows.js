/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Follows;
const _ = require('underscore');
const Backbone = require('backbone');
const CurrentUser = require('../models/current_user');

//
// Follows
// Maintains the entities followed by the current user and offers `syncFollows` to retrieve
//
module.exports = (Follows = (function() {
  Follows = class Follows extends Backbone.Collection {
    static initClass() {
  
      this.prototype.maxSyncSize = 10;
    }

    initialize() {
      this.on('add', model => {
        return this.trigger(`add:${model.get(this.type).id}`);
      });
      return this.on('remove', model => {
        return this.trigger(`remove:${model.get(this.type).id}`);
      });
    }

    isFollowing(entityId) {
      return !_.isUndefined(this.findByEntityId(entityId));
    }

    findByEntityId(entityId) {
      return this.find(model => model.get(this.type).id === entityId);
    }

    // Call this from views after one or more follows are fetched
    // to see if they are followed by the current user
    // Recursively chunks the list of ids by @maxSyncSize
    syncFollows(entityIds) {
      if (!CurrentUser.orNull()) { return; }
      if (entityIds.length === 0) { return; }
      // Fetch the first up to @maxSyncSize
      const options = {
        data: this.formatIds(entityIds),
        cache: false,
        remove: false,
        merge: true
      };
      this.fetch(options);
      // Recursively fetch the rest
      return this.syncFollows(_.rest(entityIds, this.maxSyncSize));
    }

    follow(entityId, options) {
      if (options == null) { options = {}; }
      const {
        error
      } = options;
      options.error = function(model, response, options) {
        this.remove(model);
        if (error) { return error(arguments); }
      }.bind(this);
      return this.add(this.followEntity(entityId, options));
    }

    unfollow(entityId, options) {
      if (options == null) { options = {}; }
      const {
        error
      } = options;
      options.error = function(model, response, options) {
        this.add(model);
        if (error) { return error(arguments); }
      }.bind(this);
      const follow = this.find(model => {
        return model.get(this.type).id === entityId;
      });
      if (follow != null) {
        follow.destroy(options);
      }
      return this.remove(follow);
    }
  };
  Follows.initClass();
  return Follows;
})());
