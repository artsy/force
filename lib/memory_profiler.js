const memwatch = require('memwatch-ng')
const heapdump = require('heapdump')
const knox = require('knox')
const path = require('path')
const os = require('os')
const chalk = require('chalk')

const { NODE_ENV } = process.env
const { S3_KEY, S3_SECRET, S3_BUCKET } = require('../desktop/config')

function log (message) {
  console.log(chalk.red(`[MEMORY] ${message}`))
}

function upload (pathname, callback) {
  const filename = path.basename(pathname)
  const client = knox.createClient({ key: S3_KEY, secret: S3_SECRET, bucket: S3_BUCKET })
  client.putFile(filename, pathname, (err, res) => {
    if (err) {
      log(`Failed to upload heap dump ${pathname}: ${err.message}`)
    } else {
      if (res.statusCode === 200) {
        log(`Uploaded heap dump to https://${S3_BUCKET}.s3.amazonaws.com/${S3_BUCKET}/${filename}`)
      } else {
        log(`Failed to upload heap dump ${pathname}: HTTP ${res.statusCode}`)
      }
      res.resume()
    }
    callback()
  })
}

// Every second, this program "leaks" a little bit. Add `--enable-gc` to the `node` CLI options of the `start` script.
function startLeaking () {
  log('Start leaking in order to test memory profiling!')
  var leak = []
  setInterval(() => {
    for (var i = 0; i < 10; i++) {
      var str = i.toString() + ' on a stick, short and stout!'
      leak.push(str)
    }
  }, 1000)
  setInterval(global.gc, 10000)
}

module.exports = () => {
  log('Enabling memory profiling.')

  if (NODE_ENV !== 'production' && global.gc) {
    startLeaking()
  }

  let lastReportedAt = new Date()
  let working = false

  memwatch.on('leak', ({ growth }) => {
    const prev = lastReportedAt
    const now = new Date()
    lastReportedAt = now

    const start = prev.toLocaleTimeString()
    const end = now.toLocaleTimeString()
    log(`A leak was detected between ${start} and ${end} which grew the heap by ${growth} bytes.`)

    if (working) {
      log(`Still processing previous leak, skipping this report.`)
    } else {
      working = true

      const pathname = path.join(os.tmpdir(), `heapdump-${Date.now()}.heapsnapshot`)
      heapdump.writeSnapshot(pathname, (err) => {
        if (err) {
          log(`Failed to generate heap dump ${pathname}: ${err.message}`)
          working = false
        } else {
          if (NODE_ENV === 'production') {
            upload(pathname, () => {
              working = false
            })
          } else {
            log(`Written heap dump to ${pathname}`)
            working = false
          }
        }
      })
    }
  })
}
