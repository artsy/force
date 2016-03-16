(function() {
  'use strict';
  analyticsHooks.on('follow-widget:follow', function(options) {
    analytics.track('Followed Artist', { artist_id: options.id, contextModule: 'follow widget' } );
  });

  analyticsHooks.on('follow-widget:opened', function(options) {
    analytics.track('Show follow widget');
  });

  analyticsHooks.on('follow-widget:closed', function(options) {
    analytics.track('Dismiss follow widget');
  });

  analyticsHooks.on('follow-widget:clicked-artist-name', function(options) {
    analytics.track('Clicked artist name on follow widget');
  });

})();
