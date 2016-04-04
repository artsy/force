_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Backbone = require 'backbone'
Q = require 'bluebird-q'
Modules = require '../collections/modules.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

module.exports = class UserHomePage extends Backbone.Model
  initialize: ->
    @modules = new Modules

  fetch: ({ query, variables, currentUser }) ->
    if user = currentUser
      Q.promise (resolve, reject) =>
        metaphysics query: query, variables: variables, req: { user: user }
          .then ({ home_page_modules }) =>
            @modules.reset home_page_modules
            resolve @
          .catch (error) ->
            reject error
