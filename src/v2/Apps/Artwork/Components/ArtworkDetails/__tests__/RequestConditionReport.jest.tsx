import { graphql } from "react-relay"

import { createTestEnv } from "v2/DevTools/createTestEnv"

import { RequestConditionReportQueryResponse } from "v2/__generated__/RequestConditionReportQuery.graphql"
import { AnalyticsSchema as Schema } from "v2/System"
import { RequestConditionReportFragmentContainer } from "../RequestConditionReport"
import { RequestConditionReportTestPage } from "./Utils/RequestConditionReportTestPage"
import { mediator } from "lib/mediator"
import { Toasts, ToastsProvider } from "@artsy/palette"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ title, children }) => (
      <div>
        {title}
        <div>{children}</div>
      </div>
    ),
  }
})

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: RequestConditionReportTestPage,
    Component: (props: RequestConditionReportQueryResponse) => (
      <ToastsProvider>
        <Toasts />
        {/* @ts-ignore */}
        <RequestConditionReportFragmentContainer {...props} />
      </ToastsProvider>
    ),
    query: graphql`
      query RequestConditionReportTestQuery
        @raw_response_type
        @relay_test_operation {
        me {
          ...RequestConditionReport_me
        }

        artwork(id: "artwork-id") {
          ...RequestConditionReport_artwork
        }
      }
    `,
    defaultData: {
      me: { internalID: "user-id", email: "user@example.com" },
      artwork: {
        internalID: "artwork-id",
        slug: "artwork-slug",
        saleArtwork: { internalID: "sale-artwork-id" },
      },
    },
    defaultMutationResults: {
      requestConditionReport: {},
    },
    systemContextProps: { mediator },
  })
}

describe("RequestConditionReport", () => {
  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeAll(() => {
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
      subject: Schema.Subject.RequestConditionReport,
      context_page: Schema.PageName.ArtworkPage,
      context_module: Schema.ContextModule.AboutTheWorkCondition,
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
      context_page_owner_type: "Artwork",
      sale_artwork_id: "sale-artwork-id",
    })

    expect(page.text()).toContain("Condition report requested")
  })

  it("shows a toast if the mutation fails", async () => {
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
        mode: "login",
        redirectTo: "http://localhost/",
        contextModule: "aboutTheWork",
        intent: "requestConditionReport",
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
