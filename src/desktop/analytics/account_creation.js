//
// Generic events for tracking events around account creation.
//

const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  let results = regex.exec(location.search)
  return results === null
    ? undefined
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const getAcquisitionInitiative = () =>
  getUrlParameter('m-id') || getUrlParameter('acquisition_initiative')

const trackAccountCreation = options => {
  let properties = _.pick(
    options,
    'acquisition_initiative',
    'signup_service',
    'user_id',
    'context'
  )
  analytics.track(
    'Created account',
    _.extend(properties, { order_id: properties.user_id })
  )
  analytics.identify(options.user_id, _.pick(options, 'email'), {
    integrations: {
      All: false,
      Marketo: true,
    },
  })
}

// Created account (via email)
$(document).on(
  'submit',
  '.auth-register form, .marketing-signup-modal form, .artist-page-cta-overlay__register form, .gdpr-signup form',
  function() {
    $(document).one('ajaxComplete', (e, xhr, options) =>
      trackAccountCreation({
        acquisition_initiative: getAcquisitionInitiative(),
        signup_service: 'email',
        user_id: xhr.responseJSON.user.id,
        context: options.context,
        email: xhr.responseJSON.user.email,
      })
    )
  }
)

// Created account (via social)

// 1. Upon clicking the social signup button
$(document).on('click', '.auth-signup-facebook, .gdpr-signup__fb', function(e) {
  // 2. Store some data in cookies before being redirected everywhere
  Cookies.set(
    'analytics-signup',
    JSON.stringify({
      service: 'facebook',
      acquisition_initiative: getAcquisitionInitiative(),
      context: $(e.currentTarget).data('context'),
    })
  )
})

// 3. After landing back on Artsy send the tracking call and expire the cookie
if (Cookies.get('analytics-signup')) {
  var data = JSON.parse(Cookies.get('analytics-signup'))
  Cookies.expire('analytics-signup')

  if (sd.CURRENT_USER) {
    trackAccountCreation({
      acquisition_initiative: data.acquisition_initiative,
      signup_service: data.service,
      user_id: sd.CURRENT_USER.id,
      context: data.context,
      email: sd.CURRENT_USER.email,
    })
  }
}

// Created account on the Inquire via Phone modal (via email)
analyticsHooks.on('signUpFromPhoneModal', ({ user }) =>
  trackAccountCreation({
    signup_service: 'email',
    email: user.email,
    user_id: user.id,
    context: 'show phone number',
  })
)

analyticsHooks.on('auth:login', function(options) {
  analytics.track('Successfully logged in')
})

// Triggered sign up form via save button
if (!sd.CURRENT_USER) {
  $('.artwork-item-image-container .overlay-button-save').click(function() {
    analytics.track('Triggered sign up form via save button')
  })
}

// Triggered sign up form via follow button
if (!sd.CURRENT_USER) {
  $('.follow-button, .entity-follow').click(function() {
    analytics.track('Triggered sign up form via follow button')
  })
}

// Clicked sign up via the header
$('.mlh-signup').click(function() {
  analytics.track('Clicked sign up via the header')
})

// Clicked sign out via the header
$('.mlh-logout').click(function() {
  analytics.track('Clicked logout via the header')
})

// Viewed sign up options
var trackViewSignup = function() {
  analytics.track('Viewed sign up options')
}

analyticsHooks.on('mediator:open:auth', function(options) {
  if (options.mode === 'signup') trackViewSignup()

  analytics.trackLink($('.auth-signup-facebook')[0], 'Created account')
  analytics.trackLink($('.auth-signup-twitter')[0], 'Created account')
})

$('#auth-footer [href*=sign_up]').click(trackViewSignup)

// Created account via consignments submission page
analyticsHooks.on('consignment:account:created', function(options) {
  if (options.accountCreated) {
    trackAccountCreation({
      signup_service: 'email',
      user_id: options.id,
      context: 'consignments',
      email: options.email,
    })
  } else {
    analytics.identify(options.user_id, options.email, {
      integrations: {
        All: false,
        Marketo: true,
      },
    })
  }
})
