Partners = require '../../collections/partners'
Profile = require '../../models/profile'

@galleries = (req, res, next) ->
  partners = new Partners()
  partners.fetch error: res.backboneError, success: ->
    res.locals.sd.PARTNERS = partners.toJSON()
    res.render 'index', partners: partners.models

