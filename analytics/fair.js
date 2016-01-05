(function() {
  'use strict';

  analyticsHooks.on('fair:display-following', function() {
    analytics.track("Display following exhibitors at the fair");
  });

  analyticsHooks.on('fair:impression', function() {
    analytics.track("Viewed fair page " + sd.FAIR.name);
  });

  analyticsHooks.on('fair:display-following-artists', function() {
    analytics.track("Display following artists at the fair");
  });

})();
