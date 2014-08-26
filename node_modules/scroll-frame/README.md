# scrollFrame

Retain your scroll position between pages using an iframe. Especially helpful for infinite scrolling views.

![](http://www.explainxkcd.com/wiki/images/5/56/infinite_scrolling.png)

## Example

Insert scroll-frame-head.js into your `<head>` tag across all views.

````html
<html>
    <head>
        <script src='scroll-frame-head.js'></script>
    </head>
    <body>
        <h1>My detail page</h1>
    </body>
</html>
````

Then insert scroll-frame.js into the pages where you have an infinite scrolling list that needs to retain scroll position.

````html
<html>
    <head>
        <script src='scroll-frame-head.js'></script>
    </head>
    <body>
        <!-- Some infinite scrolling list action about to go down here -->
        <ul id='my-infinite-scrolling-list'></ul>
        <script src='scroll-frame.js'></script>
    </body>
</html>
````

Finally use the `scrollFrame` function to indicate what links should retain their scroll position when clicked.

````javascript
scrollFrame('#my-infinite-scrolling-list a');
````

For a working example check out the [example folder](https://github.com/artsy/scroll-frame/tree/master/example) which you can [visit a live demo of here](http://artsy.github.io/scroll-frame/demo.html) or run yourself by cloning the project and running `npm run example`.

## How it Works

scrollFrame will hijack the user's click for elements that match the query selector you pass in and instead of reloading the page it will append a modal-like iframe that sits on top of your viewport and points to the element's href. It then uses HTML5 history APIs to make the back-button function as expected.

## Caveats

* scrollFrame will only open the next immediate page in an iframe (solving the simple use case of opening a detail page from an infinite scrolling list and then clicking back without losing your position). After clicking on a link inside the iframe the page refreshes to avoid going down a rabbit hole of stacked iframe modals and messy state.

* Because scrollFrame uses HTML5 history APIs it does not work with older browsers and will simply not do anything when included. This should gracefully degrade as it'll just mean older browsers won't retain their scroll position.

## Additionally

Scroll frame will add the `scroll-frame-loading` class to the `<body>` so you can set a loading state while the iframe is loading the page. As an example you may want to do something like `body.scroll-frame-loading #scroll-frame-spinner { display: block }`.

# License

MIT
