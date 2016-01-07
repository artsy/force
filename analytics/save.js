(function() {
  'use strict';

  analyticsHooks.on('save:sign-up', function(data) {
    analytics.track('Triggered sign up form via save button');
  });

  analyticsHooks.on('save:save-artwork save:remove-artwork', function(data) {
    analytics.track(data.message);
  });

})();
