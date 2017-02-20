request = require 'superagent'
express = require 'express'
{ spawn } = require "child_process"

child = null
s3 = express()

s3.get '/sitemap.xml', (req, res) ->
  res.send '<sitemapindex><sitemap><loc>https://artsy.net/sitemap-things-1.xml</loc></sitemap></sitemapindex>'

s3.get '/sitemap-things-1.xml', (req, res) ->
  res.send '<urlset><url><loc>https://artsy.net/thing/1</loc></url></urlset>'

startServer = (callback) ->
  envVars =
    SITEMAP_BASE_URL: 'http://localhost:5001'
    NODE_ENV: 'test'
    PORT: 5000
  envVars[k] = val for k, val of process.env when not envVars[k]?
  child = spawn "make", ["s"],
    customFds: [0, 1, 2]
    stdio: ["ipc"]
    env: envVars
  child.on "message", callback
closeServer = => child.kill()

xdescribe 'Setup', ->

  before (done) ->
    @server = s3.listen 5001, -> startServer -> done()

  after ->
    @server.close()
    closeServer()

  it 'proxies sitemap index request to s3', (done) ->
    request.get('http://localhost:5000/sitemap.xml').end (err, res) ->
      res.text.should.containEql 'artsy.net/sitemap-things-1.xml'
      done()

  it 'proxies sitemap requests to s3', (done) ->
    request.get('http://localhost:5000/sitemap-things-1.xml').end (err, res) ->
      res.text.should.containEql '/thing/1'
      done()
