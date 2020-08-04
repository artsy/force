/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const request = require("superagent")
const express = require("express")
const { spawn } = require("child_process")

let child = null
const gravity = express()
gravity.get("/api/v1/me", (req, res) => res.send({ name: "Craig" }))
gravity.get("/userdontknowwhatitis", (req, res) => res.send(404))
gravity.get("/post", (req, res) =>
  res.send({ token: req.get("x-access-token") })
)
const startServer = function (callback) {
  const envVars = {
    NODE_ENV: "test",
    APP_URL: "http://localhost:5000",
    PORT: 5000,
  }
  for (let k in process.env) {
    const val = process.env[k]
    if (envVars[k] == null) {
      envVars[k] = val
    }
  }
  child = spawn("make", ["s"], {
    customFds: [0, 1, 2],
    stdio: ["ipc"],
    env: envVars,
  })
  return child.on("message", callback)
}
const closeServer = () => child.kill()

xdescribe("Setup", function () {
  before(function (done) {
    return (this.server = gravity.listen(5001, () => startServer(() => done())))
  })

  after(function () {
    this.server.close()
    return closeServer()
  })

  return it("proxies certain requests to Gravity if they are supported", done =>
    request.get("http://localhost:5000/api/v1/me").end(function (err, res) {
      res.body.name.should.equal("Craig")
      return done()
    }))
})
