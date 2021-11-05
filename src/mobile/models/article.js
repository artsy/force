/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Article;
const _ = require('underscore');
const sd = require('sharify').data;
const moment = require('moment');
const Backbone = require('backbone');
const { Partner } = require('./partner');
const { Fair } = require('./fair');
const { resizer } = require('../components/resizer/index');
const { compactObject } = require('./mixins/compact_object');

export default (_Article = (function() {
  _Article = class Article extends Backbone.Model {
    static initClass() {

      this.prototype.defaults =
        {sections: []};

      this.prototype.urlRoot = `${sd.POSITRON_URL}/api/articles`;
    }

    href() {
      return `/article/${this.get('slug')}`;
    }

    fullHref() {
      return `${sd.APP_URL}/article/${this.get('slug')}`;
    }

    date(attr) {
      if (attr == null) { attr = 'published_at'; }
      return moment(this.get(attr));
    }

    formatDate() {
      return this.date('published_at').format('MMMM Do');
    }

    related() {
      if (this.__related__ != null) { return this.__related__; }
      return this.__related__ =
        {author: new Backbone.Model(this.get('author'))};
    }

    cropUrlFor(attr, ...args) {
      return resizer.crop(this.get(attr), ...Array.from(args));
    }

    authorHref() {
      if (this.get('author')) { return `/${this.get('author').profile_handle}`; } else { return this.href(); }
    }

    shareDescription() {
      return (this.get('share_description') || this.get('thumbnail_title')) + " @artsy";
    }

    isFairArticle() {
      // associated to a fair and the Fairs team has written it
      return (__guard__(this.get('fair_ids'), x => x.length) > 0) && (this.get('channel_id') === sd.FAIR_CHANNEL_ID);
    }

    fetchRelated(options) {
      let fair, footerArticles, partner;
      const { Articles } = require('../collections/articles');
      const dfds = [];
      const channel_id = this.get('channel_id') || this.get('partner_channel_id') || sd.ARTSY_EDITORIAL_CHANNEL;
      dfds.push((footerArticles = new Articles).fetch({
        cache: true,
        data: {
          published: true,
          sort: '-published_at',
          channel_id
        }
      })
      );

      if (this.get('partner_channel_id')) {
        dfds.push((partner = new Partner({id: this.get('partner_channel_id')})).fetch({cache: true}));
      }

      if (this.isFairArticle()) {
        dfds.push((fair = new Fair({id: this.get('fair_ids')[0]})).fetch({cache: true}));
      }

      return Promise.allSettled(dfds).then(() => {
        if (footerArticles) { footerArticles.remove(this); }
        return options.success({
          article: this,
          footerArticles,
          partner: (partner ? partner : undefined),
          fair
        });
      });
    }

    toJSONLD() {
      let creator = [];
      if (this.get('author')) { creator.push(this.get('author').name); }
      if (this.get('contributing_authors').length) { creator = _.union(creator, _.pluck(this.get('contributing_authors'), 'name')); }
      return compactObject({
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": this.get('thumbnail_title'),
        "url": `${sd.APP_URL}` + this.href(),
        "thumbnailUrl": this.get('thumbnail_image'),
        "dateCreated": this.get('published_at'),
        "articleSection": this.get('section') ? this.get('section').get('title') : "Editorial",
        "creator": creator,
        "keywords": this.get('tags').length ? this.get('tags') : undefined
      });
    }
  };
  _Article.initClass();
  return _Article;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Article = _Article
