_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
Sales = require '../../collections/sales.coffee'
Sale = require '../../models/sale.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtworks = require '../../collections/sale_artworks.coffee'
ModalView = require '../modal/view.coffee'
ClockView = require '../clock/view.coffee'
{ API_URL } = require('sharify').data
mediator = require '../../lib/mediator.coffee'
Transition = require '../mixins/transition.coffee'
{ isTouchDevice } = require '../../components/util/device.coffee'
Scrollbar = require '../../lib/scrollbar.coffee'
auctionTemplate = -> require('./template.jade') arguments...
modalTemplate = -> require('./modal_template.jade') arguments...

class AuctionReminderModal extends Backbone.View

  id: 'modal'
  container: '#modal-container'

  template: ->
    'Requires a template'
  modalTemplate: ->
    modalTemplate()

  templateData: {}

  events: ->
    'click.handler .modal-close': 'close'

  initialize: ({ @auction, @auctionImage }) ->
    { @dimensions, @width, @transition, @backdrop } = 
      dimensions: width: '500px'
      transition: 'fade'
      backdrop: false

    @dimensions.width = @width if @width

    _.extend @templateData, autofocus: @autofocus()

    @resize = _.debounce @updatePosition, 100

    @$window = $(window)
    # @$window.on 'keyup', @escape
    @$window.on 'resize', @resize

    # @scrollbar = new Scrollbar $els: $('#main-layout-header')

    mediator.on 'modal:close', @close, this
    mediator.on 'modal:opened', @updatePosition, this

    @open()

  onClickBackdrop: (e) ->
    @close() if $(e.target).hasClass('modal-backdrop')

  __announceCloseButtonClick__: ->
    @trigger 'click:close'

  __announceBackdropClick__: ->
    @trigger 'click:backdrop'

  # escape: (e) ->
  #   return unless e.which is 27

  #   mediator.trigger 'modal:close'

  updatePosition: =>
    @$dialog.css
      top: ((@$el.height() - @$dialog.height()) - 40) + 'px'
      left: ((@$el.width() - @$dialog.width()) - 40) + 'px'

  autofocus: ->
    if isTouchDevice() then undefined else true

  isLoading: ->
    @$el.addClass 'is-loading'
    @$dialog.hide().addClass 'is-notransition'

  isLoaded: ->
    @$el.removeClass 'is-loading'
    @$dialog.show()
    _.defer =>
      @$dialog.removeClass 'is-notransition'

  # Fade out body,
  # re-render the (presumably changed) template,
  # then fade back in and re-center
  reRender: ->
    Transition.fade @$body,
      out: =>
        @$body.html @template(@templateData)
        @trigger 'rerendered'
      in: =>
        @updatePosition()

  setDimensions: (dimensions) ->
    @$dialog.css dimensions or @dimensions

  setup: ->
    backdropClass = if @backdrop then 'has-backdrop' else 'has-nobackdrop'

    @$el.
      addClass("is-#{@transition}-in #{backdropClass}").
      # Render outer
      html @modalTemplate()

    @renderInner()

    # Display
    $(@container).html @$el

    @postRender()

    # # Disable scroll on body
    # @scrollbar.set()

    # Fade in
    _.defer => @$el.attr 'data-state', 'open'

  renderInner: =>
    @$body = @$('.modal-body')
    @$body.html @template(@templateData)
    @$dialog = @$('.modal-dialog')
    @setDimensions()

  postRender: -> #

  open: =>
    @setup()
    mediator.trigger 'modal:opened', { view: this }

    this

  close: (cb) ->
    @$window.off 'keyup', @escape
    @$window.off 'resize', @resize

    mediator.off null, null, this

    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        # Re-enable scrolling
        @scrollbar.reset()

        mediator.trigger 'modal:closed', { view: this }

        @remove()

        cb() if _.isFunction cb
      ).emulateTransitionEnd 250

  postRender: ->
    @isLoading()
    @$('.modal-body').html(auctionTemplate 
      auction: @auction
      auctionImage: @auctionImage
    )
    @setupClock()
    @updatePosition()
    @isLoaded()

  setupClock: ->
    @clock = new AuctionClock
      modelName: 'Auction'
      model: @auction
      el: @$Clock = @$('.auction-reminder-clock')
    @$Clock.addClass 'is-fade-in'
    @clock.start()

class AuctionClock extends ClockView

  UNIT_MAP =
    'hours': 'HRS'
    'minutes': 'MIN'
    'seconds': 'SEC'

  initialize: ({ @closedText, @modelName }) ->
    @closedText ?= 'Online Bidding Closed'

  renderClock: =>
    @model.updateState()
    @$('.clock-value').html _.compact((for unit, label of UNIT_MAP
      diff = moment.duration(@toDate?.diff(moment()))[unit]()
      """
        <li>
          #{if diff < 10 then '0' + diff else diff}
          <small>#{label}</small>
        </li>
      """
    )).join '<li>:</li>'

module.exports = (callBack) ->
  @sales = new Sales
  @sales.fetch
    url: "#{API_URL}/api/v1/sales?is_auction=true&published=true&live=true"
    error: callBack
    success: (sales) =>
      @featuredSale = sales.models[0]
      saleArtworks = new SaleArtworks
      saleArtworks.fetch
        url: "#{API_URL}/api/v1/sale/#{@featuredSale.get('id')}/sale_artworks"
        error: callBack
        success: (artworks) =>
          featuredArtworkId = artworks.models[0].id
          featuredArtwork = new Artwork id: featuredArtworkId
          featuredArtwork.fetch
            error: callBack
            success: (artwork) =>
              @featuredImage = artwork.defaultImageUrl()
              @auctionModal = new AuctionReminderModal(
                auction: @featuredSale
                auctionImage: @featuredImage
              )

