(function() {
  'use strict';

  analyticsHooks.on('error', function(description){
    analytics.track("Error: " + auth.message);
  });

})();
