(function() {
  'use strict';

  if (location.pathname.match(/^\/browse.*$/) || location.pathname.match(/^\/collect.*$/)) {
    analytics.track('Artwork filter page', { nonInteraction: 1 });
  }

})();
