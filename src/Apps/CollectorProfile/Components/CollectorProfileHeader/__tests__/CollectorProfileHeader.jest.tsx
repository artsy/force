import { Breakpoint } from "@artsy/palette"
import { screen } from "@testing-library/react"
import { CollectorProfileHeaderFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/CollectorProfileHeader"
import { MockBoot } from "DevTools"
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

  it("renders the name, bio, and member since", () => {
    const { renderWithRelay } = getWrapper()

    renderWithRelay(mockResolvers, false)

    expect(screen.getByText("Darth Vader")).toBeInTheDocument()
    expect(screen.getByText("Member since 1987")).toBeInTheDocument()
    expect(screen.getByText("I AM YOUR FATHER")).toBeInTheDocument()
  })

  describe("the settings button", () => {
    it("renders the settings button in Desktop", () => {
      const { renderWithRelay } = getWrapper()

      renderWithRelay(mockResolvers, false)

      expect(screen.getByText("Settings")).toBeInTheDocument()
    })

    it("navigates when the settings button is pressed", () => {
      const { renderWithRelay } = getWrapper()
      renderWithRelay(mockResolvers, false)

      expect(
        screen
          .getAllByRole("link")
          .find(c => c.textContent?.includes("Settings"))
      ).toHaveAttribute("href", `/settings/edit-settings`)
    })

    it("renders the settings icon in Mobile", () => {
      const { renderWithRelay } = getWrapper("xs")

      renderWithRelay(mockResolvers, false)

      expect(screen.getByTitle("Settings")).toBeInTheDocument()
    })
    it("navigates when the the settings icon in Mobile is pressed", () => {
      const { renderWithRelay } = getWrapper("xs")
      renderWithRelay(mockResolvers, false)

      expect(
        screen
          .getAllByRole("link")
          .find(c => c.textContent?.includes("Settings"))
      ).toHaveAttribute("href", `/settings/edit-settings`)
    })
  })
})

const mockResolvers = {
  Me: () => ({
    name: "Darth Vader",
    bio: "I AM YOUR FATHER",
    createdAt: "1987-06-15T12:34:56+00:00",
  }),
}
