//
// Generic events around bidding for auctions
//

var USER_ID = sd.CURRENT_USER ? sd.CURRENT_USER.id : null
var AUCTION_ID = sd.AUCTION && sd.AUCTION.id
var AUCTION_STATE = sd.AUCTION && sd.AUCTION.auction_state

// Clicked "Register to bid" (context_type: 'auctions landing')
$('.auctions-placeholder-metadata .avant-garde-button-black').click(function () {
  analytics.track('Clicked "Register to bid"', {
    context_type: 'auctions landing',
    auction_slug: sd.UPCOMING_AUCTIONS[0].id,
    auction_state: sd.UPCOMING_AUCTIONS[0].auction_state,
    user_id: USER_ID
  })
})

// Sign up to be noti..... goes here
// $(".auctions-placeholder-metadata .avant-garde-button-black, .auctions-placeholder-hero img")

// Clicked "Register to bid" (context_type: 'upcoming auction feature')
$('.auction-preview-sidebar .avant-garde-button-black').click(function () {
  if (sd.CURRENT_USER) {
    analytics.track('Clicked "Register to bid"', {
      context_type: 'upcoming auction feature',
      auction_slug: AUCTION_ID,
      auction_state: AUCTION_STATE,
      user_id: USER_ID
    })
  }
})

// Clicked "Register to bid" (context_type: 'notify me register now')
$('.auction-preview-register-now a').click(function () {
  analytics.track('Clicked "Register to bid"', {
    context_type: 'notify me register now',
    auction_slug: AUCTION_ID,
    auction_state: AUCTION_STATE,
    user_id: USER_ID
  })
})

// Notify me auction form submitted
$('.auction-preview-sidebar-form').submit(function () {
  analytics.track('Notify me auction form submitted', {
    auction_slug: AUCTION_ID,
    user_id: USER_ID
  })
})

// TODO: Clicked "Register to bid" (context_type: "notify me thank you modal")
$(document).on('click', '.email-to-registration-transition-register', function () {
  analytics.track('Clicked "Register to bid"', {
    context_type: 'notify me thank you modal',
    auction_slug: AUCTION_ID,
    auction_state: AUCTION_STATE,
    user_id: USER_ID
  })
})

// Clicked "Register to bid" (context_type: 'current auction feature top')
analytics.trackLink(
  $('.auction-info-register-button .avant-garde-button-black'),
  'Clicked "Register to bid"',
  {
    context_type: 'current auction feature top',
    auction_slug: AUCTION_ID,
    auction_state: AUCTION_STATE,
    user_id: USER_ID
  }
)

// Clicked "Register to bid" (context_type: 'current auction feature banner')
$(document).on('click', '[href*=auction-registration].cta-bar-button', function () {
  analytics.track('Clicked "Register to bid"', {
    context_type: 'current auction feature banner',
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

// Clicked "Bid" (context_type: auction grid artwork)
$(document).on('click', '.aga-bid-button .avant-garde-button-black', function () {
  analytics.track('Clicked "Bid"', {
    auction_slug: AUCTION_ID,
    user_id: USER_ID,
    context_type: 'auction grid artwork',
    artwork_slug: $(this).attr('data-id')
  })
})

// Clicked "Bid" (context_type: auction list artwork)
$(document).on('click', '.ala-bid-button .avant-garde-button-black', function () {
  analytics.track('Clicked "Bid"', {
    auction_slug: AUCTION_ID,
    user_id: USER_ID,
    context_type: 'auction list artwork',
    artwork_slug: $(this).attr('data-id')
  })
})

// Clicked "Bid" (context_type: your active bids)
$('.auction-mab-bid-button').each(function () {
  analytics.trackLink(
    $(this),
    'Clicked "Bid"',
    {
      auction_slug: AUCTION_ID,
      user_id: USER_ID,
      context_type: 'your active bids',
      artwork_slug: $(this).attr('href').replace('/artwork/', '')
    }
  )
})

// Clicked "Bid" (context_type: artwork page)
analyticsHooks.on('artwork:auction:bid:success', function (data) {
  analytics.track('Clicked "Bid"', {
    auction_slug: data.auction_slug,
    user_id: USER_ID,
    context_type: 'artwork page',
    artwork_slug: sd.ARTWORK.id
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
