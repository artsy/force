# Add to calendar

A little link that allows a user to add a date to one of their calendar clients.

![](https://s3.amazonaws.com/f.cl.ly/items/143P1w1I3v3N0s1C2b3f/Image%202016-05-23%20at%201.46.28%20PM.png?v=559ad8e1)

## Example

Include the jade mixin passing in an `event` model that uses in the [Calendar Urls](https://github.com/artsy/artsy-backbone-mixins/blob/master/lib/calendar_urls.coffee) mixin.

```jade
include ../components/add_to_calendar

.fair-event-calendars
  for events in events
    +add-to-calendar(event)
```

Add the Backbone view to a container element

```coffeescript
AddToCalendarView = require '../components/add_to_calendar'

new AddToCalendarView el: $('.fair-event-calendars')
```
