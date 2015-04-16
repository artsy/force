_ = require 'underscore'
{ Markdown, Image } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data
Sale = require './sale.coffee'
ImageSizes = require './mixins/image_sizes.coffee'

module.exports = class Auction extends Sale
  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes

  href: ->
    "/auction/#{@id}"

  registrationSuccessUrl: ->
    "#{@href()}/confirm-registration"

  buyersPremiumUrl: ->
    "#{@href()}/buyers-premium"
