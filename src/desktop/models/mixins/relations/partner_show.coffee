{ API_URL, POSITRON_URL } = require('sharify').data

module.exports =
  related: ->
    return @__related__ if @__related__?

    @on 'sync', @rebuild

    { Articles } = require '../../../collections/articles'
    { Artworks } = require '../../../collections/artworks'
    { Artists } = require '../../../collections/artists'
    { InstallShots } = require '../../../collections/install_shots'
    { PartnerShowEvents } = require '../../../collections/partner_show_events'
    Partner = require '../../partner.coffee'
    Fair = require '../../fair.coffee'
    Profile = require '../../profile.coffee'

    artworks = new Artworks
    artworks.url = => "#{@url()}/artworks?published=true"

    artists = new Artists @get('artists')

    articles = new Articles
    articles.url = "#{POSITRON_URL}/api/articles?show_id=#{@get '_id'}&published=true"

    installShots = new InstallShots
    installShots.url = "#{API_URL}/api/v1/partner_show/#{@id}/images"

    partner = new Partner @get('partner')

    fair = new Fair @get('fair')

    profile = new Profile id: partner.get('default_profile_id')

    showEvents = new PartnerShowEvents @get('events')

    @__related__ =
      artworks: artworks
      artists: artists
      articles: articles
      installShots: installShots
      partner: partner
      fair: fair
      profile: profile
      showEvents: showEvents

  rebuild: ->
    { artists, partner, fair, profile, showEvents } = @related()
    artists.reset @get('artists'), silent: true
    partner.set @get('partner'), silent: true
    fair.set @get('fair'), silent: true
    profile.set 'id', partner.get('default_profile_id'), silent: true
    showEvents.reset @get('events'), silent: true
