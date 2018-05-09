_ = require 'underscore'
ModalView = require '../../../components/modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ConditionsOfSale = require '../mixins/conditions_of_sale.js'
template = -> require('../templates/accept_conditions_of_sale_modal.jade') arguments...


module.exports = class AcceptConditionsOfSaleModal extends ModalView
  _.extend @prototype, ConditionsOfSale

  className: 'accept-conditions-register'

  template: template

  events: -> _.extend super,
    'click .bid-close-button': 'close'
    'change .registration-form-section__checkbox': 'validateAcceptConditions'
    'click .accept-conditions-register--form .avant-garde-button-black': 'handleRegister'

  initialize: ({ @auction }) ->
    @user = CurrentUser.orNull()
    _.extend @templateData, auction: @auction
    super width: '510px'

  postRender: =>
    @$acceptConditions = @$('#accept_conditions')
    @$conditionsCheckbox = @$('.accept-conditions-register--form .artsy-checkbox')
    @$submit = @$('.accept-conditions-register--form .avant-garde-button-black')

  handleRegister: =>
    if (@validateAcceptConditions())
      url = @auction.registerUrl() + '?accepted-conditions=true'
      window.location.assign(url)

  close: (event) ->
    replaceModalTriggerPath = location.pathname.replace('/registration-flow', '')
    history.replaceState({}, document.title, replaceModalTriggerPath)
    super
