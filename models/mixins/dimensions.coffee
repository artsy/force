_ = require 'underscore'
module.exports =
  dimensions: (metric = @get('metric')) ->
    @get('dimensions')[metric] if metric

  # Wrap only X Y/Z; leave X/Y alone
  superscriptFractions: (string) ->
    string?.replace /(\d+)(?:\s+)(\d+\/\d+)/g, '$1 <sup>$2</sup>'

  fractionToDecimal: (string) ->
    split     = string.split '/'
    decimal   = parseInt(split[0], 10) / parseInt(split[1], 10)
    if decimal is Infinity
      throw new Error('Division by zero')
    decimal

  expressAsMetric: (string) ->
    string?.replace /((\d+)(?:\s+)(\d+\/\d+)|(\d+\/\d+))/g, (match) =>
      try
        # Replace the fractions with decimal representations
        match = match.replace /(\d+\/\d+)/g, @fractionToDecimal
        # Collapse either side of the measurement with addition
        _.map(match.split(' × '), (x) ->
          nums = _.map(x.split(' '), (y) -> parseFloat(y))
          _.reduce nums, ((memo, num) -> memo + num), 0
        ).join ' × '
      catch
        match
