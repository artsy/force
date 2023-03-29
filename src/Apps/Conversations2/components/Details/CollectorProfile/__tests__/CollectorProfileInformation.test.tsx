import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "utils/test/setupTestWrapper"
import { CollectorProfileInformationTestQuery } from "__generated__/CollectorProfileInformationTestQuery.graphql"
import { CollectorProfileInformation } from "../CollectorProfileInformation"

jest.mock("next/router", () => require("next-router-mock"))

describe("CollectorProfileInformation", () => {
  const { renderWithRelay } =
    setupTestWrapper<CollectorProfileInformationTestQuery>({
      Component: (props) => (
        <CollectorProfileInformation
          collectorProfileType={props.conversation?.fromUser?.collectorProfile!}
        />
      ),
      query: graphql`
        query CollectorProfileInformationTestQuery @relay_test_operation {
          conversation(id: "conversation-id") {
            fromUser {
              collectorProfile {
                ...CollectorProfileInformation_collectorProfileType
              }
            }
          }
        }
      `,
    })

  it("Renders all fields if they exist ", () => {
    renderWithRelay({
      CollectorProfileType: () => ({
        profession: "Developer",
        isActiveInquirer: true,
        isActiveBidder: true,
        confirmedBuyerAt: true,
      }),
    })

    expect(screen.getByText("Developer")).toBeInTheDocument()
    expect(screen.getByText("Confirmed Buyer")).toBeInTheDocument()
    expect(screen.getByText("Bidder")).toBeInTheDocument()
    expect(
      screen.getByText("User has registered for 1+ auctions")
    ).toBeInTheDocument()
  })

  it("Renders only the fields that exist, does not render the ones that do not.", () => {
    renderWithRelay({
      CollectorProfileType: () => ({
        profession: "",
        isActiveBidder: false,
        isActiveInquirer: true,
        confirmedBuyerAt: true,
      }),
    })

    expect(screen.queryByText("Bidder")).not.toBeInTheDocument()
    expect(screen.queryByText("Profession")).not.toBeInTheDocument()
    expect(screen.getByText("Confirmed Buyer")).toBeInTheDocument()
    expect(screen.getByText("Active Inquirer")).toBeInTheDocument()
  })

  it("Toggles ShowMore component and displays or hides collectors bio and collected artists", () => {
    renderWithRelay({
      CollectorProfileType: () => ({
        bio: "This is my bio",
        collectorProfileArtists: {
          name: "ArtisTam",
        },
      }),
    })

    expect(screen.queryByText("This is my bio")).not.toBeInTheDocument()
    expect(screen.queryByText("Artists collected:")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Show more"))
    expect(screen.getByText("This is my bio")).toBeInTheDocument()
    expect(screen.getByText("Artists collected:")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Show less"))
    expect(screen.queryByText("This is my bio")).not.toBeInTheDocument()
    expect(screen.queryByText("Artists collected:")).not.toBeInTheDocument()
  })
})
