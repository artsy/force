{ POSITRON_URL, API_URL } = require('sharify').data

module.exports   =
  related: ->
    return @__related__ if @__related__?

    { Articles } = require '../../../collections/articles'
    { Artists } = require '../../../collections/artists'
    { ShowEvents } = require '../../../collections/show_events'
    { InstallShots } = require '../../../collections/install_shots'
    Fair = require '../../fair.coffee'

    articles = new Articles
    articles.url = "#{POSITRON_URL}/api/articles?show_id=#{@get '_id'}&published=true"

    artists = new Artists @get('artists')

    showEvents = new ShowEvents @get('events')

    installShots = new InstallShots
    installShots.url = "#{API_URL}/api/v1/partner_show/#{@id}/images"

    fair = new Fair @get('fair')

    @__related__ =
      articles: articles
      artists: artists
      showEvents: showEvents
      installShots: installShots
      fair: fair

  rebuild: ->
    { showEvents, artists, fair } = @related()
    showEvents.reset @get('events'), silent: true
    artists.reset @get('artists'), silent: true
    fair.set @get('fair'), silent: true
