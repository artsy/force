$(".galleries-institutions-primary-carousel .gpc-carousel [class*='is-selected']").click(function() {
  var slug = $(this).find(".gpc-carousel-figure").attr("href").split("/")[2]

  analytics.track('Clicked Galleries Banner', {
    show_slug: slug
  })
})

$(".galleries-institutions-primary-carousel .gpc-overlay").click(function() {
  var partner_slug = $(this).find(".gpc-headline").attr("href").split("/")[1];
  var show_slug = $(this).find("[href*='/show']").attr("href").split("/")[2];
  var pos = $(this).data("idx")

  analytics.track('Clicked Galleries Banner', {
    show_slug: show_slug,
    partner_slug: partner_slug,
    position: pos
  })
})
