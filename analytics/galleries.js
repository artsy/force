$(".galleries-institutions-primary-carousel .gpc-carousel [class*='is-selected']").click(function () {
  var slug = $(this).find('.gpc-carousel-figure').attr('href').split('/')[2]

  analytics.track('Clicked Galleries Banner', {
    show_slug: slug
  })
})

$('.galleries-institutions-primary-carousel .gpc-overlay').click(function () {
  var partnerSlug = $(this).find('.gpc-headline').attr('href').split('/')[1]
  var showSlug = $(this).find("[href*='/show']").attr('href').split('/')[2]
  var pos = $(this).data('idx')

  analytics.track('Clicked Galleries Banner', {
    show_slug: showSlug,
    partner_slug: partnerSlug,
    position: pos
  })
})

$('.galleries-institutions-main-content .galleries-institutions-carousels .mgr-cell.js-mgr-cell.partner-cell').click(function () {
  var partnerSlug = $(this).data('id')

  analytics.track('Clicked Galleries Featured Link', {
    partner_slug: partnerSlug
  })
})
