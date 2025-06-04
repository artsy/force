import { fireEvent, screen } from "@testing-library/dom"
import { Order2DetailsPage_Test_Query } from "__generated__/Order2DetailsPage_Test_Query.graphql"
import { Order2DetailsHelpLinks } from "Apps/Order2/Routes/Details/Components/Order2DetailsHelpLinks"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "relay-runtime"

jest.unmock("react-relay")

describe("Order2DetailsHelpLinks", () => {
  const { renderWithRelay } = setupTestWrapperTL<Order2DetailsPage_Test_Query>({
    Component: (props: any) => (
      <Order2DetailsHelpLinks
        order={props.me.order}
        artworkID="artwork-id"
        hideInquiry={jest.fn()}
        showInquiry={props.showInquiry}
        inquiryComponent={<></>}
        isInquiryVisible={false}
      />
    ),
    query: graphql`
      query Order2DetailsHelpLinks_Test_Query @raw_response_type {
        me {
          order(id: "123") {
            ...Order2DetailsHelpLinks_order
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

  // TODO: EMI-2494
  // describe("analytics", () => {
  // })
})
