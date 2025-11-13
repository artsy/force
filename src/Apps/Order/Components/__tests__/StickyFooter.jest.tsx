import {
  StickyFooter,
  StickyFooterWithInquiry,
} from "Apps/Order/Components/StickyFooter"
import { MockBoot } from "DevTools/MockBoot"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

const trackEvent = jest.fn()

describe("Sticky footer", () => {
  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("handles FAQ modal", () => {
    render(
      <MockBoot>
        <StickyFooterWithInquiry
          orderType="OFFER"
          artworkID="whatever"
          orderSource="artwork_page"
        />
      </MockBoot>
    )

    const helpCenterLink = screen.getByRole("button", {
      name: "Visit our help center",
    })
    fireEvent.click(helpCenterLink)

    expect(window.open).toHaveBeenCalledWith(
      "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
      "_blank"
    )
  })

  it("handles contact specialist modal", () => {
    const showInquiry = jest.fn()

    render(
      <MockBoot>
        <SystemContextProvider>
          <StickyFooter
            orderSource="artwork_page"
            orderType="OFFER"
            artworkID="whatever"
            showInquiry={showInquiry}
            hideInquiry={jest.fn()}
            isInquiryVisible={false}
            inquiryComponent={<></>}
          />
        </SystemContextProvider>
      </MockBoot>
    )

    const askQuestionLink = screen.getByRole("button", {
      name: "ask a question.",
    })
    fireEvent.click(askQuestionLink)

    expect(showInquiry).toHaveBeenCalledWith({ askSpecialist: true })
  })

  it("displays the 'Need help?' message", () => {
    render(
      <MockBoot>
        <StickyFooterWithInquiry
          orderSource="artwork_page"
          orderType="OFFER"
          artworkID="whatever"
        />
      </MockBoot>
    )
    expect(screen.getByText(/Need help/)).toBeInTheDocument()
    expect(screen.getByText("Visit our help center")).toBeInTheDocument()
    expect(screen.getByText("ask a question.")).toBeInTheDocument()
  })

  describe("for private sale orders", () => {
    it("renders private sale email link", () => {
      render(
        <MockBoot>
          <StickyFooterWithInquiry
            orderSource="private_sale"
            orderType="BUY"
            artworkID="whatever"
          />
        </MockBoot>
      )
      const privateSalesEmail = screen.getByRole("button", {
        name: "privatesales@artsy.net",
      })

      expect(privateSalesEmail).toBeInTheDocument()
    })
  })

  describe("Analytics", () => {
    describe("on a make offer page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        render(
          <MockBoot>
            <StickyFooterWithInquiry
              orderSource="artwork_page"
              orderType="OFFER"
              artworkID="whatever"
            />
          </MockBoot>
        )
        const helpCenterLink = screen.getByRole("button", {
          name: "Visit our help center",
        })
        fireEvent.click(helpCenterLink)

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "make offer",
          type: "button",
        })
      })

      it("tracks click on 'ask a question'", () => {
        render(
          <MockBoot>
            <SystemContextProvider>
              <StickyFooterWithInquiry
                orderSource="artwork_page"
                orderType="OFFER"
                artworkID="whatever"
              />
            </SystemContextProvider>
          </MockBoot>
        )
        const askQuestionLink = screen.getByRole("button", {
          name: "ask a question.",
        })
        fireEvent.click(askQuestionLink)

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "ask a specialist",
          flow: "make offer",
          type: "button",
        })
      })
    })

    describe("on a buy now page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        render(
          <MockBoot>
            <StickyFooterWithInquiry
              orderSource="artwork_page"
              orderType="BUY"
              artworkID="whatever"
            />
          </MockBoot>
        )
        const helpCenterLink = screen.getByRole("button", {
          name: "Visit our help center",
        })
        fireEvent.click(helpCenterLink)

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "buy now",
          type: "button",
        })
      })

      it("tracks click on 'ask a question'", () => {
        render(
          <MockBoot>
            <SystemContextProvider>
              <StickyFooterWithInquiry
                orderSource="artwork_page"
                orderType="BUY"
                artworkID="whatever"
              />
            </SystemContextProvider>
          </MockBoot>
        )
        const askQuestionLink = screen.getByRole("button", {
          name: "ask a question.",
        })
        fireEvent.click(askQuestionLink)

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "ask a specialist",
          flow: "buy now",
          type: "button",
        })
      })
    })
  })
})
