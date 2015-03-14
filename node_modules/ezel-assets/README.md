# ezel-assets

A convetion over config CLI to take a folder of stylus & browserify files, iterate through them running transforms, minification, gzip, and spit them out to another folder. Used as a task in production deploys at Artsy, but maybe useful outside of that as well. Uses your app's dependencies so make sure to specify `"browserify":"*", "stylus":"*"` in your package.json.

## Example

````
ezel-assets assets/ public/assets/ caching-coffeify,uglifyify,jadeify,coffeify
````

Or just assuming the defaults above

```
ezel-assets
```

## Dependencies

To keep things consistent ezel-assets uses your app's dependencies. It's recommended to have the following dependencies installed.

* stylus
* sqwish
* browserify
* uglififiy
* Any other browserify transforms necessary to your app.

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `npm test`.

## License

MIT