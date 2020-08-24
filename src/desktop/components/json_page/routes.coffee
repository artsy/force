path = require 'path'
fs = require 'fs'

module.exports = (page) ->
  data: (req, res, next) ->
    page.get (err, data) ->
      return next err if err
      res.send data

  edit: (req, res, next) ->
    page.get (err, data) ->
      return next err if err

      res.locals.sd.JSON_PAGE_DATA = page.data
      res.locals.sd.PATHS = page.paths

      # Render the template irrespective of app/views context
      file = path.resolve(__dirname, './templates/index.jade')
      template = require('jade').compileFile(file)
      res.write template(res.locals) # Pass locals that were set up in middlewares
      res.end()

  upload: (req, res, next) ->
    page.set req.body, (err, response) ->
      if err then next(err) else res.send 200, msg: 'success'
