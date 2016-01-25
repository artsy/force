(function() {
  'use strict';
  if (location.pathname.match(new RegExp('/favorites')) || location.pathname.match(new RegExp('/following/.*'))) {
    analytics.page('Favorites/Follows page');
  }

  analyticsHooks.on('followable:unfollowed followable:followed', function(options) {
    analytics.track(options.message, { id: options.id, modelName: option.modelName } );
  });

  analyticsHooks.on('follow:sign-up', function(options) {
    analytics.track('Triggered sign up form via follow button');
  });

})();
