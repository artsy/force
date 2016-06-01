# Confirmation

This component is comprised of three parts: a server app, a client view, and a middleware.

If you want a confirmation after a redirect completes, POST a payload to the confirmation endpoint:

```coffeescript
Promise $.post '/confirmation',
  title: 'Thank You for Joining'
  message: '''
    Make Artsy work for you: Follow artists, galleries, and
    categories to get alerts when new works are available.
  '''
  confirm:
    href: '/personalize'
    label: 'Personalize your Account'
  ignore:
    label: 'Maybe later, start browsing'
```

On the next full page load Sharify will have a `CONFIRMATION` object, which gets initialized as a modal. It's immediately cleared from the session and subsequent pageloads will do nothing.
