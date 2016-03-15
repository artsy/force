CTABarView = require '../../../components/cta_bar/view.coffee'
registered = false

module.exports = (auction, user) ->

  attachCTA = ->
    ctaBarView = new CTABarView
      name: 'auction_register_cta'
      headline: 'Register to bid in Artsy Auctions'
      linkCopy: 'Register to bid'
      linkHref: "/auction-registration/#{auction.get('id')}"
      modalOptions:
        copy: 'Register to bid in Artsy Auctions'
        destination: "/auction-registration/#{auction.get('id')}"
    $('body').append ctaBarView.render().$el
    $('.auction-header').waypoint(
      (direction) -> ctaBarView.transitionIn() if direction is 'down'
      { offset: '-50%' }
    )

  if user
    user.checkRegisteredForAuction
      saleId: auction.get('id')
      success: (isRegistered) -> registered = isRegistered
      complete: -> attachCTA() unless registered or auction.isClosed()
  else
    attachCTA()
