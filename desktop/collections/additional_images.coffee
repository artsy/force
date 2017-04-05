_ = require 'underscore'
Backbone = require 'backbone'
AdditionalImage = require '../models/additional_image'

module.exports = class AdditionalImages extends Backbone.Collection
  model: AdditionalImage

  comparator: 'position'

  parse: (response) ->
    # Sometimes default aren't in the first position
    (_.findWhere(response, is_default: true) or _.first(response))?.position = 0
    response

  default: ->
    @findWhere(is_default: true) or @first()

  active: ->
    @findWhere(is_active: true) or @default()

  setActive: (id) ->
    @invoke 'set', is_active: false
    @get(id).set is_active: true
