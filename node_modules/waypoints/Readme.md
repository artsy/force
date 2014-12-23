# Waypoints

  Fire methods when points on the page are scrolled to for the first time. Useful for triggering animation to elements while scrolling down the page.

## Installation

    $ component install anthonyshort/waypoints

## Data API

Easiest way to use it is to use the create method. This assumes you want to add/remove classes and uses data attributes on the elements. This is the main purpose for this component but you can also use the standard API to do something different.

    Waypoints.create({ 
      selector: '.js-waypoint',
      addClass: 'is-visible',
      removeClass: 'is-hidden',
      delay: 500,
      offset: -200
    });

### Options

You pass through a set of options to `Waypoint.create` to set default properties for the waypoints which can be overriden by each waypoint using data attributes.

#### `selector`

The selector to match to find waypoints. This element will be used as the point to trigger the events. Defaults to `.js-waypoint`.

#### `addClass`

Default class to add when an element is reached. This can be overriden by each waypoint using the data attribute `data-waypoint-addClass`. Defaults to `null`.

#### `removeClass`

Default class to add when an element is reached. This can be overriden by each waypoint using the data attribute `data-waypoint-removeClass`. Defaults to `null`.

#### `delay`

A delay, in milliseconds, for adding or removing the classes. Defaults to `0`. Can be overriden using `data-waypoint-delay`.

#### `offset`

Normally waypoints will use the scrollTop position of the element. You can adjust the point using this attribute to make it trigger earlier or later. This can be overriden using the data attribute `data-waypoint-offset`. Defaults to `0`.

## Standard API

You can also use Waypoints to call methods at points on the page. This allows you to do things other than just add/remove classes from an element when scrolling to it.

    var waypoints = new Waypoints();

    waypoints.addPoint(100, {
      foo: "bar"
    });

    waypoints.on('point', function(point, data){
      console.log('Point reached');
    });

The `addPoint` method takes two arguments - a scroll point and data that will be sent through to the event when the point is reached.

## License

  MIT
