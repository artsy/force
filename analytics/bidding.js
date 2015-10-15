//
// Generic events around bidding for auctions
//

// Clicked “Bid” button on artwork item from auction feature page
$('.auction-artworks .aga-bid-button').each(function(i, el) {
  analytics.trackLink(el, 'Clicked “Bid” button on artwork item from auction feature page');
});

// "Notify me" was either clicked or the form was submitted
analyticsHooks.on('auction:notify-me', function(data) {
  analytics.track('Notify me form submitted on the auction registration page', data);
});

// Clicked "Register" in the Thank You / Auction modal
$('.email-to-registration-transition-register').click(function() {
  analytics.track('Clicked "Register" in the Thank You / Auction modal');
});

// Clicked "Skip" in the Thank You / Auction modal
$('.email-to-registration-transition-skip').click(function() {
  analytics.track('Clicked "Skip" in the Thank You / Auction modal');
});

// Clicked “Register to bid” on the auction feature page
analytics.trackLink($('.auction-header-register-button a')[0],
  'Clicked “Register to bid” on the auction feature page');

// Clicked “Bid” on the artwork page
$('.artwork-bid-form .abf-button').click(function() {
  analytics.track('Clicked “Bid” on the artwork page');
});

// Clicked “Confirm Bid” on bid page
$('.registration-form-content .avant-garde-button-black').click(function() {
  analytics.track('Clicked “Confirm Bid” on bid page');

  // Confirmed bid on bid page
  $(document).one('ajaxSuccess', function(e) {
    analytics.track('Confirmed bid on bid page');
  });

  // Error placing your bid
  $(document).one('ajaxError', function(e, jqXHR, settings, error) {
    analytics.track('Error placing your bid', jqXHR.responseText);
  });
});

// Showed ‘Confirm bid on artwork page’
if (location.pathname.match(/artwork\/.*\/confirm-bid/))
  analytics.track("Showed 'Confirm bid on artwork page'", { nonInteraction: 1 });

// Auction Page Pageview
if (location.pathname.match(new RegExp('auction/.*')) &&
   !location.pathname.match(new RegExp('auction/.*/'))) {
  analytics.track("Auction Page Pageview", {
    slug: sd.AUCTION.id, preview: sd.AUCTION.auction_state
  });
}
