/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _MultiPageView;
const _ = require('underscore');
const Backbone = require('backbone');
import markdown from '../util/markdown';
const { Page } = require('../../../desktop/models/page');
const { mediator } = require('../../../lib/mediator');
const template = function() { return require('./template.jade')(...arguments); };

export const MultiPageView = (_MultiPageView = (function() {
  _MultiPageView = class MultiPageView extends Backbone.View {
    constructor(...args) {
      super(...args);
    }

    static initClass() {
      this.prototype.className = 'multi-page-view';

      this.prototype.events =
        {'click .js-page': 'change'};
    }

    preinitialize() {
      this.fireScrollEvent = this.fireScrollEvent.bind(this);
    }

    initialize({ title, description, pages1 }) {
      this.title = title;
      this.description = description;
      this.pages = pages1;
      const pages = _.map(this.pages, (id, title) => new Page({id, title}));

      this.collection = new Backbone.Collection(pages);

      this.state = new Backbone.Model({active: this.collection.first().id});
      this.listenTo(this.state, 'change:active', this.render);

      return this.collection.each(page => {
        return this.listenTo(page, 'sync', this.render);
      });
    }

    change(e) {
      e.preventDefault();
      const $target = $(e.currentTarget);
      this.state.set('active', $target.data('id'));
      return _.defer(this.fireScrollEvent);
    }

    fireScrollEvent() {
      return mediator.trigger('scrollto:element',
        {$targetDiv: this.$('.mpv-content.is-active').first()});
    }

    render() {
      this.$el.html(template({
        title: this.title,
        description: markdown(this.description),
        pages: this.collection,
        active: this.collection.get(this.state.get('active'))
      })
      );
      return this;
    }
  };
  _MultiPageView.initClass();
  return _MultiPageView;
})());
