_ = require 'underscore'
Cookies = require 'cookies-js'
{ USER_AGENT } = require('sharify').data
excluded = require './excluded.coffee'

module.exports = class AppBanner
  cookie: 'dismissed-app-banner'

  appUrl: 'artsy://'

  iTunesUrl: ->
    "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"

  template: -> $ """
    <div class='app-banner'>
      <a class='app-banner-close-button'>&times;</a>

      <a href='#{@iTunesUrl()}' class='app-banner-open-area'>
        <div class='app-banner-icon'>
          <i class='icon-logo-unscaled'></i>
        </div>

        <div class='app-banner-description'>
          Download<br>
          Artsy for iPhone™
        </div>

        <div class='app-banner-view-text'>
          View
        </div>
      </a>
    </div>
  """

  constructor: (@$content) ->
    @$el = @template()
    @$content.css marginTop: @height()
    @$el.insertBefore @$content
    @$el

  height: ->
    $clone = @$el.clone()
    $clone.css 'visibility', 'hidden'
    $('body').append $clone
    height = $clone.height()
    $clone.remove()
    height

  launch: ->
    window.location.replace @iTunesUrl()

  remove: ->
    @dismissed()
    @$el.remove()
    @$content.css marginTop: 0

  dismissed: ->
    Cookies.set @cookie, yes, expires: (60 * 60 * 24 * 365)

  @hasDismissed: ->
    Cookies.get(@::cookie)?

  @isEigen: ->
    USER_AGENT?.match('Artsy-Mobile')?

  @shouldDisplay: ->
    USER_AGENT?.match(/iPhone/i)? and
    USER_AGENT?.match(/CriOS/i)? and
    not @hasDismissed() and
    not @isEigen() and
    not excluded.check()
