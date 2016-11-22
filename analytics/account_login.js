//
// Generic events around attempting to log in
//

// Viewed login form
var trackViewLogin = function () {
  analytics.track('Viewed login form')
}
analyticsHooks.on('mediator:open:auth', function (options) {
  if (options.mode === 'login') trackViewLogin()
})
$('#auth-footer [href*=log_in]').click(trackViewLogin)

// Clicked login via the header
$('.mlh-login').click(function () {
  analytics.track('Clicked login via the header')
})

// Login: The password you entered is incorrect.
analyticsHooks.on('mediator:auth:error', function (message) {
  if (message === 'invalid email or password') {
    analytics.track('Login: The password you entered is incorrect.')
  }
})
