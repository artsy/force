/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _AvantGardeTabsView;
const _ = require('underscore');
const Backbone = require('backbone');

export const AvantGardeTabsView = (_AvantGardeTabsView = (function() {
  _AvantGardeTabsView = class AvantGardeTabsView extends Backbone.View {
    static initClass() {
      this.prototype.events =
        {'click .avant-garde-tabs__tab': 'toggleSection'};
    }

    initialize() {
      this.$tabCursor = this.$('#avant-garde-tabs__cursor');
      return this.moveCursor();
    }

    moveCursor() {
      this.$active = this.$('.avant-garde-tabs__tab--active');
      return this.$tabCursor.animate({
        width: this.$active.outerWidth(),
        left: __guard__(this.$active.position(), x => x.left)
      }
      , 150);
    }

    toggleSection(e) {
      this.$('.avant-garde-tabs__tab--active').removeClass('avant-garde-tabs__tab--active');
      const tab = $(e.currentTarget).addClass('avant-garde-tabs__tab--active').data('tab');
      this.$('.avant-garde-tabs-list--active').removeClass('avant-garde-tabs-list--active');
      this.$(`.avant-garde-tabs-list[data-list='${tab}']`).addClass('avant-garde-tabs-list--active');
      return _.defer(() => {
        return this.moveCursor();
      });
    }
  };
  _AvantGardeTabsView.initClass();
  return _AvantGardeTabsView;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}