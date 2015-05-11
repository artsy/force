//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

// Track 15 second bounce rate TODO: Refactor to analytics.track
setTimeout(function() {
  ga('send', 'event', '15 Seconds', 'time on page more than 15 seconds');
}, 15000);

// Track 3 Minute bounce rate TODO: Refactor to analytics.track
setTimeout(function() {
  ga('send', 'event', '3 Minutes', 'time on page more than 3 minutes');
}, 180000);

//Tracking Snowplow page view and session ID. We'll want to refactor if/when
//we phase out Snowplow.
snowplow('trackPageView');
snowplow('trackStructEvent', 'global', 'pageView', sd.SESSION_ID);


