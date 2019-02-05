const chalk = require("chalk")
const glob = require("glob")
const mime = require("mime")
const path = require("path")
const s3 = require("s3")
const { last } = require("lodash")

const options = {
  files: path.join(__dirname, "../**/public/**"),
  root: "public",
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: "artsy-chris-test-bucket", // process.env.S3_BUCKET,
  cdnUrl: process.env.CDN_URL,
}

// See: https://www.npmjs.com/package/s3 for more options
const client = s3.createClient({
  s3Options: {
    accessKeyId: options.key,
    secretAccessKey: options.secret,
  },
})

const files = glob.sync(options.files, { nodir: true }).filter(file => {
  return !file.match("node_modules")
})

const generateHeaders = file => {
  const contentType = mime.getType(
    path.extname(
      file
        .replace(".br", "")
        .replace(".gz", "")
        .replace(".cgz", "")
        .replace(".jgz", "")
    )
  )

  let headers = {
    CacheControl: "max-age=315360000, public",
    ContentType: contentType,
    ACL: "public-read",
  }

  if (file.match(/\.gz$/) || file.match(/\.cgz$/) || file.match(/\.jgz$/)) {
    headers.ContentEncoding = "gzip"
  }
  if (file.match(/\.br$/)) {
    headers.ContentEncoding = "br"
  }

  return headers
}

console.log(chalk.green("\n[uploadToS3] Starting upload...\n"))

files.forEach(async file => {
  const s3Path = last(file.split(options.root)).substring(1)
  const uploader = client.uploadFile({
    localFile: file,

    // See: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    s3Params: {
      Bucket: options.bucket,
      Key: s3Path,
      ...generateHeaders(file),
    },
  })

  uploader.on("error", err => {
    console.error(
      chalk.red(`[uploadToS3] Error uploading ${s3Path}.\n`),
      err.stack,
      "\n"
    )
  })

  uploader.on("progress", () => {
    // If we need more detailed logging, can tap into uploader.progressAmount
  })

  uploader.on("end", () => {
    console.log(chalk.green(`[uploadToS3] Complete: ${s3Path}`))
  })
})
