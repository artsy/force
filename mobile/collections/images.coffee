Backbone = require 'backbone'
Image = require '../models/image'

module.exports = class Images extends Backbone.Collection

  model: Image
