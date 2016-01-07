(function() {
  'use strict';

  analyticsHooks.on('auth:mode', function(data){
    analytics.track(auth.message);
  });

  analyticsHooks.on('auth:close', function(data){
    analytics.track('Closed auth modal', { mode: data.mode });
  });

})();
