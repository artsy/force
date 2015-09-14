Partner = require '../../models/partner'

@galleries = (req, res, next) ->
  partner = new Partner(id: 'gagosian-gallery')
  partner.fetch error: res.backboneError, success: ->
    res.locals.sd.PARTNER = partner.toJSON()
    res.render 'index', partner: partner
