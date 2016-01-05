(function() {
  'use strict';

  // DOM events
  var $document = $(document);

  $document.on('click', '.search-result', function(e){
    analytics.track("Selected item from results page", query: $('#main-layout-search-bar-input').val());
  });

})();
