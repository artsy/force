//
// Generic events for tracking events around account creation.
//

// Created account (via email)
$(document).on(
  'submit',
  '.auth-register form, .marketing-signup-modal form, .artist-page-cta-overlay__register form',
  function() {
    $(document).one('ajaxComplete', function(e, xhr, options) {
      var getUrlParameter = function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };

      var acquisition_initiative = getUrlParameter('m-id');
      if (_.isEmpty(acquisition_initiative)) {
        acquisition_initiative = getUrlParameter('acquisition_initiative');
      }

      analytics.track('Created account', {
        acquisition_initiative: acquisition_initiative,
        signup_service: 'email',
        user_id: xhr.responseJSON.user.id,
        context: options.context
      })
    })
  }
)

// Created account (via social)

// 1. Upon clicking the social signup button
$(document).on(
  'click',
  '.auth-signup-facebook, .marketing-signup-modal-fb',
  function(e) {
    var getUrlParameter = function(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    var acquisition_initiative = getUrlParameter('m-id');
    if (_.isEmpty(acquisition_initiative)) {
      acquisition_initiative = getUrlParameter('acquisition_initiative');
    }

    // 2. Store some data in cookies before being redirected everywhere
    Cookies.set('analytics-signup', JSON.stringify({
      service: 'facebook',
      acquisition_initiative: acquisition_initiative,
      context: $(e.currentTarget).data('context')
    }))
  }
)

// 3. After landing back on Artsy send the tracking call and expire the cookie
if (Cookies.get('analytics-signup')) {
  var data = JSON.parse(Cookies.get('analytics-signup'))
  Cookies.expire('analytics-signup')
  if (sd.CURRENT_USER) {
    analytics.track('Created account', {
      acquisition_initiative: data.acquisition_initiative,
      signup_service: data.service,
      user_id: sd.CURRENT_USER.id,
      context: data.context
    })
  }
}

// Triggered sign up form via save button
if (!sd.CURRENT_USER) {
  $('.artwork-item-image-container .overlay-button-save').click(function () {
    analytics.track('Triggered sign up form via save button')
  })
}

// Triggered sign up form via follow button
if (!sd.CURRENT_USER) {
  $('.follow-button, .entity-follow').click(function () {
    analytics.track('Triggered sign up form via follow button')
  })
}

// Clicked sign up via the header
$('.mlh-signup').click(function () {
  analytics.track('Clicked sign up via the header')
})

// Clicked sign out via the header
$('.mlh-logout').click(function () {
  analytics.track('Clicked logout via the header')
})

// Viewed sign up options
var trackViewSignup = function () {
  analytics.track('Viewed sign up options')
}

analyticsHooks.on('mediator:open:auth', function (options) {
  if (options.mode === 'signup') trackViewSignup()

  analytics.trackLink($('.auth-signup-facebook')[0], 'Created account')
  analytics.trackLink($('.auth-signup-twitter')[0], 'Created account')
})

$('#auth-footer [href*=sign_up]').click(trackViewSignup)
