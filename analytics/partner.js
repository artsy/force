(function() {
  'use strict';

  analyticsHooks.on('show_number:displayed', function() {
    analytics.track("Displayed 'show phone number' button");
  });

})();
