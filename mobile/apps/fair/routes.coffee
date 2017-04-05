_ = require 'underscore'
sd = require('sharify').data
Artist = require '../../models/artist'
Artists = require '../../collections/artists'
Article = require '../../models/article'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'
FairEntries = require '../../collections/fair_entries'
Profile = require '../../models/profile'
Profiles = require '../../collections/profiles'
PartnerLocation = require '../../models/partner_location'
ShowsFeed = require '../../collections/shows_feed'
SearchResults = require '../../collections/search_results'
moment = require 'moment'
querystring = require 'querystring'
embed = require 'embed-video'
{ resize } = require '../../components/resizer/index'
{ stringifyJSONForWeb } = require '../../components/util/json'

fairFromProfile = (req) ->
  if req.profile?.isFair()
    new Fair(id: req.profile.fairOwnerId())
  else
    false

module.exports.mainPage = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      res.locals.sd.FAIR = fair.toJSON()
      res.render 'main_page',
        fair: fair
        profile: req.profile
    error: res.backboneError

module.exports.exhibitorsAtoZ = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      fair.fetchPartners
        cache: true
        success: (partners) =>
          res.render 'a_to_z',
            fair: fair
            profile: req.profile
            groups: partners.groupByAlpha()
            title: "All Exhibitors"
            displayToggle: true
            setToggle: 'a-z'
        error: res.backboneError
    error: res.backboneError

module.exports.artistsAtoZ = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      fair.fetchArtists
        cache: true
        success: (artists) =>
          res.render 'a_to_z',
            fair: fair
            profile: req.profile
            groups: artists.groupByAlpha()
            title: "Artists"
            displayToggle: false
        error: res.backboneError
    error: res.backboneError

module.exports.sections = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      fair.fetchSections
        cache: true
        success: (sections) =>
          res.render 'sections',
            fair: fair
            profile: req.profile
            sections: sections.models
        error: res.backboneError
    error: res.backboneError

module.exports.articles = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      res.render 'articles',
        fair: fair
        profile: req.profile
    error: res.backboneError

module.exports.article = (req, res, next) ->
  article = new Article id: req.params.slug
  article.fetch
    cache: true
    error: (article, err) ->
      if (err.status is 404 or err.status is 401) then next() else res.backboneError(err, next)
    success: =>
      return next() unless article.isFairArticle()
      article.fetchRelated
        success: (data) ->
          res.locals.sd.ARTICLE = article
          res.locals.sd.RELATED_ARTICLES = data.relatedArticles?.toJSON()
          res.locals.sd.INFINITE_SCROLL = false
          res.render 'article',
            article: article
            footerArticles: data.footerArticles if data.footerArticles
            relatedArticles: data.article.relatedArticles
            calloutArticles: data.article.calloutArticles
            embed: embed
            resize: resize
            jsonLD: stringifyJSONForWeb(article.toJSONLD())
            videoOptions: { query: { title: 0, portrait: 0, badge: 0, byline: 0, showinfo: 0, rel: 0, controls: 2, modestbranding: 1, iv_load_policy: 3, color: "E5E5E5" } }

module.exports.search = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  return res.redirect("/#{fair.get('id')}") unless term = req.query?.term
  fairSearch = new SearchResults
  artsySearch = new SearchResults
  success = _.after 2, ->
    res.render 'search_results',
      term: term
      fairResults: fairSearch.models
      results: artsySearch.models
      fair: fair
      profile: req.profile

  fair.fetch
    cache: true
    error: res.backboneError
    success: ->
      fairSearch.fetch
        data:
          term: term
          fair_id: fair.get('id')
        cache: true
        success: (results) ->
          fairSearch.updateLocationsForFair(fair)
          success()
        error: res.backboneError

      artsySearch.fetch
        data:
          term: term
        cache: true
        success: ->
          success()
        error: res.backboneError

module.exports.exhibitors = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    error: res.backboneError
    success: (fair) ->
      options = { data: { sort: '-featured' } }
      options.success = (shows) ->
        res.locals.sd.FAIR = fair.toJSON()
        res.locals.sd.SHOWS = shows.toJSON()
        res.locals.sd.SHOW_PARAMS = options.data
        res.locals.sd.NEXT_CURSOR = shows.nextCursor
        res.render 'exhibitors_page',
          title: if req.params.section
                   "Exhibitors at #{req.params.section}"
                 else if req.params.artistId
                   shows.first()?.artworks().first()?.get('artist')?.name
                 else
                   'All Exhibitors'
          scrolling: shows.length > 1 and not req.params.artistId
          shows: shows
          fair: fair
          showParams: options.data
          displayToggle: (!options.data.section && !options.data.artist && !options.data.partner)
          setToggle: 'grid'
      options.error = res.backboneError
      options.data.partner = req.params.partnerId if req.params.partnerId
      options.data.section = req.params.section if req.params.section
      options.data.artist = req.params.artistId if req.params.artistId
      fair.fetchShows(options)

module.exports.artworks = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  params = req.query

  fair.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.sd.FAIR = fair
      res.locals.sd.PARAMS = params
      res.render 'artworks',
        fair: fair

module.exports.artist = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  artist = new Artist { id: req.params.artistId }
  shows = new ShowsFeed []

  render = _.after 3, ->
    res.locals.sd.FAIR = fair.toJSON()
    res.locals.sd.PROFILE = req.profile.toJSON()
    res.locals.sd.ARTIST = artist.toJSON()
    res.render 'artist',
      artist: artist
      fair: fair
      shows: shows

  shows.fetch
    url: "#{fair.url()}/shows"
    cache: true
    data:
      artist: artist.get 'id'
      artworks: true
      size: 3
      sort: '-featured'
      private_partner: false
    success: render

  artist.fetch
    cache: true
    success: render
    error: res.backboneError

  fair.fetch
    cache: true
    success: render
    error: res.backboneError

module.exports.info = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      location = new PartnerLocation fair.get('location')
      res.render 'info',
        fair: fair
        location: location
    error: res.backboneError

module.exports.forYou = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    cache: true
    success: ->
      res.locals.sd.FAIR = fair.toJSON()
      res.locals.sd.PROFILE = req.profile.toJSON()
      res.render 'for_you', fair: fair
    error: res.backboneError

module.exports.trending = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    success: ->
      res.locals.sd.FAIR = fair
      res.locals.sd.PROFILE = req.profile
      res.render 'trending',
        fair: fair
    error: res.backboneError

module.exports.feed = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fair.fetch
    success: ->
      res.locals.sd.FAIR = fair
      res.locals.sd.PROFILE = req.profile
      res.render 'feed',
        fair: fair
    error: res.backboneError

module.exports.programming = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  fairEvents = new FairEvents [], { fairId: fair.id}
  fairEvents.fetchUntilEnd
    url: "#{sd.API_URL}/api/v1/fair/#{fair.get('id')}/fair_events"
    success: ->
      fair.set fairEvents.first().get('fair')
      eventsByDay = fairEvents.groupByDay()
      dates = _.keys(eventsByDay).sort()
      root = "#{req.params.profileId}/programming"
      res.locals.sd.DATES = dates
      res.render 'programming/index',
        days: fairEvents.getEventDays dates
        eventsByDay: eventsByDay
        fair: fair
        profileId: req.params.profileId

module.exports.programmingEvent = (req, res, next) ->
  return next() unless fair = fairFromProfile(req)
  event = new FairEvent
    id: req.params.eventId
    fair: fair
    profileId: req.params.profileId
  event.fetch
    success: ->
      res.render 'programming/event',
        event: event
    error: res.backboneError

module.exports.showRedirect = (req, res, next) ->
  fair = fairFromProfile req
  fair.fetchShowForPartner req.params.partnerId,
    cache: true
    success: (show) ->
      res.redirect "/show/#{show.id}"
    error: res.backboneError
