Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Curation = require '../../models/curation.coffee'
markdown = require '../../components/util/markdown'

@eoy = (req, res, next) ->
	new Curation(id: sd.EOY_2016).fetch
		error: res.backboneError
		success: (curation) ->
			res.locals.sd.CURATION = curation
			res.render '../components/eoy/index',
				curation: curation
				markdown: markdown