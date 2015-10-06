//
// Generic events around bidding for auctions
//

// Clicked “Bid” button on artwork item from auction feature page
$('.auction-artworks .aga-bid-button').each(function(i, el) {
  analytics.trackLink(el, 'Clicked “Bid” button on artwork item from auction feature page');
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
  $(document).one('ajaxError', function(e) {
    analytics.track('Error placing your bid');
  });
});

// Showed ‘Confirm bid on artwork page’
if (location.pathname.match(/artwork\/.*\/confirm-bid/))
  analytics.track("Showed 'Confirm bid on artwork page'", { nonInteraction: 1 });
