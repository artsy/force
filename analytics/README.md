# Analytics

The /analytics folder contains all of our tracking code using [Segment](https://segment.com/).

This folder contains javascript files that are sandboxed from our application code to clarify our tracking. For the most part you should be able to write tracking code using plain [jQuery](https://jquery.com/) events such as `$('.artwork-item img').click(function() { analytics.track('Clicked artwork image') })`. For the time being his document will function as the go-to place for help writing analytics code, FAQs, etc.

## Tracking 101

To get started with an example lets track a user clicking on the artist name of the artwork page.

Open an artist page and right click on the artist name in your browser, then choose "Inspect Element".

![](https://s3.amazonaws.com/f.cl.ly/items/3W3u210t3Q2T2x0t2M0h/Image%202015-04-14%20at%2012.40.40%20PM.png)

This should bring up your chrome dev tools and highlight the artist name element. (Or something close to it, you may need to look for the actual [HTML tag](https://www.wikiwand.com/en/HTML_element) with the artist name nearby).

![](https://s3.amazonaws.com/f.cl.ly/items/0s2r1q2F2N0K2k2G430D/Image%202015-04-14%20at%2012.43.59%20PM.png)

Look for an element's `class` nearby to hook into. In this case we can use `.artwork-detail-artist` class and [jQuery's click handler](http://api.jquery.com/click/) to track the click. This syntax for finding elements is called a CSS Selector and it would be [good to familiarize yourself with it](http://www.webteacher.ws/2011/12/07/css-selectors-101/).

````javascript
$(".artwork-detail-artist").click(function() {
  analytics.track("Clicked artist name")
})
````

If you want to check what's being sent to Segment when you can use `console.log` to log what's happening near your code. Then refresh the page, open chrome dev tools using `cmd + opt + i`, and click on the "Console" tab to see your logs.

````javascript
$(".artwork-detail-artist").click(function() {
  analytics.track('Clicked artist name')
  console.log("Clicked the artist's name... " + $(this).text())
})
````

## Tracking user interactions

In the example above we used the `click` event, but there are many more...

such as hover

````javascript
$(".artwork-item").hover(function() {
  analytics.track("Hovered over an artwork")
}, function() {
  analytics.track("Hovered off an artwork")
})
````

or focus

````javascript
$('#artwork-contact-form input:first').focus(function() {
  analytics.track("Focused into the 'Full name' inquiry input.")
})
````

These are called "DOM Events" and we use [jQuery](https://jquery.com/) to provide a simple way to hook into them. You can read the full documenation [here](http://api.jquery.com/category/events/).

## Tracking only on certain pages

To ensure your analytics code is only run on certain pages you can
check the global `location` object [read more](https://developer.mozilla.org/en-US/docs/Web/API/Window/location).

For instance say you want your code to only run on artwork pages.

````javascript
if (location.pathname.match('/artwork/')) {
  $(".artwork-detail-artist").click(function() {
    analytics.track("Clicked artist name")
  })
}
````

## Chrome dev tools & debugging

To debug your analtyics calls it would be good to familiarize yourself with the [Chrome dev tools](https://developer.chrome.com/devtools).

For starters press `cmd + opt + i` in Chrome to open the Chrome dev tools. For the purpose of analytics you will want to be familiar with the "Console" and "Network" panels.

### Console

The console logs out events and errors happening on the page, lets you program interactively with the browser, and will be your friend in debugging tracking calls.

If you are unsure of what data you are tracking you should use `console.log` in your code.

e.g.

````javascript
$(".artwork-detail-artist").click(function() {
  analytics.track('Clicked artist name')
  console.log("Clicked the artist's name... " + $(this).text())
})
````

then open your chrome dev tools `cmd + opt + i`, click on the "Console" tab and see your logs which will look something like this:

![](https://s3.amazonaws.com/f.cl.ly/items/2n2v3i2a451L3D290Z46/Image%202015-04-14%20at%201.06.22%20PM.png)

#### Network

If `console.log` isn't cutting it and you need to debug exactly what is being sent to Segment, you may want to try inspecting the actual network calls being sent.

Open Chrome dev tools `cmd + opt + i`, click on the "Network" tab, click the "Filter" icon, and finally click "XHR" to only show remote calls.

![](https://s3.amazonaws.com/f.cl.ly/items/2Z2K0X1E3d0O141D1d1n/Image%202015-04-14%20at%201.09.48%20PM.png)

Filter the calls according the service you need to debug by typing in the "Filter" input on the left, e.g. "mixpanel". Then click on a network call you think is reponsible for the even you want to track. This will bring up a panel that looks like this:

![](https://s3.amazonaws.com/f.cl.ly/items/1p3M3N3o3O3z0s0P2C28/Image%202015-04-14%20at%201.20.24%20PM.png)

From here you can inspect exactly what is being sent to the service by looking at the "Request Payload", or "Query String Parameters". This will be harder to decipher but if you've gotten as far as finding this network call and things looked good when you used `console.log`. There's probably something else involved.

