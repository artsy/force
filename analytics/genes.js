$('.gene-category a').click(function () {
  analytics.track('Clicked on a browseable gene category link', {
    gene_id: $(this).data('id')
  })
})

$('.categories-featured a').click(function () {
  analytics.track('Clicked on a featured gene link', {
    gene_id: $(this).data('id')
  })
})
