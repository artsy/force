_               = require 'underscore'
Backbone        = require 'backbone'
{ ARTSY_URL }   = require('sharify').data

module.exports = class PartnerArtist extends Backbone.Model

  #url: "#{ARTSY_URL}/api/v1/partner/#{@get('partner').id}/partner_artists"
