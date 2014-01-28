Backbone = require 'backbone'
_ = require 'underscore'
Post = require '../models/post.coffee'
{ ARTSY_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Posts extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  model: Post