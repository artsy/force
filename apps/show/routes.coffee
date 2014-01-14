AdditionalImage = require '../../models/additional_image'
PartnerShow     = require '../../models/partner_show'
Profile         = require '../../models/profile'

@index = (req, res) ->
  new PartnerShow(id: req.params.id).fetch
    cache  : true
    error  : res.backboneError
    success: (show) ->
      show.fetchArtworks
        success: (artworks) ->
          show.fetchInstallShots
            success: (installShots) ->
              profile = new Profile { id: show.get('partner').default_profile_id }
              profile.fetch
                cache: true
                success: (profile) ->
                  res.locals.sd.SHOW = show.toJSON()
                  res.locals.sd.ARTWORKS = artworks
                  res.locals.sd.INSTALL_SHOTS = installShots
                  res.render 'template',
                    artworkColumns  : artworks.groupByColumnsInOrder 3
                    carouselFigures : installShots.models
                    fair            : show.fair()
                    location        : show.location()
                    partner         : show.partner()
                    show            : show
                    profile         : profile
