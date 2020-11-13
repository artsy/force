import rewire from "rewire"
import sinon from "sinon"
import express from "express"
import jade from "jade"
import fs from "fs"
import { backboneErrorHandlerMiddleware } from "../../../lib/middleware/backboneErrorHandler"

describe("Backbone error", function () {
  beforeEach(function () {
    this.req = {}
    this.res = { status: sinon.stub() }
    this.next = sinon.stub()
    backboneErrorHandlerMiddleware(this.req, this.res, this.next)
  })

  it("adds a backbone error handler helper", function () {
    this.res.backboneError({}, { text: '{"error":"Foo Err"}' })
    this.next.args[1][0].toString().should.containEql("Foo Err")
  })

  it("handles generic stringy errors", function () {
    this.res.backboneError({}, { text: "Foo Err" })
    this.next.args[1][0].toString().should.containEql("Foo Err")
  })

  it("turns 403 errors into 404s", function () {
    this.res.backboneError({}, { status: 403 })
    this.next.args[1][0].toString().should.containEql("Not Found")
  })

  it("attaches API status to the errors", function () {
    this.res.backboneError({}, { status: 404 })
    this.next.args[1][0].status.should.equal(404)
  })

  it("tries stack if its not an HTTP error", function () {
    this.res.backboneError({}, { stack: "foo" })
    this.next.args[1][0].message.should.equal("foo")
    this.next.args[1][0].status.should.equal(500)
  })

  it("tries message if its not an HTTP error", function () {
    this.res.backboneError({}, { message: "foo" })
    this.next.args[1][0].message.should.equal("foo")
    this.next.args[1][0].status.should.equal(500)
  })

  it("will even try stringifying before unknown", function () {
    this.res.backboneError({}, { foo: "bar" })
    this.next.args[1][0].message.should.equal('{"foo":"bar"}')
    this.next.args[1][0].status.should.equal(500)
  })
})
