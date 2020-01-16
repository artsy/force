import express from "express"
import Nightmare from "nightmare"
import moment from "moment"
import cheerio from "cheerio"
import url from "url"
import chalk from "chalk"
import bodyParser from "body-parser"
import cors from "cors"
import { fabricate } from "@artsy/antigravity"

const {
  ACCEPTANCE_TIMEOUT,
  API_URL,
  APP_URL,
  METAPHYSICS_ENDPOINT,
  POSITRON_URL,
} = process.env
const FORCE_PORT = url.parse(APP_URL).port
const GRAVITY_PORT = url.parse(API_URL).port
const METAPHYSICS_PORT = url.parse(METAPHYSICS_ENDPOINT).port
const POSITRON_PORT = url.parse(POSITRON_URL).port
const TIMEOUT = Number(ACCEPTANCE_TIMEOUT)

const servers = []
let force, gravity, metaphysics, positron, browser

// Setup function for end to end tests. It starts express apps that mock the
// downstream services Force uses such as Gravity and Metaphysics. It's then
// up to the test to add routing behavior to those apps.
//
// e.g. gravity.get('/api/v1/artwork/:id', () => ...)
//
export const setup = async () => {
  gravity = await startGravity(GRAVITY_PORT)
  positron = await startApp(POSITRON_PORT)
  metaphysics = await startApp(METAPHYSICS_PORT)
  force = await startForce(FORCE_PORT)
  browser = mixinBrowserHelpers(
    Nightmare({
      waitTimeout: TIMEOUT,
      gotoTimeout: TIMEOUT,
      loadTimeout: TIMEOUT,
      executionTimeout: TIMEOUT,
      typeInterval: 10,
    })
  )

  // Make sure cancelling the process cleans up the servers/Electron
  process.on("exit", teardown)

  // Nightmare bubbles uncaught errors to the process causing intermittent
  // ECONNX errors for open requests despite using `browser.end()` below.
  // To bring some sanity back to the situation we are turning these into
  // warnings instead of failing tests.
  browser.on("page", warn)
  process.removeAllListeners("uncaughtException")
  process.on("uncaughtException", warn)

  return { force, gravity, metaphysics, positron, browser }
}

// Closes all of the mocked API servers
export const teardown = async () => {
  try {
    await browser.end()
    await Promise.all(
      servers.map(server => new Promise(resolve => server.close(resolve)))
    )
  } catch (e) {
    warn(e)
  }
}

// Convenience Promise wrapped timeout use via `await sleep(1000)`
export const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const mixinBrowserHelpers = browser => {
  // Steps to log in through the auth modal
  browser.login = async () => {
    await browser.el(".mlh-login")
    await browser
      .click(".mlh-login")
      .type("#auth-body [name=email]", "craig@craig.com")
      .type("#auth-body [name=password]", "foobar")
      .click("#auth-submit")
    await browser.el(".mlh-user-name")
  }

  // Visits a page and returns a jQuery-like `$` API
  browser.page = path =>
    browser
      .goto(`${APP_URL}${path}`)
      .evaluate(() => document.documentElement.innerHTML)
      .then(cheerio.load)

  // Wait for an element to appear and return the inner html
  browser.el = async selector => {
    await browser.wait(selector)
    const html = await browser.evaluate(selector => {
      return document.querySelector(selector).innerHTML
    }, selector)
    return html
  }
  return browser
}

const warn = e => console.log(chalk.red(e))

const startForce = port =>
  new Promise((resolve, reject) => {
    const app = require("../../../")
    servers.push(
      app.listen(port, err => {
        if (err) reject(err)
        else resolve(app)
      })
    )
  })

const newApp = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  return app
}

const startGravity = port =>
  new Promise((resolve, reject) => {
    const app = newApp()
    app.post("/oauth2/access_token", (req, res) => {
      res.send(require("../fixtures/gravity/access_token.json"))
    })
    app.get("/api/v1/me/authentications", (req, res) => {
      res.send(require("../fixtures/gravity/authentications.json"))
    })
    app.get("/api/v1/me", (req, res) => {
      res.send(require("../fixtures/gravity/me.json"))
    })
    app.get("/api/v1/xapp_token", (req, res) => {
      res.send({
        xapp_token: "xapp-token",
        expires_in: moment()
          .add(100, "days")
          .utc()
          .format(),
      })
    })
    app.get("/api/v1/profile/pace-gallery", (req, res) => {
      res.send(
        fabricate("profile", {
          owner_type: "PartnerGallery",
          owner: fabricate("partner", {
            id: "pace-gallery",
            profile_layout: "gallery_one",
          }),
        })
      )
    })
    servers.push(
      app.listen(port, err => {
        if (err) reject(err)
        else resolve(app)
      })
    )
  })

const startApp = port =>
  new Promise((resolve, reject) => {
    const app = newApp()
    servers.push(
      app.listen(port, err => {
        if (err) reject(err)
        else resolve(app)
      })
    )
  })
