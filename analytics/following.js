(function() {
  'use strict';
  if (location.pathname.match(new RegExp('/favorites')) ||
      location.pathname.match(new RegExp('/following/.*'))) {
    analytics.page('Favorites/Follows page');
  }
})();
