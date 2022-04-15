{ deprecatedGlobalClientSetup } = require '../../lib/deprecated_global_client_setup'
CurrentUser = require '../../models/current_user'
FlashMessage = require '../flash/index.coffee'
Cookies = require 'cookies-js'
{ Intent } = require "@artsy/cohesion"

module.exports = ->
  deprecatedGlobalClientSetup()
  checkForAfterSignUpAction()

checkForAfterSignUpAction = ->
  currentUser = CurrentUser.orNull()
  afterSignUpAction = Cookies.get 'afterSignUpAction'

  if afterSignUpAction
    return unless @currentUser

    { action, objectId, kind } = JSON.parse(afterSignUpAction)

    operations =
      save: (currentUser, objectId, kind) ->
        currentUser.initializeDefaultArtworkCollection()
        currentUser.defaultArtworkCollection().saveArtwork objectId

      follow: (currentUser, objectId, kind) ->
        kind? and currentUser.follow(objectId, kind)

    ops = operations[action]
    ops and ops(@currentUser, objectId, kind)

    Cookies.expire 'afterSignUpAction'
