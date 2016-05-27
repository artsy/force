{ Router } = require 'backbone'
User = require '../../../models/user.coffee'
ProfessionalBuyerIndexView = require './views/index.coffee'
ProfessionalBuyerCompleteView = require './views/complete.coffee'

module.exports = class ProfessionalBuyerRouter extends Router
  routes:
    'professional-buyer': 'index'
    'professional-buyer/complete': 'complete'

  initialize: ->
    @user = User.instantiate()

  index: ->
    new ProfessionalBuyerIndexView el: $('.js-probuyer-index-view')

  complete: ->
    view = new ProfessionalBuyerCompleteView user: @user
    $('.js-probuyer-complete-view')
      .html view.render().$el
