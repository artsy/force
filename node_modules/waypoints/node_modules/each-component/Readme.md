
# each

  Array / object / string iteration utility.

## Installation

    $ component install component/each

## API

### each(array, fn)

  Iterate an array:

```js
each([1,2,3], function(num, i){
  
})
```

### each(object, fn)

  Iterate an object's key / value pairs:

```js
each(conf, function(key, val){
  
})
```

  Iterate an array-ish object (has numeric `.length`):

```js
each(collection, function(val, i){
  
})
```

### each(string, fn)

  Iterate a string's characters:

```js
each('hello', function(c, i){
  
})
```

# License

  MIT
