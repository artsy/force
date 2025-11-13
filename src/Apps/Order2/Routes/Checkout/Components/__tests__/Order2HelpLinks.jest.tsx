import { Order2HelpLinks } from "Apps/Order2/Components/Order2HelpLinks"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/dom"
import type { Order2HelpLinks_Test_Query } from "__generated__/Order2HelpLinks_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { graphql } from "relay-runtime"

jest.unmock("react-relay")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "order-id",
    contextPageOwnerSlug: "page-owner-slug",
    contextPageOwnerType: "page-owner-type",
  })),
}))

describe("Order2HelpLinks", () => {
  const { renderWithRelay } = setupTestWrapperTL<Order2HelpLinks_Test_Query>({
    Component: (props: any) => (
      <Order2HelpLinks
        order={props.me.order}
        artworkID="artwork-id"
        hideInquiry={jest.fn()}
        showInquiry={props.showInquiry || jest.fn}
        inquiryComponent={<></>}
        isInquiryVisible={false}
        {...props}
      />
    ),
    query: graphql`
      query Order2HelpLinks_Test_Query @raw_response_type {
        me {
          order(id: "123") {
            ...Order2HelpLinks_order
          }
        }
      }
    `,
  })

  it("displays 'Need Help' message", () => {
    renderWithRelay()

    expect(screen.getByText("Visit our help center")).toBeInTheDocument()
    expect(screen.getByText("ask a question")).toBeInTheDocument()
  })

  it("opens the contact specialist modal", () => {
    const showInquiryMock = jest.fn()

    renderWithRelay({}, { showInquiry: showInquiryMock })

    expect(screen.getByText("ask a question")).toBeInTheDocument()

    fireEvent.click(screen.getByText("ask a question"))

    expect(showInquiryMock).toBeCalledWith({ askSpecialist: true })
  })

  it("opens the help link", () => {
    renderWithRelay()

    expect(screen.getByText("Visit our help center")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Visit our help center"))

    expect(window.open).toHaveBeenCalledWith(
      "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
      "_blank"
    )
  })

  describe("analytics", () => {
    const mockTrackEvent = jest.fn()

    beforeAll(() => {
      ;(useTracking as jest.Mock).mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    afterEach(() => {
      mockTrackEvent.mockReset()
    })

    it("tracks clicks on help link", () => {
      renderWithRelay({}, { contextModule: "context-module" })

      expect(screen.getByText("Visit our help center")).toBeInTheDocument()

      fireEvent.click(screen.getByText("Visit our help center"))

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedVisitHelpCenter",
        context_module: "context-module",
        context_page_owner_id: "order-id",
        context_page_owner_type: "page-owner-type",
        destination_page_owner_slug: "0TO3b000000UessGAC/buy",
        destination_page_owner_type: "articles",
        flow: "Buy now",
      })
    })

    it("tracks opening the contact specialist modal", () => {
      renderWithRelay({}, { contextModule: "context-module" })

      expect(screen.getByText("ask a question")).toBeInTheDocument()

      fireEvent.click(screen.getByText("ask a question"))

      expect(mockTrackEvent).toBeCalledWith({
        action: "clickedAskSpecialist",
        context_module: "context-module",
        context_page_owner_id: "order-id",
        context_page_owner_type: "page-owner-type",
        flow: "Buy now",
      })
    })
  })
})
