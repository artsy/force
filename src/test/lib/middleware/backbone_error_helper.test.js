/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const sinon = require("sinon")
const express = require("express")
const jade = require("jade")
const fs = require("fs")
const backboneErrorHelper = rewire(
  "../../../lib/middleware/backbone_error_helper"
)

describe("Backbone error", function () {
  beforeEach(function () {
    this.req = {}
    this.res = { status: sinon.stub() }
    this.next = sinon.stub()
    return backboneErrorHelper(this.req, this.res, this.next)
  })

  it("adds a backbone error handler helper", function () {
    this.res.backboneError({}, { text: '{"error":"Foo Err"}' })
    return this.next.args[1][0].toString().should.containEql("Foo Err")
  })

  it("handles generic stringy errors", function () {
    this.res.backboneError({}, { text: "Foo Err" })
    return this.next.args[1][0].toString().should.containEql("Foo Err")
  })

  it("turns 403 errors into 404s", function () {
    this.res.backboneError({}, { status: 403 })
    return this.next.args[1][0].toString().should.containEql("Not Found")
  })

  it("attaches API status to the errors", function () {
    this.res.backboneError({}, { status: 404 })
    return this.next.args[1][0].status.should.equal(404)
  })

  it("tries stack if its not an HTTP error", function () {
    this.res.backboneError({}, { stack: "foo" })
    this.next.args[1][0].message.should.equal("foo")
    return this.next.args[1][0].status.should.equal(500)
  })

  it("tries message if its not an HTTP error", function () {
    this.res.backboneError({}, { message: "foo" })
    this.next.args[1][0].message.should.equal("foo")
    return this.next.args[1][0].status.should.equal(500)
  })

  return it("will even try stringifying before unknown", function () {
    this.res.backboneError({}, { foo: "bar" })
    this.next.args[1][0].message.should.equal('{"foo":"bar"}')
    return this.next.args[1][0].status.should.equal(500)
  })
})
