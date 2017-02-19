Backbone = require 'backbone'
Image = require '../models/image.coffee'

module.exports = class Images extends Backbone.Collection

  model: Image
