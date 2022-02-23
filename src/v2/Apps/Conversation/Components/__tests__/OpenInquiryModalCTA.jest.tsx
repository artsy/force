import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { OpenInquiryModalCTAFragmentContainer } from "../OpenInquiryModalCTA"
import { screen, fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

const openInquiryModalFn = jest.fn()

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <OpenInquiryModalCTAFragmentContainer
        conversation={props.me.conversation}
        openInquiryModal={openInquiryModalFn}
      />
    )
  },
  query: graphql`
    query OpenInquiryModalCTA_Test_Query @relay_test_operation {
      me {
        conversation(id: "123") {
          ...OpenInquiryModalCTA_conversation
        }
      }
    }
  `,
})

describe("OpenInquiryModalCTA", () => {
  const mockuseTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders with Make Offer CTA", () => {
    renderWithRelay({
      Conversation: () => ({
        internalID: "internal-test-id",
      }),
    })

    const link = screen.getByRole("link")
    expect(link).toHaveTextContent("The Artsy Guarantee")
    expect(link).toHaveAttribute("href", "/buyer-guarantee")
    expect(screen.getByRole("button")).toHaveTextContent("Make an Offer")
  })

  it("triggers openInquiryModal when clicking in the button", () => {
    renderWithRelay({
      Me: () => ({
        Conversation: () => ({ ahot: "there" }),
      }),
      Conversation: () => ({
        internalID: "internal-test-id",
      }),
    })

    fireEvent.click(screen.getByRole("button"))
    expect(openInquiryModalFn).toHaveBeenCalledTimes(1)
  })
})
