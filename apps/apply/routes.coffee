request = require 'superagent'
Referrer = require 'referer-parser'

@index = (req, res) ->
  res.locals.sd.REFERRER = referrer = req.get 'Referrer'
  res.locals.sd.MEDIUM = new Referrer(referrer).medium if referrer
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
