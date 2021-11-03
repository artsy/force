/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _DropdownView;
const { SelectView } = require('../../select/client/select_view');
const template = function() { return require('./template.jade')(...arguments); };

export const DropdownView = (_DropdownView = class DropdownView extends SelectView {
  render() {
    this.$el.html(template({
      options: this.filterOptions,
      label: this.label,
      sort: this.sort
    })
    );
    return this;
  }
});
