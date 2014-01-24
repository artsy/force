PartnerShow     = require '../../models/partner_show'
Profile         = require '../../models/profile'

render = (res, show, profile=null) ->
  res.locals.sd.SHOW = show.toJSON()
  res.render 'template',
    fair    : show.fair()
    location: show.location()
    partner : show.partner()
    show    : show
    profile : profile

@index = (req, res) ->
  new PartnerShow(id: req.params.id).fetch
    cache  : true
    error  : res.backboneError
    success: (show) =>
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
