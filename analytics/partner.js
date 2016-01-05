(function() {
  'use strict';

  analyticsHooks.on('show_number:displayed', function() {
    analytics.track("Displayed 'show phone number' button");
  });

  analyticsHooks.on('partner:non-claimed', function(options) {
    analytics.track('Non-claimed partner page', options);
  });

})();
