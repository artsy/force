Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Article = require '../../../models/article'
SlideshowsView = require './slideshows'

module.exports = class ArticleView extends Backbone.View

  events:
    'click .article-video-play-button' : 'clickPlay'

  initialize: ->
    @article = new Article sd.ARTICLE
    new SlideshowsView

  clickPlay: (event) ->
    $cover = $(event.currentTarget).parent()
    $iframe = $cover.next('.article-section-video').find('iframe')
    $newIframe = $iframe.clone().attr('src', $iframe.attr('src') + '&autoplay=1')
    $iframe.replaceWith $newIframe
    $cover.remove()
