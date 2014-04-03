Backbone        = require 'backbone'
AdditionalImage = require '../models/additional_image.coffee'

module.exports = class AdditionalImages extends Backbone.Collection

  model: AdditionalImage

  comparator: 'position'
