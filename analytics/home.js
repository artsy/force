$(function(){
  if(location.pathname == '/') analytics.track('Home page', { nonInteraction: 1 });

  analytics.trackLink($('#home-featured-artworks .grid-item'), 'Clicked homepage artwork');
  analytics.trackLink($('.is-via-personalized'), 'Clicked personalized homepage artwork');
  analytics.trackLink($('.is-via-featured'), 'Clicked featured homepage artwork');

});
