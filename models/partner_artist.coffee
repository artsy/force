_               = require 'underscore'
Backbone        = require 'backbone'
{ ARTSY_URL }   = require('sharify').data

module.exports = class PartnerArtist extends Backbone.Model

  href: -> "/#{@get('partner').id}/artist/#{@get('artist').id}"
