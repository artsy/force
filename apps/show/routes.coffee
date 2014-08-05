PartnerShow = require '../../models/partner_show'
Profile = require '../../models/profile'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ parse } = require 'url'

render = (res, show, profile=null) ->
  res.locals.sd.SHOW = show.toJSON()
  res.render 'template',
    fair: show.fair()
    location: show.location()
    partner: show.partner()
    show: show
    profile: profile
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

@index = (req, res) ->
  new PartnerShow(id: req.params.id).fetch
    cache: true
    error: res.backboneError
    success: (show) =>
      setReferringContext(req, res, show)

      # Redirect to canonical url
      if show.href() isnt parse(req.originalUrl).pathname and not res.locals.context
        return res.redirect show.href()

      if show.partner().isLinkable()
        profile = new Profile { id: show.get('partner').default_profile_id }
        profile.fetch
          cache: true
          success: (profile) =>
            render res, show, profile
          error: =>
            # profile is private
            render res, show
      else
        render res, show
