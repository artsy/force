# bucket-assets

Uploads a folder of static assets to an s3 bucket with convenient features. These include:

* Fingerprints asset package based on file contents
* Uploads a manifest file that stores a git hash to make rollback easy (first checks for the COMMIT_HASH env variable then runs a `git rev-parse HEAD`)
* Provides middleware to easily point to your uploaded assets
* Adds appropriate s3 headers like setting files to 'public-read' and 'Content-Type'.

Bucket Assets is used in deploys of Artsy apps, but may be useful for you too.

## Example

Run the CLI in your deployment process.
_You may omit these arguments if you use the defaults below._

````
bucketassets \
  --files **/public/** \
  --secret s3-secret \
  --key s3-key \
  --bucket force-production \
````

Add the middleware to your app

````javascript
var bucketAssets = require('bucket-assets');
app.use(bucketAssets({

  // Glob that defaults to finding all files in "public" folders that
  // are children of process.cwd() e.g. /public + /components/modal/public.
  // Will always ignore public folders in node_modules.
  files: __dirname + '/**/public/**',

  // Defaults to "public". The name of the folder that is the root static
  // directory so relative paths work the same locally as they do on the CDN.
  root: 'public',

  // Defaults to process.env.S3_KEY
  key: 's3-key',

  // Defaults to process.env.S3_SECRET
  secret: 's3-secret',

  // Defaults to process.env.S3_BUCKET
  bucket: 'force-production',

  // Defaults to process.env.CDN_URL
  cdnUrl: '//xyz.cloudfront.net/'
}));
````

Use the view helper to point to the fingerprinted CDN assets in production or staging.

````jade
head
  link( type='text/css', rel='stylesheet', href=asset('main.css') )
body
  script( src=asset('main.js') )
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
