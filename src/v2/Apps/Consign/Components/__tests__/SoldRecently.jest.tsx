import React from "react"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { tests } from "../SoldRecently"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("v2/Components/Artwork/FillwidthItem", () => () => {
  const FillwidthItem = () => <div />
  return <FillwidthItem />
})

describe("SoldRecently", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint={"lg" as Breakpoint}>
          <tests.SoldRecentlyFragmentContainer
            targetSupply={props.targetSupply}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query SoldRecently_tests_Query {
        targetSupply {
          ...SoldRecently_targetSupply
        }
      }
    `,
  })

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("FillwidthItem").length).toBe(1)
  })

  it("contains additional fields in the carousel artworks", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain('mock-value-for-field-"realizedPrice"')
  })

  // TODO: Wire up tracking
  it("tracks clicks", () => {
    // expect(trackEvent).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     action: "clickedArticleGroup",
    //     context_module: "relatedArticles",
    //     context_page_owner_type: "consign",
    //     destination_page_owner_id: expect.any(String),
    //     destination_page_owner_slug: expect.any(String),
    //     destination_page_owner_type: "article",
    //     type: "thumbnail",
    //   })
    // )
  })
})
