PartnerShow     = require '../../models/partner_show'
Profile         = require '../../models/profile'

@index = (req, res) ->
  new PartnerShow(id: req.params.id).fetch
    cache  : true
    error  : res.backboneError
    success: (show) ->
      profile = new Profile { id: show.get('partner').default_profile_id }
      profile.fetch
        cache: true
        success: (profile) ->
          res.locals.sd.SHOW = show.toJSON()
          res.render 'template',
            fair    : show.fair()
            location: show.location()
            partner : show.partner()
            show    : show
            profile : profile
