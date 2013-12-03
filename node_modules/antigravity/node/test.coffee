{ fabricate, server } = require '../'
server.listen 5000, -> console.log 'listening on 5000'
console.log fabricate 'artwork', title: 'Andy Foobar Masterpiece'