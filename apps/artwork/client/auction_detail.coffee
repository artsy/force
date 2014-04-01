_               = require 'underscore'
Backbone        = require 'backbone'
accounting      = require 'accounting'
ModalPageView   = require '../../../components/modal/page.coffee'
mediator        = require '../../../lib/mediator.coffee'

template = -> require('../templates/auction_detail.jade') arguments...

module.exports = class AuctionDetailView extends Backbone.View
  template: template

  events:
    'submit form'          : 'submit'
    'click .abf-help-link' : 'displayHelp'

  initialize: (options) ->
    { @user, @auction, @saleArtwork, @bidderPositions } = options

  submit: (e) ->
    e.preventDefault()
    unless @user
      mediator.trigger 'open:auth',
        mode        : 'register'
        copy        : 'Sign up to bid'
        redirectTo  : @auction.redirectUrl @saleArtwork.artwork()
      return false
    else
      @$('button').attr 'data-state', 'loading'
      if (val = @validate @$('input').val())
        window.location = "#{@$('form').attr('action')}?bid=#{val}"
      else
        @displayValidationError()

  displayValidationError: ->
    # I'm not using `$.fn.show` because of https://github.com/tmpvar/jsdom/issues/709
    # will change later
    @$('.abf-validation-error').css('display', 'block')
    @$('button').attr 'data-state', 'error'

  # Check to see if the form value is greater or equal to the minimum next bid
  # and in the process strip the formatting and return the value if it (only if it is valid)
  #
  # @return {Integer or undefined}
  validate: (val) ->
    if (val = accounting.unformat val) >= @saleArtwork.get('minimum_next_bid_cents') / 100
      val

  displayHelp: (e) ->
    e.preventDefault()
    new ModalPageView
      width  : '700px'
      pageId : 'auction-info'

  render: ->
    @$el.html(template
      user            : @user
      auction         : @auction
      saleArtwork     : @saleArtwork
      bidderPositions : @bidderPositions
    ).addClass 'is-fade-in'
    this
