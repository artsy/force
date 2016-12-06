should = require 'should'
AsciiFolder = require '../ascii_folder'

describe 'AsciiFolder', ->

  describe '#fold', ->

    it 'converts accents and diacritics to simple 7-bit ascii', ->
      AsciiFolder.fold('Zürich').should.equal 'Zurich'
      AsciiFolder.fold('åäâáàã').should.equal 'aaaaaa'
