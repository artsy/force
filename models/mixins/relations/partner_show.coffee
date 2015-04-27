{ API_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artworks = require '../../../collections/artworks.coffee'
    Artists = require '../../../collections/artists.coffee'
    InstallShots = require '../../../collections/install_shots.coffee'
    Partner = require '../../partner.coffee'
    Fair = require '../../fair.coffee'
    Profile = require '../../profile.coffee'

    artworks = new Artworks
    artworks.url = => "#{@url()}/artworks?published=true"

    artists = new Artists @get('artists')

    installShots = new InstallShots
    installShots.url = "#{API_URL}/api/v1/partner_show/#{@id}/images"


    partner = new Partner @get('partner')

    fair = new Fair @get('fair')

    profile = new Profile id: partner.get('default_profile_id')



    @__related__ =
      artworks: artworks
      artists: artists
      installShots: installShots
      relatedImages: new Backbone.Collection
      partner: partner
      fair: fair
      profile: profile

  rebuild: ->
    { artists, partner, fair, profile } = @related()
    artists.reset @get('artists'), silent: true
    partner.set @get('partner'), silent: true
    fair.set @get('fair'), silent: true
    profile.set 'id', partner.get('default_profile_id'), silent: true
