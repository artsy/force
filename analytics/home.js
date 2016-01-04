$(function(){
  if(location.pathname == '/') analytics.track('Home page', { nonInteraction: 1 });

  $('#home-featured-artworks .grid-item').click(function(e){
    analytics.track('Clicked homepage artwork');
  })

  $('.is-via-personalized').click(function(e){
    analytics.track('Clicked personalized homepage artwork');
  })

  $('is-via-featured').click(function(e){
    analytics.track('Clicked featured homepage artwork');
  })

});
