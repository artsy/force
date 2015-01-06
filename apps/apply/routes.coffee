request = require 'superagent'

@index = (req, res) ->
  res.render 'index'

@form = (req, res, next) ->
  request.post('https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8')
    .type('form')
    .send(req.body)
    .end (response) ->
      if (response.ok)
        res.send req.body
      else
        res.status(response.status).send(req.body)
