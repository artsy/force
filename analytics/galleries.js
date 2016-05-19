$(".galleries-institutions-primary-carousel .gpc-carousel [class*='is-selected'] .gpc-carousel-figure").click(function() {
  var slug = $(this).attr("href").split("/")[2]

  analytics.track('Clicked Galleries Banner', {
    show_slug: slug
  })
})

$(".galleries-institutions-primary-carousel .gpc-overlays [style*='block'] [href*='/show']").click(function() {
  var slug = $(this).attr("href").split("/")[2]

  analytics.track('Clicked Galleries Banner', {
    show_slug: slug
  })
})
