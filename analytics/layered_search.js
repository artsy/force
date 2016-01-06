(function() {
  'use strict';

  // DOM events
  var $document = $(document);

  analyticsHooks.on('switched:layer', function(options){
    analytics.track("Switched to related artworks: " + options.label);
  });

})();
