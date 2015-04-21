//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

$('.js--post-split-test').click(function() {
  console.log('hello');
  analytics.track.click("Clicked posts link with text: #{sd.POSTS_SECTION_NAME}");
  analytics.snowplowStruct('posts_link', 'click', sd.POSTS_SECTION_NAME, 'link_name');
})