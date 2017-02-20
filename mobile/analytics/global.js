//
// Analytics that occur globaly on every page. Think if there's a better place
// before you add to this file.
//

analyticsHooks.on('track', function(message, options){
  analytics.track(message, options);
});

// Track 15 second bounce rate
setTimeout(function() {
  analytics.track('time on page more than 15 seconds', { category: '15 Seconds', message: sd.CURRENT_PATH });
}, 15000);

// Track 30 second bounce rate
setTimeout(function() {
  analytics.track('time on page more than 30 seconds', { category: '30 Seconds', message: sd.CURRENT_PATH });
}, 180000);

// Debug tracking calls in development
if (sd.NODE_ENV != 'production') {
  analytics.on('track', function(){
    console.debug('TRACKED: ', arguments[0], JSON.stringify(arguments[1]));
  });
}
if (sd.NODE_ENV == 'development') {
  analyticsHooks.on('all', function(name, data){
    console.info('ANALYTICS HOOK: ', name, data);
  });
}
