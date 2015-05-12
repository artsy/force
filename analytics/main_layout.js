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
