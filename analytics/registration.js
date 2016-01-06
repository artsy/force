(function() {
  'use strict';

  // DOM events
  var $document = $(document);

  analyticsHooks.on('registration:validated', function(){
    analytics.track('Registration card validated');
  });

  analyticsHooks.on('registration:submit-address', function(options){
    analytics.track('Registration submit billing address');
  });

  analyticsHooks.on('registration:success', function(){
    analytics.track('Registration submitted');
  });

})();
