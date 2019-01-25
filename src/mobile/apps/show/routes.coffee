sd = require('sharify').data
Q = require 'bluebird-q'
moment = require 'moment'
Show = require '../../models/show.coffee'
Location = require '../../models/location.coffee'


module.exports.index = (req, res, next) ->
  show = new Show id: req.params.id

  Q.all([
    # Fetch the non-nested route (because we don't have the partner) and Gravity 302 redirects
    # to the nested partner show route.
    show.fetch(cache: true)
    show.related().installShots.fetchUntilEndInParallel(cache: true, data: default: false)
  ])
  .then ->
    if show.get 'displayable'
      Q.all([
        # We have to refetch the show to hit the endpoint that's nested under the partner route
        # now that we have the partner.
        # This might return stale data due to some HTTP caching.
        # Don't cache this record because we *also* have to pass some random string to bust it's cache...
        show.fetch cache: false, data: cacheBust: Math.random()
        show.fetchArtworks
          data:
            page: 1
            size: 100
          error: res.backboneError
          success: (artworks) ->
            res.locals.sd.ARTWORKS = artworks
      ])
    else
      Q.promise.reject()

  .then ->

    show.rebuild()

    res.locals.sd.SHOW = show
    res.locals.sd.INSTALL_SHOTS = show.related().installShots

    res.render 'index',
      show: show
      fair: show.related().fair
      location: show.location()
      installShots: show.related().installShots
      artworks: res.locals.sd.ARTWORKS

  .catch ->
    err = new Error 'Not Found'
    err.status = 404
    next err

  .done()

module.exports.hours = (req, res, next) ->
  show = new Show id: req.params.id

  show.fetch
    error: res.backboneError
    success: ->
      # We have to refetch the show to hit the endpoint that's nested under the partner route
      # now that we have the partner.
      # This might return stale data due to some HTTP caching.
      # Don't cache this record because we *also* have to pass some random string to bust it's cache...
      show.fetch
        cache: false
        data: cacheBust: Math.random()
        error: res.backboneError
        success: ->
          res.locals.sd.SHOW = show
          res.render 'hours',
            show: show
            location: show.location()
