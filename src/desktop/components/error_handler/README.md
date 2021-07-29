# Error Handler

This component encapsulates rendering of the error page. We check in a pre-compiled CSS file for this page so errors high up the stack can still render properly without relying on pointing to CDN assets, using static asset middleware, or using on on-the-fly stylus processing which can use significant CPU.

To update the css file run:

```
node_modules/.bin/stylus src/desktop/components/error_handler/index.styl --compress
```