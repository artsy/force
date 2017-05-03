/* Analytics code that needs to run before page load and analytics.ready */
if (!location.pathname.match(/^\/article|^\/2016-year-in-art|^\/venice-biennale/)) {
  window.PARSELY = {autotrack: false}
} /* Disable Parsely firing on non-article/section pages */
