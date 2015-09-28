Partners = require '../../collections/partners'
Profile = require '../../models/profile'
PartnerCellGrid = require './components/partner_cell_grid/view'

@galleries = (req, res, next) ->
  partners = new Partners()
  partners.fetch error: res.backboneError, success: ->
    res.locals.sd.PARTNERS = partners.toJSON()
    res.render 'index', sets: [{title: 'Title 1', partners: partners.models}, {title: 'Title 2', partners: partners.models}, {title: 'Title 3', partners: partners.models}]
    
