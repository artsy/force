//
// Generic events around bidding for auctions
//

var USER_ID = sd.CURRENT_USER ? sd.CURRENT_USER.id : null
var AUCTION_ID = sd.AUCTION && sd.AUCTION.id
var AUCTION_STATE = sd.AUCTION && sd.AUCTION.auction_state

// Clicked "Register to bid" (context_type: 'auctions landing')
$('.auction-registration-wrapper .avant-garde-button-black').click(function () {
  analytics.track('Clicked "Register to bid"', {
    context_type: 'auctions landing',
    auction_slug: AUCTION_ID,
    auction_state: AUCTION_STATE,
    user_id: USER_ID
  })
})

// Clicked "Register to bid" (context_type: 'settings')
$(document).on('click', '.settings-auction-registration___button a', function () {
  analytics.track('Clicked "Register to bid"', {
    context_type: 'settings',
    auction_slug: $(this).attr('href').split('/')[2],
    auction_state: 'open',
    user_id: USER_ID
  })
})

// Registration failed to submit
analyticsHooks.on('registration:submit-address', function () {
  setTimeout(function () {
    var errorMessages = $('.error').map(function () { return $(this).text() }).toArray()
    if (errorMessages.length > 0) {
      analytics.track('Registration failed to submit', {
        auction_slug: sd.SALE.id,
        auction_state: sd.SALE.auction_state,
        user_id: USER_ID,
        error_messages: errorMessages
      })
    }
  })
})

// Registration submitted
analyticsHooks.on('registration:success', function (data) {
  setTimeout(function () {
    analytics.track('Registration submitted', {
      auction_slug: sd.SALE.id,
      auction_state: sd.SALE.auction_state,
      user_id: USER_ID,
      bidder_id: data.bidder_id
    })
  })
})

// Credit card not valid
analyticsHooks.on('creditcard:unqualified', function (data) {
  analytics.track('Credit card not valid', data)
})

// Clicked "Bid" (context_type: your active bids on auction page)
$(document).on('click', '.auction-my-active-bids__bid-button', function (e) {
  const artworkId = $(e.target).parent().data('artwork_id')
  analytics.track('Clicked "Bid"', {
    auction_slug: AUCTION_ID,
    user_id: USER_ID,
    context_type: 'your active bids',
    artwork_slug: artworkId
  })
})

// Clicked "Bid" (context_type: your active bids)
$(document).on('click', '.my-active-bids-bid-button', function (e) {
  const artworkId = $(e.target).parent().data('artwork_id')
  analytics.track('Clicked "Bid"', {
    auction_slug: AUCTION_ID,
    user_id: USER_ID,
    context_type: 'your active bids',
    artwork_slug: artworkId
  })
})

// Clicked "Bid" (context_type: artwork page)
$(document).on('click', '.artwork-auction__bid-form__button', function () {
  analytics.track('Clicked "Bid"', {
    auction_slug: AUCTION_ID,
    user_id: USER_ID,
    context_type: 'artwork page',
    artwork_slug: sd.PARAMS.id
  })
})

// Confirm bid failed
analyticsHooks.on('error', function (message) {
  if (message.match('bid must be higher')) {
    analytics.track('Confirm bid failed', {
      auction_slug: sd.SALE.id,
      user_id: USER_ID,
      artwork_slug: sd.SALE_ARTWORK.artwork.id
    })
  }
})

// Confirmed bid on bid page
analyticsHooks.on('confirm:bid:form:success', function (data) {
  analytics.track('Confirmed bid on bid page', {
    auction_slug: sd.SALE.id,
    user_id: USER_ID,
    artwork_slug: sd.SALE_ARTWORK.artwork.id,
    bidder_position_id: data.bidder_position_id,
    bidder_id: data.bidder_id
  })
})

// Changed filter params on /auction page
analyticsHooks.on('auction:artworks:params:change', function (data) {
  analytics.track('Commercial filter params changed', {
    sale_id: AUCTION_ID,
    auction_slug: sd.AUCTION.slug,
    user_id: USER_ID,
    type: ['price', 'medium', 'artists', 'sort'],
    value: [data.estimate_range, data.gene_ids, data.artist_ids, data.sort]
  })
})
