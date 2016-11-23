$('.show-partner .profile-follow').click(function (e) {
  analytics.track('Show page: Gallery follow')
})

$('.show-follow-artists .artist-follow').click(function (e) {
  analytics.track('Show page: Artist follow', {
    artistID: $(e.currentTarget).attr('data-id')
  })
})

$('.artwork-item .overlay-button-save').click(function (e) {
  analytics.track('Show page: Artwork favorite', {
    artworkID: $(e.target).parents('figure').attr('data-artwork')
  })
})

$('.show-partner .icon-facebook').click(function (e) {
  analytics.track('Show page: Facebook share')
})

$('.show-partner .icon-twitter').click(function (e) {
  analytics.track('Show page: Twitter share')
})

$('.js-related-shows a:contains("See more shows in")').click(function (e) {
  analytics.track('Show page: Click "See more shows in..."')
})

$('.js-open-map-modal .icon-circle-chevron').click(function (e) {
  analytics.track('Show page: Click button for map + hours modal')
})

$('.js-open-map-modal span').click(function (e) {
  analytics.track('Show page: Click text for map + hours modal')
})

$('.js-open-show-events .icon-circle-chevron').click(function (e) {
  analytics.track('Show page: Click button for events modal')
})

$('.js-open-show-events span:contains("Multiple events for this show")').click(function (e) {
  analytics.track('Show page: Click text to open event modal containing multiple events')
})

$('.js-open-show-events span:not(:contains("Multiple events for this show"))').click(function (e) {
  analytics.track('Show page: Click text to open event modal containing single event')
})

$(".responsive-layout-container .grid-2-up .featured-shows-featured-show [href*='/show']").click(function () {
  var slug = $(this).attr('href').split('/')[2]

  analytics.track('Clicked Shows Position 1/2', {
    show_slug: slug
  })
})
