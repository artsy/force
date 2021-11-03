/* eslint-disable jest/no-done-callback */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const express = require("express")
const request = require("supertest")
const CurrentUser = require("../../../models/current_user")
const { Profile } = require("../../../models/profile")

const newLayoutPartnerProfiles = _.map(
  ["gallery_one", "gallery_two", "gallery_three"],
  layout =>
    new Profile(
      fabricate("partner_profile", {
        owner: fabricate("partner", { profile_layout: layout }),
      })
    )
)

const deprecatedLayoutPartnerProfiles = _.map(
  ["gallery_default", "gallery_deprecated"],
  layout =>
    new Profile(
      fabricate("partner_profile", {
        owner: fabricate("partner", { profile_layout: layout }),
      })
    )
)

const institutionLayoutPartnerProfile = new Profile(
  fabricate("partner_profile", {
    owner: fabricate("partner", { profile_layout: "institution" }),
  })
)

const prepareLocals = profile =>
  function (req, res, next) {
    res.locals.profile = profile
    res.locals.sd = {}
    res.locals.asset = function () {}
    return next()
  }

const loginAsUser = function (req, res, next) {
  req.user = new CurrentUser(fabricate("user", { type: "User" }))
  return next()
}

const loginAsAdmin = function (req, res, next) {
  req.user = new CurrentUser(fabricate("user", { type: "Admin" }))
  return next()
}

const partner2 = require("../index")
const partner1 = (req, res, next) => res.send("partner1")

const partnerRoutes = [
  "/:id",
  "/:id/overview",
  "/:id/shows",
  "/:id/works",
  "/:id/collection",
  "/:id/shop",
  "/:id/artists",
  "/:id/artist/:artistId",
  "/:id/articles",
  "/:id/contact",
  "/:id/about",
]

const subscriptions2_0Specs = function (partnerRoutes) {
  _.each(_.without(partnerRoutes, "/:id/overview"), route =>
    it(`renders partner2 for ${route}`, function (done) {
      request(this.app)
        .get(
          route.replace(":id", "partner-id").replace(":artistId", "artist-id")
        )
        .expect(res => res.text.should.startWith("<!DOCTYPE html>"))
        .expect(200)
        .end((err, res) => (err ? done.fail(err) : done()))
    })
  )

  it("redirects to /:id for /:id/overview", function (done) {
    request(this.app)
      .get("/partner-id/overview")
      .expect(res => res.text.should.endWith("Redirecting to /partner-id"))
      .expect(302)
      .end((err, res) => (err ? done.fail(err) : done()))
  })
}

const subscriptions1_0Specs = partnerRoutes =>
  _.each(partnerRoutes, route =>
    it(`renders partner1 for ${route}`, function (done) {
      request(this.app)
        .get(
          route.replace(":id", "partner-id").replace(":artistId", "artist-id")
        )
        .expect("partner1")
        .expect(200)
        .end((err, res) => (err ? done.fail(err) : done()))
    })
  )

// For institution profiles everyone except for Admin should see partner1 layouts
const itShouldBeLikeSubscriptions2_0ForInstitutions = function (partnerRoutes) {
  context("public", function () {
    beforeEach(function () {
      this.app.use(partner2)
      return this.app.use(partner1)
    })

    subscriptions2_0Specs(partnerRoutes)
  })

  context("user", function () {
    beforeEach(function () {
      this.app.use(loginAsUser)
      this.app.use(partner2)
      return this.app.use(partner1)
    })

    subscriptions2_0Specs(partnerRoutes)
  })

  context("admin", function () {
    beforeEach(function () {
      this.app.use(loginAsAdmin)
      this.app.use(partner2)
      return this.app.use(partner1)
    })

    subscriptions2_0Specs(partnerRoutes)
  })
}

// Shared examples for Subscriptions 2.0
const itShouldBehaveLikeSubscriptions2_0 = function (partnerRoutes) {
  context("public", function () {
    beforeEach(function () {
      this.app.use(partner2)
      return this.app.use(partner1)
    })

    return subscriptions2_0Specs(partnerRoutes)
  })

  context("user", function () {
    beforeEach(function () {
      this.app.use(loginAsUser)
      this.app.use(partner2)
      return this.app.use(partner1)
    })

    subscriptions2_0Specs(partnerRoutes)
  })

  context("admin", function () {
    beforeEach(function () {
      this.app.use(loginAsAdmin)
      this.app.use(partner2)
      return this.app.use(partner1)
    })

    subscriptions2_0Specs(partnerRoutes)
  })
}

// Shared examples for old subscriptions
const itShouldBehaveLikeSubscriptions1_0 = function (partnerRoutes) {
  context("public", function () {
    beforeEach(function () {
      this.app.use(partner2)
      this.app.use(partner1)
    })

    subscriptions1_0Specs(partnerRoutes)
  })

  context("user", function () {
    beforeEach(function () {
      this.app.use(loginAsUser)
      this.app.use(partner2)
      this.app.use(partner1)
    })

    subscriptions1_0Specs(partnerRoutes)
  })

  context("admin", function () {
    beforeEach(function () {
      this.app.use(loginAsAdmin)
      this.app.use(partner2)
      this.app.use(partner1)
    })

    subscriptions1_0Specs(partnerRoutes)
  })
}

describe.skip("partner2 index", function () {
  _.each(newLayoutPartnerProfiles, profile =>
    context(
      `with partner profile layout ${profile.get("owner").profile_layout}`,
      function () {
        beforeEach(function () {
          this.app = express()
          this.app.use(prepareLocals(profile))
        })

        itShouldBehaveLikeSubscriptions2_0(partnerRoutes)
      }
    )
  )

  _.each(deprecatedLayoutPartnerProfiles, profile =>
    context(
      `with partner profile layout ${profile.get("owner").profile_layout}`,
      function () {
        beforeEach(function () {
          this.app = express()
          this.app.use(prepareLocals(profile))
        })

        itShouldBehaveLikeSubscriptions1_0(partnerRoutes)
      }
    )
  )

  return context("with partner profile layout institution", function () {
    beforeEach(function () {
      this.app = express()
      return this.app.use(prepareLocals(institutionLayoutPartnerProfile))
    })

    itShouldBeLikeSubscriptions2_0ForInstitutions(partnerRoutes)
  })
})
