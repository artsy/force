if (location.pathname.match('/artist')) {

  analytics.page('Artist Page');

  $('#artist-nav-list a, #artist-tabs a').click(function(e){
    tab = $(e.target).text();
    analytics.track('Clicked artist page tab', { tab: tab });
  });
}