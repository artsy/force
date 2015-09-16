/* Analytics code that needs to run before page load and analytics.ready */

if (!location.pathname.match(/^\/article/) && !sd.SECTION){
  PARSELY = {autotrack: false};
} /* Disable Parsely firing on non-article/section pages */
