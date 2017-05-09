AuthModalView = require '../../../../components/auth_modal/view.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
{ templateMap } = require '../../../../components/auth_modal/maps.coffee'
mediator = require '../../../../lib/mediator.coffee'

templateMap['phone_number'] = -> require('./templates/phone_number.jade') arguments...

module.exports = class InquireViaPhoneModalView extends AuthModalView
  initialize: (options) ->
    super
    { @artistIds } = options
    mediator.on 'modal:closed', @refreshPageIfLoggedIn
    mediator.on 'auth:sign_up:success', @followArtists

  template: ->
    templateToRender = if sd.CURRENT_USER then 'phone_number' else @state.get('mode')
    templateMap[templateToRender] arguments...

  refreshPageIfLoggedIn: =>
    if @loggedIn
      location.reload()

  followArtists: =>
    following = new Following(null, kind: 'artist')

    for artistId in @artistIds
      following.follow artistId

  onSubmitSuccess: (model, response, options) =>
    @loggedIn = true

    analyticsHooks.trigger "auth:#{@state.get 'mode'}"
    @reenableForm null, reset: false

    if response.error?
      mediator.trigger 'auth:error', _s.capitalize response.error
    else
      Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination

      switch @state.get('mode')
        when 'login'
          Cookies.set('signed_in', true, expires: 60 * 60 * 24 * 7)
        when 'register'
          mediator.trigger 'auth:sign_up:success'
        when 'forgot'
          mediator.trigger 'auth:change:mode', 'reset'

      @state.set 'mode', 'phone_number'
