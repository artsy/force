# lazybird

Lazy promises using Bluebird.


## Why?

Lazybird allows you to create a promise that will only start resolving when you
attach the first fulfilled or rejected handler.  It "resolves lazily".

If promises are future values, then lazy promises are future values calculated
on demand.  Mostly this is useful to delay calculations that may never happen at
all.  You can create the promise, pass its reference around, but not bother to
resolve it until the value or action is necessary.

[Zombie](http://zombie.labnotes.org/) uses lazy promises for its event loop.
The promise only resolves when you ask it to.

For example:

```
// Click the "Edit" link, it will show delete link next to each item
return browser
  .clickLink('#edit-items')
  .then(function() {
    // Waiting for the promise to resolve, as there's some
    // animation and setTimeout involved

    // Now click the delete link on one of these items
    return browser
      .clickLink('#delete-item-45')
      .then(function() {
        // Waiting for the promise to resolve, as it needs to
        // make AJAX request to the server, wait for response

        // Click the "Done" link to hide the delete links
        //
        // This method returns a promise but we don't care
        // for the promise to resolve
        browser.clickLink('#edit-done');
        
      });
  });

```


## How?

Just like any standard promise library, use `Lazybird` to create a new promise
object and pass it the resolver callback.  The only difference is, that resolved
function is not called until you ask the promise to resolve.

Since `Lazybird` is based on `Bluebird`, you get access to all the same methods
including `then`, `catch`, `finally`, `done`, `reflect`, `value`, etc).


## Example

```
const Lazybird = require('lazybird');

const lazy = new Lazybird(function(resolve) {
  console.log('Resolving');
  resolve();
});

console.log('Waiting ...');
setTimeout(function() {
  console.log('5 seconds later ...');
  lazy.then(function() {
    console.log('Resolved');
  });
}, 5000);
```

You will see:

```
Waiting ...
5 seconds later ...
Resolving
Resolved
```

