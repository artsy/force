_                   = require 'underscore'
sd                  = require('sharify').data
Backbone            = require 'backbone'
AcquireArtwork      = require('../../acquire/view.coffee').acquireArtwork
ContactPartnerView  = require '../../contact/contact_partner.coffee'
SaveControls        = require '../../artwork_item/views/save_controls.coffee'
mediator            = require '../../../lib/mediator.coffee'

module.exports = class SaleArtworkView extends Backbone.View
  analyticsRemoveMessage : 'Removed artwork from collection, via sale'
  analyticsSaveMessage   : 'Added artwork to collection, via sale'

  events:
    'click .artwork-item-buy'            : 'acquire'
    'click .artwork-item-contact-seller' : 'contactSeller'
    'click .artwork-item-bid'            : 'bid'

  initialize: (options = {}) ->
    { @currentUser, @sale, @artworkCollection } = options

    saveView = new SaveControls
      artworkCollection : @artworkCollection
      el                : @$el
      model             : @model

    saveView.analyticsRemoveMessage   = @analyticsRemoveMessage
    saveView.analyticsSaveMessage     = @analyticsSaveMessage

    if @sale
      if @sale.has 'auctionState'
        @setBidButtonState()
      else
        @listenTo @sale, 'change:auctionState', @setBidButtonState

  contactSeller: (e) ->
    e.preventDefault()
    new ContactPartnerView
      artwork : @model
      partner : @model.get 'partner'

  acquire: (e) ->
    e.preventDefault()
    # Redirect to artwork page if artwork has multiple editions
    if @model.get 'edition_sets_count' > 1
      return window.location.href = @model.href()
    AcquireArtwork @model, $(e.target)

  bid: (e) ->
    unless @currentUser
      e.preventDefault()
      mediator.trigger 'open:auth',
        mode        : 'register'
        copy        : 'Sign up to bid'
        destination : @model.href()

  setBidButtonState: ->
    $button   = @$('.artwork-item-bid')
    state     = @sale.bidButtonState @currentUser, @model
    $button.
      text(state.label).
      addClass(state.classes).
      attr href: state.href, disabled: !state.enabled
