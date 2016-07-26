(function() {
  $('.analytics-rva-artwork-thumbnail').click(function(e) {
    analytics.track('Click', {
      type: 'thumbnail',
      label: 'Recently viewed artwork',
      context_module: 'recently_viewed_artworks',
      destination_path: $(this).attr('href')
    });
  })
})();
