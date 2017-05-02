AuthModalView = require '../../../../../components/auth_modal/view.coffee'
{ templateMap } = require '../../../../../components/auth_modal/maps.coffee'
mediator = require '../../../../../lib/mediator.coffee'

templateMap['phone_number'] = -> require('../templates/phone_number.jade') arguments...

module.exports = class InquireViaPhoneModalView extends AuthModalView
  template: ->
    templateToRender = if sd.CURRENT_USER then 'phone_number' else @state.get('mode')
    templateMap[templateToRender] arguments...

  onSubmitSuccess: (model, response, options) =>
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
