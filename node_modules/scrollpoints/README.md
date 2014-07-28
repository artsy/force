# Scrollpoints

Scrollpoints lets you watch specific DOM-elements and fires a callback when an
element enters or leaves the screen.
It behaves similar to the [jQuery Waypoints](https://github.com/imakewebthings/jquery-waypoints)
plugin, but does not depend on jQuery and is very small in size ( < 2KB).

## Installation
Scrollpoints is available as npm module and bower component.

If you are using npm, call `npm install scrollpoints --save` to download the scrollpoints module and to add it to your `package.json` file. To use it with browserify, require it like this: `var Scrollpoints = require('scrollpoints');`

Using bower, simply install it with `bower install scrollpoints` and include the scrollpoints.js or scrollpoints.min.js file.

## Documentation
### Adding a new scrollpoint
To add a new scroll-handler function to a specific DOM-element, Scrollpoints provides the `add`
function, which takes two arguments: the function to be executed and a configuration object.

First, we grab an element from the DOM.

```javascript
var elem = document.querySelector('#my-awesome-element');
```
If the configuration object isn't provided to `add`, the default configuration will be used.

```javascript
Scrollpoints.add(elem, function(domElement) {
    // this function will execute when elem entered the screen
});
```

If you want to customize behavior, add the config-object as the third parameter:

```javascript
var config = {
    when: 'entering',
    reversed: true,
    once: false
};

Scrollpoints.add(elem, function(domElement) {
    /*
        This function will execute when elem starts to enter
        the screen (entering) from above, i.e. when the user
        scrolls upwards (reversed is set). It will happen
        every time the user scrolls past this point (once is set to false).
    */
}, config);
```

### Options

Options are per-element configurations to cause the plugin to behave differently. Add
them as an object as third parameter to the `add` function.

#### when
*Default value:* `'entered'`

Possible values:
- `'entered'` Callback fires when the whole Element entered the screen.
- `'entering'` Callback fires immediately when the element starts to enter the screen.
- `'leaving'` Callback fires when the element starts to leave the screen.
- `'left'` Callback fires when the element was scrolled off the screen completely

#### reversed
*Default value:* `false`

When set to `true`, upwards-scrolling is observed. For instance, `when: 'entering'` means
when the user scrolls upwards and the element comes in from above, `when: 'left'` fires
when an element has left the screen at the lower edge of the browser window, when scrolling
back to top.

#### once
*Default value:* `true`

When a user scrolls to a specific element, the callback fires and is then disabled. Setting
`once` to `false`, will cause the callback to execute every time when the user scrolls to
the same point. If an `entering` callback is set, it will then execute when the user scrolls
to that element, scrolling up and down to the element again will cause it to be called again.

#### offset
*Default value:* `0`

Setting offset to, say, `200` on an `entered` scrollpoint, causes the callback to fire
when the element entered the screen and the lower edge of the element has a 200px
distance from the bottom of the browser window. Think of this property as *"a specific
amount of pixels too late"*. When an offset is set on a `leaving` element, it means that
the callback will fire when the element is already `x` pixels out of the screen.

### Overriding defaults

Scrollpoints provides a `configure` function to set the defaults for every new
Scrollpoint.

Every Scrollpoint you create after this call will not only fire once, and will always
fire 50px before the actual point.

```javascript
Scrollpoints.configure({
    once: false,
    offset: -50
});
```
