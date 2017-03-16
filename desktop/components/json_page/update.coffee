_ = require 'underscore'
fs = require 'fs'
inquirer = require 'inquirer'
JSONPage = require './index'
sd = require('sharify').data

[name, environment, path] = process.argv.slice 2
bucket = sd.S3_BUCKET

try
  fixture = require.resolve path
catch
  return console.log 'Cannot find the file you want to update.'

display = ['..'].concat(_.last path.split('/'), 2).join '/'

inquirer.prompt [
  type: 'confirm'
  name: 'confirm'
  message: "Update `#{display}` with data from `#{name}` in the bucket `#{bucket}`?"
], ({ confirm }) ->
  if confirm

    page = new JSONPage name: name, bucket: bucket
    page.get (err, data) ->

      return console.log(err) if err?

      json = JSON.stringify data, null, 4
      fs.writeFileSync fixture, json

      console.log 'Updated.'
