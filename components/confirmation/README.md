# Confirmation

```coffeescript
# Register the confirmation
confirmation = require '../components/confirmation/index.coffee'
confirmation.register
  title: 'Your Title'
  message: '''
    Your message
  '''
  confirm:
    href: '/some-route'
    label: 'Do something'
  ignore:
    label: 'Maybe later'
```

On the next page load it is initialized and the 🍪 is eaten.
