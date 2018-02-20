# Avant Garde Tabs

===

This component is a work-in-progress (like all of us). It:
 - 1. provides event handling for tab navigation
 - 2. animates a cursor to the active tab
 - 3. provides a template to include to construct the nav bar

## Avant Garde Tab Nav

The nav template expects to have a few variables to work with. For example:

```coffeescript
res.render 'index',
    navItems: [
      { name: 'Current', hasItems: currentFairs.length },
      { name: 'Upcoming', hasItems: upcomingFairs.length },
      { name: 'Past', hasItems: pastFairs.length }
    ]
    emptyMessage: "Past Fairs"
    extraClasses: "art-fairs-tabs"
```

The part(s) we are concerned with here are `navItems`, `emptyMessage`, and `extraClasses`.  `navItems` should be an array of objects, each with a name and `hasItems` (which should be either a boolean or length of a collection).

Once these variables are passed to the template, you can simply include the nav:

```
include ../../../components/avant_garde_tabs/nav
```

## Avant Garde Tab Content

Content is a little more manual, for example:

```
.avant-garde-tabs-list.avant-garde-tabs-list--active(data-list="current")
    if currentFairs
      for fair in currentFairs
        include fair

.avant-garde-tabs-list(data-list="upcoming" class= currentFairs && currentFairs.length ? '' : 'avant-garde-tabs-list--active')
    if upcomingFairs
      for fair in upcomingFairs
        .avant-garde-tabs-list__upcoming-name
          strong.avant-garde-tabs-list__upcoming-title= fair.get('name')
          .avant-garde-tabs-list__upcoming-date= fair.formatDates()

.avant-garde-tabs-list(data-list="past" class= upcomingFairs && upcomingFairs.length ? '' : 'avant-garde-tabs-list--active')
    if pastFairs
      for fair in pastFairs
        include fair

```

The basic idea here is to display the pane and set it as active if the previous pane did not have any items. This hasn't been extracted in to a nav-like template as I have not found a way to pass templates dynamically like we would need.
