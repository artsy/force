_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Post = require '../../models/post.coffee'
AddToPostButton = require './add_to_post_button.coffee'
{ crop } = require '../resizer/index.coffee'

templates =
  empty: -> require('./templates/empty.jade') arguments...
  list: -> require('./templates/list.jade') arguments...
  grid: -> require('./templates/grid.jade') arguments...
  extended: -> require('./templates/extended.jade') arguments...
  vertical: -> require('./templates/vertical.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View
  events:
    'click .related-posts-show-all': 'showAll'

  initialize: (options = {}) ->
    { @model, @numToShow, @modelName, @mode, @canBeEmpty } = _.defaults(options, mode: 'list', canBeEmpty: true)

    throw new Error('Model must implement #fetchRelatedPosts') unless _.isFunction @model.fetchRelatedPosts
    throw new Error('Requires @modelName') unless @modelName

    @model.fetchRelatedPosts()
    @listenTo @model.relatedPosts, 'sync', @render

    @addToPostButton = new AddToPostButton
      el: @el
      modelName: @modelName
      model: @model

  render: ->
    templateData =
      model: @model
      modelName: @modelName
      mode: @mode
      entityName: @entityName()
      crop: crop

    if @model.relatedPosts.length
      @$el.show().html templates[@mode] _.extend templateData,
        posts: @model.relatedPosts.first @numToShow
        remaining: Math.max (@model.relatedPosts.length - @numToShow), 0
    else
      if @canBeEmpty
        @$el.html templates.empty templateData
      else
        return @remove()

    _.defer =>
      @$el.addClass 'is-fade-in'
      if not @__rendered__
        @$('.related-posts').addClass 'is-fade-in'
        @__rendered__ = true
      else
        @$('.related-posts').addClass 'is-rendered'

  entityName: ->
    @model.get('name') or "this #{@modelName}"

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @model.relatedPosts.length
    @render()
