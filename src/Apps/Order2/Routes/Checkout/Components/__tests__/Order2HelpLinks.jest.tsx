import { fireEvent, screen } from "@testing-library/dom"
import { Order2HelpLinks } from "Apps/Order2/Routes/Checkout/Components/Order2HelpLinks"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2DetailsPage_Test_Query } from "__generated__/Order2DetailsPage_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { graphql } from "relay-runtime"

jest.unmock("react-relay")

describe("Order2HelpLinks", () => {
  const { renderWithRelay } = setupTestWrapperTL<Order2DetailsPage_Test_Query>({
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
      "_blank",
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
      renderWithRelay()

      expect(screen.getByText("Visit our help center")).toBeInTheDocument()

      fireEvent.click(screen.getByText("Visit our help center"))

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Visit our help center",
        type: "button",
        flow: "buy now",
      })
    })

    it("tracks opening the contact specialist modal", () => {
      renderWithRelay()

      expect(screen.getByText("ask a question")).toBeInTheDocument()

      fireEvent.click(screen.getByText("ask a question"))

      expect(mockTrackEvent).toBeCalledWith({
        action_type: "Click",
        subject: "ask a specialist",
        type: "button",
        flow: "buy now",
      })
    })
  })
})
