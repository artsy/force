## teleport

Use teleport when you want to simulate a link click instead of setting `window.location` (which Eigen doesn't like).

e.g.
```
teleport = require '../../../../components/teleport/index.coffee'

teleport 'http://google.com'
```