{ globalClientSetup } = require '../../lib/global_client_setup'
HeaderView = require './header/view.coffee'
FooterView = require './footer/view.coffee'
MarketingSignupModal = require '../marketing_signup_modal/index.coffee'
CurrentUser = require '../../models/current_user.coffee'
FlashMessage = require '../flash/index.coffee'
Cookies = require 'cookies-js'

module.exports = ->
  globalClientSetup()
  checkForAfterSignUpAction()
  checkForPersonalizeFlash()


  new HeaderView el: $('#main-layout-header')
  new FooterView el: $('#main-layout-footer')
  new MarketingSignupModal

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

# TODO: Follow up with Christina about this functionality
checkForPersonalizeFlash = ->
  # Sometime '/personalize/' can exist as a redirect parameter in the URL.
  # This causes the flash message to display at unexpected times.
  # This ensures we check for personalize in the pathname.
  if document.referrer.split('?')[0].match '^/personalize.*'
    new FlashMessage message: 'Thank you for personalizing your profile'
