_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data

module.exports.PostsView = class PostsView extends Backbone.View

  initialize: (options) ->

module.exports.init = ->
  new PostsView
    el: $('body')
