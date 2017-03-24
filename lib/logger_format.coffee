chalk = require 'chalk'

module.exports = (tokens, req, res) ->
  console.log tokens.type(req, res)
  status = tokens.status(req, res)
  url = tokens.url(req, res)
  chalk.blue(tokens.method(req, res)) +
    ' ' + (
            if status >= 500
              chalk.red(url + ' ' + status)
            else if status >= 400
              chalk.yellow(url + ' ' + status)
            else
              chalk.green(url + ' ' + status)
          ) +
    ' ' + chalk.cyan(tokens['response-time'](req, res) + 'ms') +
    ' ' + chalk.white(tokens['remote-addr'](req, res)) +
    ' "' + chalk.white(tokens['user-agent'](req, res)) + '"'