(function() {
  'use strict';

  analyticsHooks.on('commercialFilterPrice:triggered', function(options) {
    analytics.track("Commercial Filter Price Triggered", options)
  });

})();
