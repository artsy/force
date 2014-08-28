
# diacritics

  remove diacritics from strings

  useful when implementing some kind of search or filter functionality.

## Node.js Installation

    $ npm install diacritics

## Component Installation

    $ component install andrewrk/diacritics

## API

```js
var removeDiacritics = require('diacritics').remove;
console.log(removeDiacritics("Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ"));
// prints "Internationalizati0n"
```

## License

  MIT
