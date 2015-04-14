Q = require 'q'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
PartnerShow = require '../../models/partner_show'

err = ->
  err = new Error 'Not Found'
  err.status = 404
  err

@index = (req, res, next) ->
  show = new PartnerShow id: req.params.id

  Q.all([
    show.fetch(cache: true)
    show.related().installShots.fetchUntilEndInParallel(cache: true, data: default: false)
  ]).then ->
    unless show.get 'displayable'
      return next err()

    show.rebuild()

    show.related().artworks.fetchUntilEndInParallel(cache: true).finally ->

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

  , ->
    next err()
