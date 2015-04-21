//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

$('.js--post-split-test').click(function(e) {
  e.preventDefault();
  analytics.track("Clicked posts link", {
    label: sd.POSTS_SECTION_NAME
  })
  location.assign($(e.target).attr('href'))
})

if (location.pathname.match('/articles')) {
  var start = Date.now();
  window.onbeforeunload = function(){
    analytics.track("Spent time on articles page" , {
      label: sd.POSTS_SECTION_NAME,
      timeOnPage: Date.now() - start
    })
  };
}