Backbone = require 'backbone'
Post = require('../models/post.coffee')

module.exports = class Posts extends Backbone.Collection
  model: Post
