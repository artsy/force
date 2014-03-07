_              = require 'underscore'
Backbone       = require 'backbone'
{ Image }      = require 'artsy-backbone-mixins'
{ Dimensions } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class AuctionLot extends Backbone.Model
  _.extend @prototype, Dimensions
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  parse: (response) ->
    response.estimate_text = @estimateText(response.estimate_text) if response.estimate_text?
    response

  estimateText: (string) ->
    string.replace /\ -\ /, '&nbsp;&ndash;<br>'

  # Overwrite #imageUrl because we need to replace thumbnail
  imageUrl: (version) ->
    @sslUrl @get('image_url').replace 'thumbnail', version
