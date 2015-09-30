(function() {
  'use strict';

  analyticsHooks.on('user_interests:add', function(context) {
    analytics.track('Added an artist to their collection', {
      artist: context.interest.id
    });
  });

  analyticsHooks.on('user_interests:remove', function(context) {
    analytics.track('Removed an artist from their collection', {
      artist: context.interest.id
    });
  });

})();
