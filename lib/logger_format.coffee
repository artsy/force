chalk = require 'chalk'

module.exports = (tokens, req, res) ->
  url = tokens.url(req, res)
  status = tokens.status(req, res)
  urlStatus = switch
                when status >= 500 then chalk.red(url + ' ' + status)
                when status >= 400 then chalk.yellow(url + ' ' + status)
                when status >= 300 then chalk.cyan(url + ' ' + status)
                when status >=200 then chalk.green(url + ' ' + status)
                else chalk.white(url + ' ' + status)
  chalk.blue(tokens.method(req, res)) +
    ' ' + urlStatus +
    ' ' + chalk.cyan(tokens['response-time'](req, res) + 'ms') +
    ' ' + chalk.white(tokens['remote-addr'](req, res)) +
    ' "' + chalk.white(tokens['user-agent'](req, res)) + '"'