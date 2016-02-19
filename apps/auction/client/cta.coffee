sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'

module.exports = (auction, user) ->
  return if auction.isClosed() or sd.MEDIUM isnt 'search'
  user.checkRegisteredForAuction
    saleId: auction.get('id')
    success: (registered) ->
      return if registered
      ctaBarView = new CTABarView
        headline: 'Register to bid in Artsy Auctions'
        linkCopy: 'Register to bid'
        linkHref: "/auction-registration/#{auction.get('id')}"
        modalOptions:
          copy: 'Register to bid in Artsy Auctions'
          destination: "/auction-registration/#{auction.get('id')}"
      $('body').append ctaBarView.render().$el
      $('.auction-artworks-container').waypoint (direction) ->
        ctaBarView.transitionIn() if direction is 'down'
