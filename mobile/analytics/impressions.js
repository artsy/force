var trackedIds = [];

var visibleArtworkIds = function() {

  // Find all of the "artwork item" components that are visible
  var ids = $("a[href*='/artwork/'] img").filter(function() {
    var belowViewportTop = $(this).offset().top > $(window).scrollTop();
    var aboveViewportBottom = $(this).offset().top + $(this).height() <
      $(window).scrollTop() + $(window).height();
    return belowViewportTop && aboveViewportBottom;
  }).map(function() {
    return $(this).attr('data-id');
  }).toArray();

  // Add the artwork page as an impression
  if ($('#artwork-page-main-image-container').length && sd.ARTWORK) ids.push(sd.ARTWORK._id);

  // Don't double track the same impressions
  ids = _.difference(ids, trackedIds);
  trackedIds = trackedIds.concat(ids);

  // Return only the new impressions
  return ids;
};

var trackImpressions = function() {
  var ids = visibleArtworkIds();
  if (ids.length > 0) {
    analytics.track('Artwork impressions',
      { ids: ids, nonInteraction: 1 },
      { integrations: { 'Mixpanel': false }}
    )
  }
};

trackImpressions();
$(window).on('scroll', _.debounce(trackImpressions, 500));