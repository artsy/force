# bucket-assets

Uploads a folder of static assets to an s3 bucket with convenient assumptions. These assumptions include:

* Uploads to a ('/assets/' + truncated git hash) folder for naive fingerprinting and rollback purposes.
* Adds appropriate s3 headers like setting files to 'public-read' and 'Content-Type'.

Bucket Assets is used in deploys of Artsy apps, but may be useful for you too.

## Example

````javascript
var bucketAssets = require('bucket-assets');
bucketAssets({
  dir: __dirname + 'public/assets',
  key: '<s3-key>', // Defaults to process.env.S3_KEY
  secret: '<s3-secret>', // Defaults to process.env.S3_SECRET
  bucket: 'flare-production',
  callback: function(err) {
    // If no err all assets uploaded to S3 fine!
  }
});
````

or using the CLI

````
npm install bucket-assets -g
bucketassets --dir public/assets --secret foo --key bar --bucket flare-production
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
