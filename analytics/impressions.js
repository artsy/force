var visibleArtworkSlugs = function() {
  return $('.artwork-item').filter(function() {
    var belowViewportTop = $(this).offset().top > $(window).scrollTop();
    var aboveViewportBottom = $(this).offset().top + $(this).height() >
      $(window).scrollTop() + $(window).height();
    return belowViewportTop && aboveViewportBottom;
  }).map(function() {
    return $(this).attr('data-artwork');
  }).toArray();
}

$(window).on('scroll', _.debounce(function() {
  analytics.track('Artwork impressions', { slugs: visibleArtworkSlugs() });
}, 500));
