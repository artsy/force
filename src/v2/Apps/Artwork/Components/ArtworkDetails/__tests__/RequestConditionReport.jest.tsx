import React from "react"
import { graphql } from "react-relay"

import { createTestEnv } from "v2/DevTools/createTestEnv"

import { RequestConditionReportQueryResponse } from "v2/__generated__/RequestConditionReportQuery.graphql"
import { AnalyticsSchema as Schema } from "v2/Artsy"
import { RequestConditionReportFragmentContainer } from "../RequestConditionReport"
import { RequestConditionReportTestPage } from "./Utils/RequestConditionReportTestPage"
import { mediator } from "lib/mediator"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

const setupTestEnv = () => {
  return createTestEnv({
    Component: (props: RequestConditionReportQueryResponse) => (
      <RequestConditionReportFragmentContainer {...props} />
    ),
    TestPage: RequestConditionReportTestPage,
    defaultData: {
      artwork: {
        internalID: "artwork-id",
        saleArtwork: { internalID: "sale-artwork-id" },
        slug: "artwork-slug",
      },
      me: { email: "user@example.com", internalID: "user-id" },
    },
    defaultMutationResults: {
      requestConditionReport: {},
    },
    query: graphql`
      query RequestConditionReportTestQuery @raw_response_type {
        me {
          ...RequestConditionReport_me
        }

        artwork(id: "artwork-id") {
          ...RequestConditionReport_artwork
        }
      }
    `,
    systemContextProps: { mediator },
  })
}

describe("RequestConditionReport", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
  })

  it("requests a condition report and tracks click event", async () => {
    const env = setupTestEnv()

    env.mutations.useResultsOnce({
      requestConditionReport: {
        conditionReportRequest: { internalID: "condition-report-request-id" },
      },
    })

    const page = await env.buildPage()

    await page.clickRequestConditionReportButton()

    expect(mockPostEvent).toHaveBeenCalledWith({
      action_type: Schema.ActionType.ClickedRequestConditionReport,
      context_module: Schema.ContextModule.AboutTheWorkCondition,
      context_page: Schema.PageName.ArtworkPage,
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
      context_page_owner_type: "Artwork",
      sale_artwork_id: "sale-artwork-id",
      subject: Schema.Subject.RequestConditionReport,
    })

    expect(page.text()).toContain("Condition report requested")
  })

  it("shows a modal if the mutation fails", async () => {
    const env = setupTestEnv()
    env.mutations.useResultsOnce({
      requestConditionReport: null,
    })

    const page = await env.buildPage()

    await page.clickRequestConditionReportButton()

    expect(page.text()).toContain("Something went wrong")
  })

  describe("when unauthenticated", () => {
    it("redirects to login/signup flow and tracks click event", async () => {
      const env = setupTestEnv()

      const page = await env.buildPage({
        mockData: {
          me: null,
        },
      })

      await page.clickLogInButton()

      expect(mediator.trigger).toHaveBeenCalledWith("open:auth", {
        contextModule: "aboutTheWork",
        intent: "requestConditionReport",
        mode: "login",
        redirectTo: "http://localhost/",
      })

      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: Schema.ActionType.Click,
        context_module: Schema.ContextModule.AboutTheWorkCondition,
        context_page: Schema.PageName.ArtworkPage,
        context_page_owner_id: "artwork-id",
        context_page_owner_slug: "artwork-slug",
        context_page_owner_type: "Artwork",
        sale_artwork_id: "sale-artwork-id",
        subject: Schema.Subject.Login,
      })
    })
  })
})
