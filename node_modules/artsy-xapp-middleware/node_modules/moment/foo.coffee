moment = require './moment'

m = moment().add({d: 2})
console.log 'before startOf', m
m.startOf('day')
console.log m
console.log m.calendar()
console.log m.format('dddd [at] LT')

# console.log m
# console.log m.format('HH:mm:ss')
