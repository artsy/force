//
// Events for signup and login.
//

// Created account (via email)
analyticsHooks.on('auth:signup', function(data, res) {
  analytics.track('Created account', {
    acquisition_initiative: data.acquisition_initiative,
    signup_service: 'email',
    user_id: res.user.id
  })
})

// Created account (via social)

// 1. Upon clicking the social signup button
$(document).on(
  'click',
  '.auth-signup-facebook, .marketing-signup-modal-fb',
  function() {

    // 2. Store some data in cookies before being redirected everywhere
    Cookies.set('analytics-signup', JSON.stringify({
      service: 'facebook',
      acquisition_initiative: location.search.replace('?m-id=', '')
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
      user_id: sd.CURRENT_USER.id
    })
  }
};
