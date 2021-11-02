/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Page;
const Backbone = require('backbone');
const sd = require('sharify').data;
const { Markdown } = require('@artsy/backbone-mixins');
const insane = require('insane');
const _ = require('underscore');

export default (_Page = (function() {
  _Page = class Page extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Markdown);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/page`;
    }

    sanitizedHtml(attr) {
      const clean = insane(this.get(attr), {
        allowedAttributes: {
          a: ["href", "name", "target"],
          img: ["src"],
          h1: ['style'],
          h2: ['style'],
          div: ['style']
        }
      });
      return Markdown.mdToHtml.apply({ get() { return clean; } }, [null, {sanitize: false}]);
    }
  };
  _Page.initClass();
  return _Page;
})());
export const Page = _Page
