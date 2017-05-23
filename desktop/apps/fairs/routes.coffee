{ NODE_ENV } = require '../../config'
_ = require 'underscore'
metaphysics = require '../../../lib/metaphysics'
ViewHelpers = require './helpers/view_helpers.coffee'
query = require './query.coffee'

@index = (req, res, next) ->
  metaphysics 
    variables: page: 1
    query: query
  .then (data) ->
    { currentFairs, pastFairs, upcomingFairs } = ViewHelpers.parseGroups(data.fairs)
    allFairs = _.flatten [currentFairs, pastFairs, upcomingFairs]    
    res.locals.sd.FAIRS = data.fairs
    res.render 'index',
      featuredFairs: data.featured_fairs[0].fairs
      currentFairRows: ViewHelpers.currentRows(data.fairs)
      upcomingFairs: upcomingFairs
      pastFairs: pastFairs
      ViewHelpers: ViewHelpers
  .catch next
