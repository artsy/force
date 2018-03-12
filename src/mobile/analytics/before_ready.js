//
// Analytics code that needs to run before page load and analytics.ready
//

// Disable Parsely firing on non-article/section pages
if (!location.pathname.match(/^\/article/)) {
  window.PARSELY = { autotrack: false }
}

// Track pageview
analytics.page(
  { path: location.pathname },
  { integrations: { Marketo: false } }
)
