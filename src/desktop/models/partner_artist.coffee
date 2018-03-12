_ = require 'underscore'
Backbone = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
{ API_URL } = require('sharify').data
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class PartnerArtist extends Backbone.Model

  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  href: -> "/#{@get('partner').default_profile_id}/artist/#{@get('artist').id}"
