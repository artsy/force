(function() {
  'use strict';

  analytics.trackLink($('.search-result'), "Selected item from results page", { query: $('#main-layout-search-bar-input').val() });

})();
