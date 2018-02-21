//
// A module that boots up an app wrapping Force for the sake of recording
// fixture JSON files from outgoing requests. Uses Nock:
// https://github.com/node-nock/nock#recording
//
import nock from 'nock'
import express from 'express'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import url from 'url'
import chalk from 'chalk'
import { debounce, last } from 'underscore'
import { truncate } from 'underscore.string'
import force from '../../../'

const { API_URL, METAPHYSICS_ENDPOINT, POSITRON_URL, PORT } = process.env
const NAMESPACE = process.argv[2]
const GRAVITY_HOST = url.parse(API_URL).hostname
const METAPHYSICS_HOST = url.parse(METAPHYSICS_ENDPOINT).hostname
const POSITRON_HOST = url.parse(POSITRON_URL).hostname

let counts = {}

// Convenience for generating a fixture filename
const filenameFor = (fld) => {
  const base = path.resolve(__dirname, '../fixtures', fld)
  const fname = `${base}/${NAMESPACE}${counts[fld] || ''}.json`
  if (!counts[fld]) counts[fld] = 0
  counts[fld]++
  return fname
}

const writeRecordings = debounce(
  () =>
    new Promise((resolve, reject) => {
      counts = {}
      const recordings = nock.recorder.play()

      // Iterate through the nock recorded HTTP requests
      console.log('Writing recordings...')
      return Promise.all(
        recordings.map((rec) => {
          const host = url.parse(rec.scope).hostname
          let filename, contents

          // Determine what file to write depending on which API was requested
          if (host === GRAVITY_HOST) {
            filename = filenameFor('gravity')
            contents = zlib.gunzipSync(
              Buffer.from(rec.response.join(''), 'hex')
            )
            contents = JSON.stringify(JSON.parse(contents), null, 2)
          } else if (host === METAPHYSICS_HOST) {
            filename = filenameFor('metaphysics')
            contents = JSON.stringify(rec.response, null, 2)
          } else if (host === POSITRON_HOST) {
            filename = filenameFor('positron')
            contents = JSON.stringify(rec.response, null, 2)
          }

          // Write the fixture json file
          return new Promise((resolve, reject) => {
            console.log(
              truncate(
                chalk.blue(`${last(filename.split('/'), 2).join('/')}: `) +
                  chalk.yellow(`${rec.method} ${host}${rec.path}`) +
                  (rec.body ? JSON.stringify(rec.body) : ''),
                process.stdout.columns - 3
              )
            )

            fs.writeFile(
              filename,
              contents,
              (err) => (err ? reject(err) : resolve())
            )
          })
        })
      ).then(() => {
        console.log('Recorded JSON responses to test/acceptance/fixtures')
      })
    }),
  5000
)

const start = () => {
  if (!process.argv[2]) {
    throw new Error(
      'You must specify a namespace for the fixture files ' +
        'with `yarn acceptance-record namespace`'
    )
  }
  const app = express()

  // Once some requests finsh being handled, write fixtures from nock recordings
  app.use((req, res, next) => {
    const afterResponse = async () => {
      await writeRecordings()
      res.removeListener('finish', afterResponse)
      res.removeListener('close', afterResponse)
    }
    res.on('finish', afterResponse)
    res.on('close', afterResponse)
    next()
  })
  app.use(force)

  // Start recording and listen on PORT
  nock.recorder.rec({ output_objects: true, dont_print: true })
  app.listen(PORT, () => {
    console.log(`Force listening on ${PORT}`)
    console.log('Visit a page in your browser to record API requests')
  })
}

if (module === require.main) start()
