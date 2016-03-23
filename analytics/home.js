
if(location.pathname == '/') analytics.track('Home page', { nonInteraction: 1 });

analytics.trackLink($('#home-featured-artworks .grid-item'), 'Clicked homepage artwork');
analytics.trackLink($('.is-via-personalized'), 'Clicked personalized homepage artwork');
analytics.trackLink($('.is-via-featured'), 'Clicked featured homepage artwork');


$('.home-top-feature-link').click(function () {
  var href = $(this).find('.htfl-image-link').attr('href')
  var context_type = $(this).find('.htfl-details h3').text()
  analytics.track('Clicked homepage featured link', {
  	featured_link_path: href
	context_type: context_type
  })
})
