AppBanner = require '../app_banner/app_banner.coffee'
{ USER_AGENT, APP_BANNER_MODAL } = require('sharify').data

class ArtistAppBanner extends AppBanner
    template: ->
      $ require('./index.jade') { modal: APP_BANNER_MODAL }

    @shouldDisplay: ->
      USER_AGENT?.match(/iPhone/i)? and
      not @hasDismissed() and
      not @isEigen()

module.exports = ->
  return unless ArtistAppBanner.shouldDisplay()

  banner = new ArtistAppBanner $('#content')
  $el = banner.$el

  loginClass = '.login-signup'
  $(loginClass).hide()

  $el.find('.artist-app-banner-close-button').on 'click', (e) ->
    e.preventDefault()
    $(loginClass).show()
    banner.remove()