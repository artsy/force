_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
{ crop, resize } = require '../resizer/index.coffee'

module.exports = class Item extends Backbone.Model
  imgAttr: 'image_url'

  resizeUrlFor: (attr, args...) ->
    resize @get(attr or @imgAttr), args...

  cropUrlFor: (attr, args...) ->
    crop @get(attr or @imgAttr), args...

  date: (attr) ->
    moment @get(attr)
