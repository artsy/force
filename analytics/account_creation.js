//
// Generic events for tracking events around account creation.
//

// Created account
analytics.trackLink($('.auth-signup-facebook')[0], 'Created account');
analytics.trackLink($('.auth-signup-twitter')[0], 'Created account');
analytics.trackForm($('.auth-register .auth-form')[0], 'Created account');

// Triggered sign up form via save button
if (!sd.CURRENT_USER) {
  $('.artwork-item-image-container .overlay-button-save').click(function() {
    analytics.track('Triggered sign up form via save button');
  });
}

// Triggered sign up form via follow button
if (!sd.CURRENT_USER) {
  $('.follow-button, .entity-follow').click(function() {
    analytics.track('Triggered sign up form via follow button');
  });
}

// Clicked sign up via the header
$('.mlh-signup').click(function() {
  analytics.track('Clicked sign up via the header');
});

// Viewed sign up options
var trackViewSignup = function() {
  analytics.track('Viewed sign up options');
}
analyticsHooks.on('mediator:open:auth', function(options) {
  if (options.mode == 'signup') trackViewSignup();
});
$('#auth-footer [href*=sign_up]').click(trackViewSignup);
