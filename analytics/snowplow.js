//
// Hooks into Segment's analytics object events and tries to mimic the
// equivalent in snowplow.
//

// Segment automatically includes an analytics.page() call so to mimic that
// we call send a page view to snowplow here.
snowplow('trackPageView');