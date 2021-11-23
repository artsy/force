/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Article, sd;
const _ = require('underscore');
const _s = require('underscore.string');
const Backbone = require('backbone');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const { POSITRON_URL, APP_URL, ARTSY_EDITORIAL_CHANNEL } = (sd = require('sharify').data);
const { Artwork } = require('./artwork');
const { Artworks } = require('../collections/artworks');
const { Partner } = require('./partner');
const { Channel } = require('./channel');
const { crop, resize } = require('../components/resizer/index.coffee');
const { ArticleRelations } = require('./mixins/relations/article');
const { stripTags } = require('underscore.string');
const { compactObject } = require('./mixins/compact_object');

export default (_Article = (function() {
  _Article = class Article extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, ArticleRelations);

      this.prototype.urlRoot = `${POSITRON_URL}/api/articles`;

      this.prototype.defaults =
        {sections: [{ type: 'text', body: '' }]};
    }

    fetchWithRelated(options) {
      // Deferred require
      if (options == null) { options = {}; }
      const { Articles } = require('../collections/articles');
      const superArticles = new Articles;
      return Promise.allSettled([
        this.fetch({
          error: options.error,
          headers: { 'X-Access-Token': options.accessToken || ''
        },
          cache: true
        }),
        superArticles.fetch({
          error: options.error,
          cache: true,
          headers: { 'X-Access-Token': options.accessToken || ''
        },
          data: {
            is_super_article: true
          }
        })
      ]).then(() => {
        let channel, item, partner, slideshow;
        const slideshowArtworks = new Artworks;
        let superArticle = null;
        const superSubArticles = new Articles;
        const calloutArticles = new Articles;
        const dfds = [];

        // Get slideshow artworks to render server-side carousel
        if (__guard__(this.get('sections'), x => x.length) &&
           ((slideshow = _.first(this.get('sections'))).type === 'slideshow')) {
          for (item of Array.from(slideshow.items)) {
            if (item.type === 'artwork') {
              dfds.push(new Artwork({id: item.id}).fetch({
                cache: true,
                data: { access_token: options.accessToken
              },
                success(artwork) {
                  return slideshowArtworks.add(artwork);
                }
              })
              );
            }
          }
        }

        // Check if the article is a super article
        if (this.get('is_super_article')) {
          superArticle = this;
        } else {
           // Check if the article is IN a super article
          dfds.push(new Articles().fetch({
            error: options.error,
            cache: true,
            headers: { 'X-Access-Token': options.accessToken || ''
          },
            data: {
              super_article_for: this.get('id')
            },
            success(articles) {
              return superArticle = articles != null ? articles.models[0] : undefined;
            }}));
        }

        // Partner Channel + Team Channels
        if (this.get('partner_channel_id')) {
          dfds.push((partner = new Partner({id: this.get('partner_channel_id')})).fetch({cache: true}));
        } else if (this.get('channel_id')) {
          dfds.push((channel = new Channel({id: this.get('channel_id')})).fetch({cache: true}));
        }

        // Callouts
        if (__guard__(this.get('sections'), x1 => x1.length)) {
          for (item of Array.from(this.get('sections'))) {
            if ((item.type === 'callout') && item.article) {
              dfds.push(new Article({id: item.article}).fetch({
                cache: true,
                data: { access_token: options.accessToken
              },
                success(article) {
                  return calloutArticles.add(article);
                }
              })
              );
            }
          }
        }

        return Promise.allSettled(dfds).then(() => {
          const superArticleDefferreds = superArticle ? superArticle.fetchSuperSubArticles(superSubArticles, options.accessToken) : [];
          return Promise.allSettled(superArticleDefferreds)
            .then(() => {

              // Super Sub Article Ids
              let article;
              let superSubArticleIds = [];
              if (superArticles.length) {
                for (article of Array.from(superArticles.models)) {
                  superSubArticleIds = superSubArticleIds.concat(__guard__(article.get('super_article'), x2 => x2.related_articles));
                }
              }

              if (superArticle && (superSubArticles != null ? superSubArticles.length : undefined)) { superSubArticles.orderByIds(superArticle.get('super_article').related_articles); }
              if (channel) { this.set('channel', channel); }
              if (partner) { this.set('partner', partner); }
              return typeof options.success === 'function' ? options.success({
                article: this,
                slideshowArtworks,
                superArticle,
                superSubArticles,
                superSubArticleIds,
                partner: (partner ? partner : undefined),
                channel: (channel ? channel : undefined),
                calloutArticles
              }) : undefined;
          });
        });
      });
    }

    isTopTier() {
      return this.get('tier') === 1;
    }

    href() {
      return `/article/${this.get('slug')}`;
    }

    fullHref() {
      return `${APP_URL}/article/${this.get('slug')}`;
    }

    ampHref() {
      return `${APP_URL}/article/${this.get('slug')}/amp`;
    }

    authorHref() {
      if (this.get('author')) { return `/${this.get('author').profile_handle}`; } else { return this.href(); }
    }

    cropUrlFor(attr, ...args) {
      return crop(this.get(attr), ...Array.from(args));
    }

    date(attr) {
      if (this.get('channel_id') === ARTSY_EDITORIAL_CHANNEL) {
        return momentTimezone(this.get(attr)).tz('America/New_York');
      } else {
        return moment(this.get(attr)).local();
      }
    }

    formatDate() {
      const currentYear = moment().year();
      const publishedYear = this.date('published_at').year();
      const year = currentYear !== publishedYear ? ` ${publishedYear}` : "";

      return this.date('published_at').format('MMMM Do') + year;
    }

    strip(attr) {
      return stripTags(this.get(attr));
    }

    byline() {
      if (this.hasAuthors()) { return _s.toSentence(_.pluck(this.get('authors'), 'name')); }
      if (this.hasContributingAuthors()) { return _s.toSentence(_.pluck(this.get('contributing_authors'), 'name')); }
      if (this.get('author')) { return this.get('author').name; }
      return '';
    }

    contributingByline() {
      if (this.hasContributingAuthors()) { return _s.toSentence(_.pluck(this.get('contributing_authors'), 'name')); }
      return '';
    }

    hasContributingAuthors() {
      return __guard__(this.get('contributing_authors'), x => x.length) > 0;
    }

    hasAuthors() {
      return __guard__(this.get('authors'), x => x.length) > 0;
    }

    getAuthorArray() {
      let creator = [];
      if (this.get('author')) { creator.push(this.get('author').name); }
      if (__guard__(this.get('contributing_authors'), x => x.length)) { creator = _.union(creator, _.pluck(this.get('contributing_authors'), 'name')); }
      return creator;
    }

    getVideoUrls() {
      let urls = [];
      this.get('sections').map(function(section) {
        if (section.type === 'video') {
          return urls.push(section.url);
        }
      });
      if (__guard__(this.get('hero_section'), x => x.type) === 'video') {
        urls.push(this.get('hero_section').url);
      }
      return urls = _.flatten(urls);
    }

    getBodyClass(data) {
      let bodyClass = `body-article body-article-${this.get('layout')}`;
      if (this.get('hero_section') && (this.get('hero_section').type === 'fullscreen')) {
        bodyClass += ' body-no-margins body-transparent-header body-transparent-header-white body-fullscreen-article';
        if (this.get('is_super_article') || data.superArticle) {
          bodyClass += ' body-no-header';
        }
      }
      if (this.isEOYSubArticle(data.superSubArticleIds, data.superArticle)) {
        bodyClass += ' body-eoy-2016';
      }
      if (__guard__(this.get('channel'), x => x.isTeam())) {
        bodyClass += ' body-no-header is-sticky';
      }
      return bodyClass;
    }

    isEOYSubArticle(subArticles, superArticle) {
      if (subArticles == null) { subArticles = []; }
      return (subArticles.length > 0) &&
      !this.get('is_super_article') &&
      ((superArticle != null ? superArticle.id : undefined) === sd.EOY_2016_ARTICLE);
    }

    hasAMP() {
      let needle;
      const isValidLayout = (needle = this.get('layout'), ['standard', 'feature', 'news'].includes(needle));
      if (!isValidLayout) { return false; }
      // AMP requires that images provide a width and height
      // Articles that have been converted to ImageCollections will have this info
      for (let section of Array.from(this.get('sections'))) {
        if (['artworks', 'image'].includes(section.type)) { return false; }
      }
      if ((this.get('layout') === 'news') && this.get('published')) { return true; }
      return this.get('featured') && this.get('published');
    }

    fetchSuperSubArticles(superSubArticles, accessToken) {
      if (accessToken == null) { accessToken = ''; }
      return Array.from(this.get('super_article').related_articles).map((id) =>
        new Article({id}).fetch({
          cache: true,
          headers: { 'X-Access-Token': accessToken
        },
          success(article) {
            return superSubArticles.add(article);
          }
        }));
    }

    getParselySection() {
      if (this.get('channel_id') === ARTSY_EDITORIAL_CHANNEL) {
        return 'Editorial';
      } else if (this.get('channel_id')) {
        return __guard__(this.get('channel'), x => x.name) || __guard__(this.get('channel'), x1 => x1.get('name'));
      } else if (this.get('partner_channel_id')) {
        return 'Partner';
      } else {
        return 'Other';
      }
    }

    // article metadata tag for parse.ly
    toJSONLD() {
      let tags = this.get('tags') || [];
      if (this.get('layout')) { tags = tags.concat(this.get('layout')); }
      if (this.get('vertical')) { tags = tags.concat(this.get('vertical').name); }
      if (this.get('tracking_tags')) { tags = tags.concat(this.get('tracking_tags')); }
      return compactObject({
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": this.get('thumbnail_title'),
        "url": this.fullHref(),
        "thumbnailUrl": this.get('thumbnail_image'),
        "datePublished": this.get('published_at'),
        "dateCreated": this.get('published_at'),
        "articleSection": this.getParselySection(),
        "creator": this.getAuthorArray(),
        "keywords": tags
      });
    }

    toJSONLDAmp() {
      return compactObject({
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": this.get('thumbnail_title'),
        "url": this.fullHref(),
        "thumbnailUrl": this.get('thumbnail_image'),
        "datePublished": this.get('published_at'),
        "dateCreated": this.get('published_at'),
        "dateModified": this.get('updated_at'),
        "articleSection": this.getParselySection(),
        "creator": this.getAuthorArray(),
        "keywords": this.get('tags'),
        "mainEntityOfPage": this.fullHref(),
        "author": {
          "name": "Artsy Editorial"
        },
        "publisher": {
          "name": "Artsy",
          "logo": {
            "url": sd.APP_URL + "/images/full_logo.png",
            "height": 103,
            "width": 300
          }
        },
        "image": {
          "url": crop(this.get('thumbnail_image'), {width: 800, height: 600}),
          "width": 800,
          "height": 600
        }
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
