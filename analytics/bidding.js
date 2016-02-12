//
// Generic events around bidding for auctions
//

var AUCTION_ID = (
  sd.AUCTION && sd.AUCTION.id ||
  sd.SALE && sd.SALE.id ||
  sd.UPCOMING_AUCTIONS && sd.UPCOMING_AUCTIONS[0].id ||
  location.pathname.replace('/auction/', '').split('/')[0] ||
  location.search.replace('?auction_id=','') ||
  null
);
var USER_AUCTION = {};
if (sd.CURRENT_USER) USER_AUCTION.user_id = sd.CURRENT_USER.id;
if (AUCTION_ID) USER_AUCTION.auction_slug = AUCTION_ID;
console.log(AUCTION_ID, USER_AUCTION)

// -----------------------------------------------------------------------------
// Events from https://trello.com/c/nqmq1yjL/264-web-send-data-to-segment
// -----------------------------------------------------------------------------

// Notify me auction form opened
$('.auctions-placeholder-metadata .js-sign-up-button').click(function() {
  analytics.track('Notify me auction form opened');
});

// Notify me form submitted on the auction registration page
analyticsHooks.on('auction:notify-me', function(data) {
  analytics.track('Notify me form submitted on the auction registration page',
    { email: data.email, auction_slug: AUCTION_ID });
});
analyticsHooks.on('auth:register', function() {
  if (location.pathname !== '/auctions') return;
  var email = $('.auth-form #js-mailcheck-input-modal').val();
  analytics.track('Notify me form submitted on the auction registration page',
    { email: email, auction_slug: AUCTION_ID });
});

// Clicked “Register to bid” on the auction feature page
analytics.trackLink(
  $(
    [
      'a:contains(Register to bid)',
      '.auctions-placeholder-metadata .avant-garde-button-black'
    ].join(',')
  )[0],
  'Clicked “Register to bid” on the auction feature page',
  USER_AUCTION
);

// Clicked "Register" in the Thank You / Auction modal
$(document).on('click', '.email-to-registration-transition-register', function() {
  analytics.track('Clicked "Register" in the Thank You / Auction modal');
});

// Successful registration on auction feature page
analyticsHooks.on('auction:sign_up:success', function(data) {
  analytics.track(
    'Successful registration on auction feature page', USER_AUCTION);
});

// Registration submitted
analyticsHooks.on('registration:success', function(){
  analytics.track('Registration submitted', USER_AUCTION);
});

// Registration submit billing address
analyticsHooks.on('registration:submit-address', function(options){
  analytics.track('Registration submit billing address', USER_AUCTION);
});

// Registration card validated
analyticsHooks.on('registration:validated', function(){
  analytics.track('Registration card validated', USER_AUCTION);
});

// Clicked “Bid” on the artwork page
$(document).on('click', '.artwork-bid-form :contains(Bid)', function() {
  analytics.track('Clicked “Bid” on the artwork page', USER_AUCTION);
});

// Clicked “Bid” button on artwork item from auction feature page
$('.auction-artworks .aga-bid-button').each(function(i, el) {
  analytics.trackLink(
    el,
    'Clicked “Bid” button on artwork item from auction feature page',
    USER_AUCTION
  );
});

// Clicked “Confirm Bid” on bid page
$('.avant-garde-button-black:contains(Confirm Bid)').click(function() {
  analytics.track('Clicked “Confirm Bid” on bid page', USER_AUCTION);

  // Confirmed bid on bid page
  $(document).on('ajaxSuccess', function(e, x, req, bidderPosition) {
    if (!(req.url.match('/api/v1/me/bidder_position'))) return;
    analytics.track('Confirmed bid on bid page', {
      user_id: USER_AUCTION.user_id,
      auction_slug: USER_AUCTION.auction_slug,
      bidder_position_id: bidderPosition.id
    });
  });

  // Error placing your bid
  $(document).one('ajaxError', function(e, jqXHR, settings, error) {
    analytics.track('Error placing your bid', jqXHR.responseText);
  });
});

// Auction Page Pageview
if (location.pathname.match(new RegExp('auction/.*')) &&
   !location.pathname.match(new RegExp('auction/.*/'))) {
  analytics.track("Auction Page Pageview", {
    slug: AUCTION_ID, preview: sd.AUCTION.auction_state
  });
}

// -----------------------------------------------------------------------------
// Misc Events
// -----------------------------------------------------------------------------

// Clicked "Skip" in the Thank You / Auction modal
$(document).on('click', '.email-to-registration-transition-skip', function() {
  analytics.track('Clicked "Skip" in the Thank You / Auction modal');
});

// Showed ‘Confirm bid on artwork page’
if (location.pathname.match(/artwork\/.*\/confirm-bid/)) {
  $(document).on('ajaxSuccess', function(e, x, req, bidderPositions) {
    if (!(req.url.match('bidder_positions'))) return;
    analytics.track("Showed 'Confirm bid on artwork page'", {
      nonInteraction: 1,
      bidder_position_id: bidderPositions[0].id
    });
  });
}
