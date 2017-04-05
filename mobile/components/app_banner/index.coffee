AppBanner = require './app_banner'

module.exports = ->
  return unless AppBanner.shouldDisplay()

  banner = new AppBanner $('#content')
  $el = banner.$el

  $el.find('.app-banner-close-button').on 'click', (e) ->
    e.preventDefault()
    banner.remove()

  $el.find('.app-banner-open-area').on 'click', (e) ->
    e.preventDefault()
    banner.launch()
