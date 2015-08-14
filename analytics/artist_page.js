if (location.pathname.match('/artist')) {
  analytics.track('Artist page', { nonInteraction: 1 });

  $('#artist-nav-list a, #artist-tabs a').click(function(e){
    tab = $(e.target).text();
    analytics.track('Clicked artist page tab', { tab: tab });
  });

  $('.artist-image-module a').click(function(e){
    analytics.track('Clicked artwork on artist page image module');
  });
}