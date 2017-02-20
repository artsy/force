(function() {
  'use strict';

  $('.fair-event-add-to-cal, .fair-page-heading-add-to-ical').click(function(e){
    analytics.track('Fair info: "Add to calendar" clicked', { fair_id: sd.FAIR.id });
  });

  $('.fair-info-event-map').click(function(e){
    analytics.track('Fair info: Event map link clicked', { fair_id: sd.FAIR.id });
  });

})();
