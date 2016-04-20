Backbone = require 'backbone'
ArticleView = require '../../../../components/article/view.coffee'
template = -> require('../../../../components/article/templates/index.jade') arguments...
sd = require('sharify').data

module.exports = class BiographyView extends Backbone.View

  initialize: ->
    @model.related().articles.fetch
      cache: true
      data:
        limit: 1
        biography_for_artist_id: @model.get('_id')
      success: (@articles) => @render()

  render: ->
    unless @articles?.length
      @$el.html "<div class='loading-spinner'></div>"
      return this
    @$el.html template article: @articles.first()
    new ArticleView el: @$el, article: @articles.first()
    this
