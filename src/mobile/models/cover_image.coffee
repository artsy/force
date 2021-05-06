_ = require 'underscore'
Backbone = require 'backbone'
{ Image } = require '@artsy/backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data
{ resize } = require '../../v2/Utils/resizer'

module.exports = class CoverImage extends Backbone.Model
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  optimizedImageUrl: (size) ->
    "#{resize(this.imageUrl(size), { width: 1000, height: 708, quality: 50 })}"
