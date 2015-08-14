$('.filter-nav-only-for-sale').click(function() {
  analytics.track('Clicked Only for Sale button on artworks filter');
});

analyticsHooks.on('artwork_viewmode:toggled', function(data) {
  analytics.track('Artwork view mode switched', { mode: data.mode });
});

analyticsHooks.on('artwork_filter:activated', function(data) {
  analytics.track('Activated artworks filter', {
    filter: data.attr,
    value: data.val
  });
});

analyticsHooks.on('artwork_filter:new_page', function(data) {
  analytics.track('Artworks filter / Scrolled to new page', {
    page: data.page
  });
});