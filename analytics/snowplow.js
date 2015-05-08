//
// Hooks into Segment's analytics object events and tries to mimic the
// equivalent in snowplow.
//

analytics.on('page', function(event, properties, options) {
  snowplow('trackPageView');
});