_ = require 'underscore'
inquirer = require 'inquirer'
JSONPage = require './index'
require('../../lib/setup_sharify')
sd = require('sharify').data

[name, environment, path] = process.argv.slice 2
bucket = sd.S3_BUCKET

try
  data = require path
catch error
  console.log 'NOTE: paths are relative'
  return console.log error

display = ['..'].concat(_.last path.split('/'), 2).join '/'

inquirer.prompt [
  type: 'confirm'
  name: 'confirm'
  message: "Update `#{name}` in the bucket `#{bucket}` with data from `#{display}`?"
], ({ confirm }) ->
  if confirm

    page = new JSONPage name: name, bucket: bucket
    page.set data, (err, { req }) ->
      return console.log(err) if err?

      console.log "Updated `#{req.url}`."
