/*

* decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ArticleView;
const Backbone = require('backbone');
const sd = require('sharify').data;
const { Article } = require('../../../models/article');
const { slideshows } = require('./slideshows');

export const ArticleView = (_ArticleView = (function() {
  _ArticleView = class ArticleView extends Backbone.View {
    static initClass() {

      this.prototype.events =
        {'click .article-video-play-button' : 'clickPlay'};
    }

    initialize() {
      this.article = new Article(sd.ARTICLE);
      return new slideshows;
    }

    clickPlay(event) {
      const $cover = $(event.currentTarget).parent();
      const $iframe = $cover.next('.article-section-video').find('iframe');
      const $newIframe = $iframe.clone().attr('src', $iframe.attr('src') + '&autoplay=1');
      $iframe.replaceWith($newIframe);
      return $cover.remove();
    }
  };
  _ArticleView.initClass();
  return _ArticleView;
})());
