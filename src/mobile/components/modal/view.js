/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ModalView;
const _ = require('underscore');
const Backbone = require('backbone');
const { mediator } = require('../../../lib/mediator');
const template = function() { return require('./template.jade')(...arguments); };

export const ModalView = (_ModalView = (function() {
  _ModalView = class ModalView extends Backbone.View {
    static initClass() {
      this.prototype.className = 'modal-view';

      this.prototype.events =
        {"click .modal__close": "fadeOut"};
    }

    initialize() {
      return mediator.on('modal:close', this.fadeOut);
    }

    render() {
      this.$el.html(template);
      return this;
    }

    insertModalContent(el) {
      return this.$('.modal__content').html(el);
    }

    fadeOut() {
      this.$('.modal').addClass('is-fadeout');
      return _.delay(_.bind(this.remove, this), 500);
    }
  };
  _ModalView.initClass();
  return _ModalView;
})());
