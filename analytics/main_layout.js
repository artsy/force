//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

// Track pageview
analytics.page();

// Track 15 second bounce rate
setTimeout(function() {
  analytics.track('time on page more than 15 seconds', { category: '15 Seconds' });
}, 15000);

// Track 3 Minute bounce rate
setTimeout(function() {
  analytics.track('time on page more than 3 minutes', { category: '3 Minutes' });
}, 180000);

// Tracking Snowplow page view. TODO: Remove when we phase out Snowplow.
snowplow('trackPageView');

// Signs up a user to the Gallery Insights (New) List
$('.js-articles-insights-subscribe').click(function(e){
  var email = $(e.currentTarget).prev('input').val()
  var firstName = ''
  var lastName = ''
  if(sd.CURRENT_USER && sd.CURRENT_USER.name){
    firstName = sd.CURRENT_USER.name.split(' ')[0]
    lastName = sd.CURRENT_USER.name.split(' ')[1]
  }
  analytics.identify('95ac2900c4', {
    email: email,
    firstName: firstName,
    lastName: lastName
  })
  $('.articles-insights').fadeOut()
  $('.articles-insights-thanks').fadeIn()
  $('.cta-bar-small').fadeOut(function(){
    $('.cta-bar-thanks').fadeIn()
  })
  setTimeout(function(){$('.cta-bar-defer').click()}, 2000)
})