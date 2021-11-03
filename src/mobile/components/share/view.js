/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ShareView;
const _ = require('underscore');
const Backbone = require('backbone');
const template = function() { return require('./index.jade')(...arguments); };

export const ShareView = (_ShareView = (function() {
  _ShareView = class ShareView extends Backbone.View {
    static initClass() {
  
      this.prototype.events = {
        'click .share-menu-modal': 'toggleShare',
        'click a.share-toggle': 'toggleShare'
      };
    }

    initialize(options) {
      return this.$el.html(template({
        description: options.description,
        url: location.href,
        imageUrl: options.imageUrl
      })
      );
    }

    toggleShare(e) {
      e.preventDefault();
      const $menu = this.$('.share-menu');
      const $modal = this.$('.share-menu-modal');
      const windowHeight = $(window).height();
      const shareMenuHeight = $menu.height();
      this.$('.share-menu').css({'top': windowHeight - shareMenuHeight});    
      if ($menu.hasClass('is-visible' && $modal.hasClass('is-visible'))) {
        $menu.toggleClass('is-visible');
        _.delay((() => $menu.toggle()), 250);
        const id = _.last(location.href.match('/'));
        const resource = _.first(_.last(location.href.match('/'), 2));
        $modal.toggleClass('is-visible');
        return _.delay((() => $modal.toggle()), 250);
      } else {
        $menu.toggle();
        _.defer(() => $menu.toggleClass('is-visible'));
        $modal.toggle();
        return _.defer(() => $modal.toggleClass('is-visible'));
      }
    }
  };
  _ShareView.initClass();
  return _ShareView;
})());
