_           = require 'underscore'
Backbone    = require 'backbone'
Image       = require './mixins/image.coffee'
Dimensions  = require '../models/mixins/dimensions.coffee'

module.exports = class AuctionLot extends Backbone.Model
  _.extend @prototype, Dimensions
  _.extend @prototype, Image

  parse: (response) ->
    response.estimate_text = @estimateText(response.estimate_text) if response.estimate_text?
    response

  estimateText: (string) ->
    string.replace /\ -\ /, '&nbsp;&ndash;<br>'

  imageUrl: (version) ->
    @fullyQualifiedImageUrl(@get('image_url')).replace 'thumbnail', version
