_ = require 'underscore'
inquirer = require 'inquirer'
JSONPage = require './index'

[name, environment, path] = process.argv.slice 2
bucket = "force-#{environment or 'staging'}"

try
  data = require path
catch error
  return console.log 'Cannot find the data.'

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
