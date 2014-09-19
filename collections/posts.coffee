_ = require 'underscore'
Backbone = require 'backbone'
Post = require('../models/post.coffee')

module.exports = class Posts extends Backbone.Collection
  model: Post

  parse: (response) ->
    _.filter response, (obj) ->
      post = new Post obj
      post.defaultImage()?.imageUrlForMaxSize?()
