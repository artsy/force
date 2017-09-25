Q = require 'bluebird-q'
knox = require 'knox'
request = require 'superagent'
{ S3_KEY, S3_SECRET, S3_BUCKET } = require '../../config'

module.exports = class JSONPage
  constructor: ({ @name, @paths, @bucket }) ->
    @bucket ?= S3_BUCKET
    throw new Error 'Requires a `name`' unless @name?

  path: ->
    "/json/#{@name}.json"

  client: ->
    @__client__ ?=
      knox.createClient
        key: S3_KEY
        secret: S3_SECRET
        bucket: @bucket

  get: (callback) ->
    Q.promise (resolve, reject) =>
      error = (message) ->
        err = new Error message
        reject err
        callback? err

      request
        # .get "http://#{@bucket}.s3.amazonaws.com#{@path()}"

        # This is using the http-server library to serve the json file I have
        # in the test folder of the marketing_signup_modal app. I find it helpful
        # to use fixture data when you haven't actually uploaded the json file to s3 yet.
        # We will need to remove it and uncomment line 29 when the json data is actually
        # uploaded. https://github.com/indexzero/http-server
        .get "http://10.12.7.97:8080/fixture.json"
        .end (err, res) =>
          if res?.ok
            try
              @data = JSON.parse res?.text
              resolve @data
              callback? null, @data
            catch e
              error e
          else
            error res?.error or err.response

  set: (data, callback) ->
    buffer = new Buffer JSON.stringify(data)
    headers = 'Content-Type': 'application/json', 'x-amz-acl': 'public-read'
    @client().putBuffer buffer, @path(), headers, callback
