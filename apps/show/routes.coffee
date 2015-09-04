Q = require 'bluebird-q'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
PartnerShow = require '../../models/partner_show'

@index = (req, res, next) ->
  show = new PartnerShow id: req.params.id

  Q.all [
    # Fetch the non-nested route (because we don't have the partner) and Gravity 302 redirects
    # to the nested partner show route.
    show.fetch(cache: true)
    show.related().installShots.fetchUntilEndInParallel(cache: true, data: default: false)
  ]

  .then ->
    if show.get 'displayable'
      Q.all([
        # We have to refetch the show to hit the endpoint that's nested under the partner route
        # now that we have the partner.
        # This might return stale data due to some HTTP caching.
        # Don't cache this record because we *also* have to pass some random string to bust it's cache...
        show.fetch cache: false, data: cacheBust: Math.random()
        show.related().artworks.fetchUntilEndInParallel cache: true
      ])
    else
      Q.promise.reject()
  .then ->
    return unless show.has('fair')
    show.related().fair.related().profile.fetch
      cache: true
      error: ->
        show.related().fair.set published: false
  .finally ->
    res.locals.sd.SHOW = show.toJSON()
    res.locals.sd.ARTWORKS = show.related().artworks.toJSON()

    res.render 'index',
      show: show
      location: show.location()
      fair: show.related().fair
      partner: show.related().partner
      installShots: show.related().installShots
      artworks: show.related().artworks
      jsonLD: stringifyJSONForWeb show.toJSONLD()

  .catch ->
    err = new Error 'Not Found'
    err.status = 404
    next err

  .done()
