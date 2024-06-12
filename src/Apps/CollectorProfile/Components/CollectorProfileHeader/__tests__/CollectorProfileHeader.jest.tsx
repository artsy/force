import { Breakpoint } from "@artsy/palette"
import { screen } from "@testing-library/react"
import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("CollectorProfileHeader", () => {
  const getWrapper = (breakpoint: Breakpoint = "lg") => {
    return setupTestWrapperTL({
      Component: (props: any) => (
        <MockBoot breakpoint={breakpoint}>
          <CollectorProfileHeaderFragmentContainer {...props} />
        </MockBoot>
      ),
      query: graphql`
        query CollectorProfileHeaderTestQuery @relay_test_operation {
          me {
            ...CollectorProfileHeader_me
          }
        }
      `,
    })
  }

  it("renders the name, location", () => {
    const { renderWithRelay } = getWrapper()

    renderWithRelay({
      Me: () => ({
        name: "Darth Vader",
        location: {
          display: "New York",
        },
      }),
    })

    expect(screen.getByText("Darth Vader")).toBeInTheDocument()
    expect(screen.getByText("New York")).toBeInTheDocument()
  })

  describe("the settings button", () => {
    it("renders the settings and favorites links", () => {
      const { renderWithRelay } = getWrapper()

      renderWithRelay()

      expect(screen.getByText("Settings")).toBeInTheDocument()
      expect(screen.getByText("Favorites")).toBeInTheDocument()
    })
  })
})
