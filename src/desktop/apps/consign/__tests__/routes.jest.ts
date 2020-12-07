import Backbone from "backbone"
import sinon from "sinon"
import request from "superagent"
import { fabricate } from "@artsy/antigravity"
import Analytics from "analytics-node"
import * as routes from "../routes"

const metaphysics = require("lib/metaphysics.coffee")
const CurrentUser = require("../../../models/current_user")

jest.mock("superagent")
jest.mock("analytics-node", () => jest.fn())
jest.mock("lib/metaphysics.coffee")
jest.mock("desktop/apps/consign/helpers", () => ({
  fetchToken: () => "foo-token",
}))

describe("#redirectToSubmissionFlow", () => {
  let req
  let res
  let next

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    req = {
      body: {},
      user: new CurrentUser(fabricate("user")),
    }
    res = { redirect: sinon.stub() }
    next = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  it("redirects to the submission page", async () => {
    await routes.redirectToSubmissionFlow(req, res, next)
    res.redirect.args[0][0].should.eql("/consign/submission")
  })
})

describe("#submissionFlowWithFetch", () => {
  let req
  let res
  let next

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    req = {
      body: {},
      params: { id: "sub-1" },
      user: new CurrentUser(fabricate("user")),
    }
    res = {
      locals: {
        sd: {
          CONVECTION_APP_URL: "https://test-convection.artsy.net",
        },
      },
      render: sinon.stub(),
    }
    next = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  it("sets the correct variables", async () => {
    const artistQuery = {
      artist: {
        id: "andy-warhol",
        name: "Andy Warhol",
      },
    }

    request.get.mockImplementation(() => {
      return {
        set: () => {
          return {
            body: { id: "my-submission" },
          }
        },
      }
    })

    metaphysics.mockImplementation(() => {
      return artistQuery
    })

    await routes.submissionFlowWithFetch(req, res, next)

    res.render.args[0][0].should.eql("submission_flow")
    res.render.args[0][1].user.should.not.eql(undefined)
    res.locals.sd.SUBMISSION.id.should.eql("my-submission")
    res.locals.sd.SUBMISSION_ARTIST_NAME.should.eql("Andy Warhol")
  })

  describe("analytics", () => {
    it("does not track if no user", async () => {
      req.user = null
      const spy = jest.fn()
      Analytics.mockImplementation(() => ({
        track: spy,
      }))
      await routes.submissionFlow(req, res, next)
      expect(spy).not.toHaveBeenCalled()
    })

    it("does not track if no subject and contextPath", async () => {
      req.user = { id: "some-userid" }
      req.query = {}
      const spy = jest.fn()
      Analytics.mockImplementation(() => ({
        track: spy,
      }))
      await routes.submissionFlow(req, res, next)
      expect(spy).not.toHaveBeenCalled()
    })

    it("sends tracking event", async () => {
      req.user = { id: "some-userid" }
      req.query = {
        contextPath: "foo",
        subject: "bar",
      }
      const spy = jest.fn()
      Analytics.mockImplementation(() => ({
        track: spy,
      }))
      await routes.submissionFlow(req, res, next)
      expect(spy).toHaveBeenCalledWith({
        event: "Clicked consign",
        userId: "some-userid",
        properties: {
          context_page_path: "foo",
          flow: "Consignments",
          subject: "bar",
        },
      })
    })
  })
})
