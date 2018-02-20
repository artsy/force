moment = require 'moment'
{ compact } = require 'underscore'

UNITS = [
  { send: 'months', label: 'mos' }
  { send: 'days', label: 'day' }
  { send: 'hours', label: 'hr' }
  { send: 'minutes', label: 'min' }
  { send: 'seconds', label: 'sec' }
]

pad = (n, p = 2) ->
  ('00' + n).slice -(p)

compute = (duration) ->
  UNITS.map (unit) ->
    unit.value = pad duration[unit.send]()
    unit

compacted = (computed) ->
  compact computed.map (unit) ->
    if unit.send is 'months'
      unit if unit.value isnt '00'
    else
      unit

render = (parsed) ->
  diff = parsed.diff moment()
  return false if diff < 0
  duration = moment.duration diff
  compacted compute duration

module.exports = (timestamp) ->
  parsed = moment.utc timestamp
  render parsed
