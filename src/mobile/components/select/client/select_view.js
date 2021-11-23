/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SelectView;
const Backbone = require('backbone');
const { mediator } = require('../../../../lib/mediator');
const template = function() { return require('../templates/select.jade')(...arguments); };

export const SelectView = (_SelectView = (function() {
  _SelectView = class SelectView extends Backbone.View {
    static initClass() {
      this.prototype.className = 'garamond-select select-group';
      this.prototype.tagName = 'label';
      this.prototype.events =
        {'change select': 'onSelectChange'};
    }

    //
    // @$container - where this view will be appended
    // @name - used to the $el id
    // @label - e.g. 'Medium' or 'Price'
    // @filterOptions - an array of options for the select box
    // @filterParam - what value this will update, e.g. price_range
    // @sort - the option to be selected by default, e.g. All
    //
    initialize({ $container, name, label, filterOptions, filterParam, sort }) {
      this.$container = $container;
      this.name = name;
      this.label = label;
      this.filterOptions = filterOptions;
      this.filterParam = filterParam;
      this.sort = sort;
       //
    }

    render() {
      this.$el.html(template({
        options: this.filterOptions,
        label: this.label,
        sort: this.sort
      })
      );
      return this;
    }

    onSelectChange(e) {
      const value = this.$('select').val();
      const label = this.$('option:selected').text();
      return mediator.trigger('select:changed', {
        value,
        label,
        name: this.name,
        filterParam: this.filterParam
      }
      );
    }
  };
  _SelectView.initClass();
  return _SelectView;
})());
