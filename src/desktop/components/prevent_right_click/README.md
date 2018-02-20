# Prevent Right Click

This little partial is used to inject a script that globally prevents right clicking on our artwork images. We need to load this in the head to make sure we load this as soon as possible in case some partner with a bad internet connection is able to right click before the bigger JS payload downloads.

```
head
  // ...
  include prevent_right_click
```