PartnerShow = require '../../models/partner_show'
Profile = require '../../models/profile'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ parse } = require 'url'
{ API_URL } = require('sharify').data
Q = require 'q'
InstallShots = require '../../collections/install_shots'

render = (res, show, installShots, profile = null) ->
  res.locals.sd.SHOW = show.toJSON()
  res.render 'template',
    fair: show.fair()
    location: show.location()
    partner: show.partner()
    show: show
    profile: profile
    installShots: installShots
    jsonLD: stringifyJSONForWeb(show.toJSONLD())

setReferringContext = (req, res, show) ->
  return unless req.get 'referrer'
  path = parse(req.get 'referrer').pathname
  res.locals.context = (
    if show.has('fair') and path.match show.get('fair')?.organizer?.profile_id
      'fair'
    else if path.match show.get('partner')?.default_profile_id
      'partner'
    else if path is '/'
      'home'
    else
      ''
  )

@index = (req, res, next) ->
  show = new PartnerShow(id: req.params.id)

  installShots = new InstallShots
  installShots.url = "#{API_URL}/api/v1/partner_show/#{show.id}/images"

  Q.allSettled([
    show.fetch(cache: true)
    installShots.fetchUntilEndInParallel(cache: true, data: default: false)
  ]).spread((showRequest, installShotsRequest) ->

    if showRequest.state is 'rejected'
      res.backboneError(show, showRequest.reason)
    else

      # Proceed as normal...
      setReferringContext(req, res, show)

      # 404 if show isn't displayable
      if !show.get('displayable')
        err = new Error('Not Found')
        err.status = 404
        return next err

      # Redirect to canonical url
      if show.href() isnt parse(req.originalUrl).pathname and not res.locals.context
        return res.redirect show.href()

      if show.partner().isLinkable()
        profile = new Profile { id: show.get('partner').default_profile_id }
        profile.fetch
          cache: true
          success: (profile) =>
            render res, show, installShots, profile
          error: =>
            # profile is private
            render res, show, installShots
      else
        render res, show, installShots
  ).done()
