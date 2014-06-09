_ = require 'underscore'
Backbone = require 'backbone'
Fairs = require '../../collections/fairs.coffee'
Partners = require '../../collections/partners.coffee'
Profiles = require '../../collections/profiles.coffee'
PartnerShows = require '../../collections/partner_shows.coffee'
sd = require('sharify').data
Q = require 'q'
querystring = require 'querystring'

@show = (req, res, context) ->
  requests = []

  fairs = new Fairs()
  shows = new PartnerShows()
  partners = new Partners()
  profiles = new Profiles()

  render = _.after 2, ->
    res.render 'show',
      title: "Galleries and Shows near #{context.name}"
      name: context.name
      shows: shows
      profiles: profiles
      fairs: fairs

  requests.push partners.fetch
    cache: true
    data: { near: context.coords.toString(), has_full_profile: true, size: 20 }
    success: ->
      return render() if partners.isEmpty()
      profiles.url = "#{sd.API_URL}/api/v1/profiles"
      profiles.fetch
        cache: true
        data: querystring.stringify({'id[]': partners.pluck('default_profile_id')})
        success: render

  requests.push fairs.fetch
    cache: true
    data: { near: context.coords.toString(), status: 'current' }
    success: -> fairs.reset(fairs.filter (f) -> f.get('organizer')?.profile_id?)

  requests.push shows.fetch
    cache: true
    data:
      near: context.coords.toString()
      published_with_eligible_artworks: true
      status: 'current'
      fair_id: null
      sort: '-publish_at'
      size: 20

  Q.allSettled(requests).then(render).done()
