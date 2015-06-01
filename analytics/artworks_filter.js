$('.filter-nav-only-for-sale').click(function() {
  analytics.track('Clicked Only for Sale button on artworks filter');
});

analyticsHooks.on('artwork_filter:activated', function(data) {
  analytics.track('Activated artworks filter', {
    filter: data.attr,
    value: data.val
  });
});