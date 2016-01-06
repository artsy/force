(function() {
  'use strict';

  analyticsHooks.on('order:submitted', function(options) {
    analytics.track("Order submitted", options);
  });

  analyticsHooks.on('order:validated', function(options) {
    analytics.track("Order card validated", options);
  });

  analyticsHooks.on('order:submit-shipping', function(options) {
    analytics.track("Order submit shipping", options);
  });

})();
