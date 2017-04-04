const chalk = require('chalk')
const heapdump = require('heapdump')
const knox = require('knox')
const memwatch = require('memwatch-ng')
const moment = require('moment')
const os = require('os')
const path = require('path')
const uuid = require('uuid')

const { NODE_ENV } = process.env
const { S3_KEY, S3_SECRET, S3_BUCKET } = require('../desktop/config')

module.exports = () => {
  // Keep track of heap dumps from specific processes.
  const profileID = uuid().replace(/-/g, '')
  // Ignore initial startup heap size increase.
  let starting = true
  // Don’t generate multiple reports at the same time.
  let working = false
  // Report timeframe in which leaks occur.
  let lastReportedAt = new Date()

  function log (message) {
    console.log(chalk.red(`[memory:${profileID}] ${message}`))
  }

  function upload (pathname, callback) {
    const filename = path.basename(pathname)
    const remotePathname = path.join('/heap-dumps', filename)
    const client = knox.createClient({ key: S3_KEY, secret: S3_SECRET, bucket: S3_BUCKET })
    const headers = { 'Content-Type': 'application/json', 'x-amz-acl': 'bucket-owner-full-control' }
    client.putFile(pathname, remotePathname, headers, (err, res) => {
      if (err) {
        log(`Failed to upload heap dump ${pathname}: ${err.message}`)
      } else {
        if (res.statusCode === 200) {
          log(`Uploaded heap dump to https://${S3_BUCKET}.s3.amazonaws.com/${S3_BUCKET}${remotePathname}`)
        } else {
          log(`Failed to upload heap dump ${pathname}: HTTP ${res.statusCode}`)
        }
        res.resume()
      }
      callback()
    })
  }

  // Every second, this program "leaks" a little bit and every 10 seconds a GC cycle is triggered.
  // Add `--enable-gc` to the `node` CLI options of the `start` script.
  function startLeaking () {
    log('Start leaking in order to test memory profiling')
    var leak = []
    setInterval(() => {
      for (var i = 0; i < 10; i++) {
        var str = i.toString() + ' on a stick, short and stout!'
        leak.push(str)
      }
    }, 1000)
    setInterval(global.gc, 10000)
  }

  log('Enabling memory profiling')
  if (NODE_ENV !== 'production' && global.gc) {
    startLeaking()
  }

  memwatch.on('leak', ({ growth }) => {
    if (starting) {
      starting = false
      return
    }

    const prev = lastReportedAt
    const now = new Date()
    lastReportedAt = now

    const start = prev.toLocaleTimeString()
    const end = now.toLocaleTimeString()
    log(`A leak was detected between ${start} and ${end} which grew the heap by ${growth} bytes`)

    if (working) {
      log('Still processing previous leak, skipping this report')
    } else {
      working = true

      const pathname = path.join(os.tmpdir(), `${profileID}-${moment().format('YYYYMMDDHHmmss')}.heapsnapshot`)
      heapdump.writeSnapshot(pathname, (err) => {
        if (err) {
          log(`Failed to generate heap dump ${pathname}: ${err.message}`)
          working = false
        } else {
          if (NODE_ENV === 'development') {
            log(`Written heap dump to ${pathname}`)
            working = false
          } else {
            upload(pathname, () => {
              working = false
            })
          }
        }
      })
    }
  })
}
