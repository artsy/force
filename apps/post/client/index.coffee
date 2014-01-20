_                       = require 'underscore'
Backbone                = require 'backbone'
Post                    = require '../../../models/post.coffee'
sd                      = require('sharify').data

module.exports.PostView = class PostView extends Backbone.View

  initialize: (options) ->

module.exports.init = ->
  new PostView
    model: new Post sd.POST
    el   : $('body')
