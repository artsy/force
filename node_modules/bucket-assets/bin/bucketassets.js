#!/usr/bin/env node

var program = require('commander')
  , bucketAssets = require('../')
  , resolve = require('path').resolve;

program
  .version('0.0.3')
  .option('-d, --dir [folder]', 'Directory to assets e.g. public/assets')
  .option('-k, --key [key]', 'S3 Key')
  .option('-s, --secret [secret]', 'S3 Secret')
  .option('-b, --bucket [name]', 'S3 Bucket name')
  .parse(process.argv);

if(!program.dir) {
  console.warn("You must specify a directory of assets.");
  return process.exit(1);
}

var dir = resolve(process.cwd(), program.dir);

console.log('Uploading ' + dir + ' to ' + program.bucket + '...')

bucketAssets({
  dir: dir,
  key: program.secret || process.env.S3_KEY,
  secret: program.secret || process.env.S3_SECRET,
  bucket: program.bucket,
  callback: function(err) {
    if (err) {
      console.warn("Error uploading assets: " + err);
      process.exit(1);
    } else {
      console.log("All assets uploaded successfully!");
      process.exit(0);
    }
  }
});
