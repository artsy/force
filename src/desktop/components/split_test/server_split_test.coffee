SplitTest = require './split_test'

module.exports = class ServerSplitTest extends SplitTest
  constructor: (@req, @res, test) ->
    super test

  set: (outcome) ->
    if !@res.headersSent
      @res.cookie @_key(), outcome, expires: new Date(Date.now() + 31536000000)
    outcome

  get: ->
    @req.cookies[@_key()]

  admin: ->
    @req.user?.isAdmin()
