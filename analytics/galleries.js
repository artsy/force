$(".galleries-institutions-primary-carousel .gpc-carousel .gpc-carousel-figure").click(function() {
  var slug = $(this).attr("href").split("/")[2]

  analytics.track('Clicked Galleries Banner', {
    show_slug: slug
  })
})
