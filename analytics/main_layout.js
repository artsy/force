//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

// Track pageview
if(sd.ARTICLE){
  analytics.page('Editorial', sd.ARTICLE.thumbnail_title, { author: sd.ARTICLE.author.name, path: location.pathname });
}else{
  analytics.page({path: location.pathname});
}

// Track 15 second bounce rate
setTimeout(function() {
  analytics.track('time on page more than 15 seconds', { category: '15 Seconds' });
}, 15000);

// Track 3 Minute bounce rate
setTimeout(function() {
  analytics.track('time on page more than 3 minutes', { category: '3 Minutes' });
}, 180000);

// Tracking Snowplow page view. TODO: Remove when we phase out Snowplow.
snowplow('trackPageView');

// debug tracking calls in development
if (sd.NODE_ENV != 'production'){
  analytics.on('track', function(){
    console.log('TRACKED: ', arguments[0], JSON.stringify(arguments[1]));
  })
}
