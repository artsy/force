Organization = require '../../models/organization'

@index = (req, res, next) ->
  new Organization(id: req.params.id).fetch
    error: -> next()
    success: (organization) ->
      res.locals.sd.ORGANIZTION = organization.toJSON()
      res.render 'index', organization: organization