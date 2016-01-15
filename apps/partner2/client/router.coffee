Backbone = require 'backbone'
PartnerView = require './view.coffee'
_ = require 'underscore'
sd = require('sharify').data
mediator = require '../../../lib/mediator.coffee'

module.exports = class PartnerRouter extends Backbone.Router
  routes:
                                      #   gallery | institution
    ':id': 'index'                    #      x         x
    ':id/overview': 'overview'        #      x         x
    ':id/shows': 'shows'              #      x         x

  initialize: ({ @profile, @partner }) ->
    @baseView = new PartnerView el: $('#partner'), profile: @profile, partner: @partner, currentSection: sd.SECTION
    mediator.on 'change:route', (route) =>
      @navigate "#{@partner.href()}/#{route}", trigger: true, replace: true

  index: ->
    section = 'overview' # default section
    @baseView.renderSection section

  overview: ->
    @baseView.renderSection 'overview'

  shows: ->
    @baseView.renderSection 'shows'
