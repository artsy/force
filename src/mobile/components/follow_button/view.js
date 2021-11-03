/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FollowButtonView;
const _ = require('underscore');
const Backbone = require('backbone');

export const FollowButtonView = (_FollowButtonView = (function() {
  _FollowButtonView = class FollowButtonView extends Backbone.View {
    static initClass() {
  
      this.prototype.events =
        {'click': 'onToggle'};
    }

    initialize(options) {
      this.validateView(options);
      ({ followId: this.followId, isLoggedIn: this.isLoggedIn, type: this.type, _id: this._id, context_module: this.context_module, context_page: this.context_page } = options);
      this.listenTo(this.collection, `add:${this.followId}`, this.onFollowChange);
      this.listenTo(this.collection, `remove:${this.followId}`, this.onFollowChange);
      return this.onFollowChange();
    }

    validateView(options) {
      if (!this.collection) { throw "You need to pass a Follows collection!"; }
      if (!_.isFunction(this.collection.isFollowing)) { throw "This view's collection must implement `isFollowing`"; }
      if (!_.isFunction(this.collection.follow)) { throw "This view's collection must implement `follow`"; }
      if (!_.isFunction(this.collection.unfollow)) { throw "This view's collection must implement `unfollow`"; }
      if (!options.followId) { throw "You must pass an ID for a followable entity as `followId`"; }
    }

    onFollowChange(e) {
      const state = this.collection.isFollowing(this.followId) ? 'following' : 'follow';
      return this.$el.attr('data-state', state);
    }

    onToggle(e) {
      if (this.$el.hasClass('.is-clicked')) { return false; }
      if (this.isLoggedIn) {
        if (this.collection.isFollowing(this.followId)) {
          this.collection.unfollow(this.followId);
          window.analytics.track("Unfollowed " + this.type, {
            entity_id: this._id,
            entity_slug: this.followId,
            context_module: this.context_module,
            context_page: this.context_page,
          });
        } else {
          this.collection.follow(this.followId);
          window.analytics.track("Followed " + this.type, {
            entity_id: this._id,
            entity_slug: this.followId,
            context_module: this.context_module,
            context_page: this.context_page,
          });

          // Delay label change
          this.$el.addClass('is-clicked');
          setTimeout((() => this.$el.removeClass('is-clicked')), 1500);
        }
      } else {
        location.href = `/sign_up?action=follow&objectId=${this.followId}&kind=artist&destination=${window.location}&intent=follow+${this.type.toLowerCase()}&contextModule=${this.context_module}`;
      }

      return false;
    }
  };
  _FollowButtonView.initClass();
  return _FollowButtonView;
})());
