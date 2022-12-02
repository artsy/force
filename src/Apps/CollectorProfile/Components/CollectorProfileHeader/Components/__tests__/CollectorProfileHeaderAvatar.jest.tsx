import { screen } from "@testing-library/react"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import { MockBoot } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("CollectorProfileHeaderAvatar", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot breakpoint="lg">
        <CollectorProfileHeaderAvatarFragmentContainer {...props} />
      </MockBoot>
    ),
    query: graphql`
      query CollectorProfileHeaderAvatarTestQuery @relay_test_operation {
        me {
          ...CollectorProfileHeaderAvatar_me
        }
      }
    `,
  })

  it("renders the avatar when there is a picture", () => {
    renderWithRelay(dataMockResolvers, false)

    expect(screen.getByRole("img")).toBeInTheDocument()
  })

  it("renders the icon when there is no picture", () => {
    renderWithRelay({ Me: () => ({ icon: null }) }, false)

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(screen.getByTitle("User")).toBeInTheDocument()
  })
})

const dataMockResolvers = {
  Me: () => ({
    icon: {
      resized: {
        src:
          "https://d32dm0rphc51dk.cloudfront.net/3Q8YQZ7YjJ8ZQ3ZQ8ZQ8ZQ/medium.jpg",
        srcSet:
          "https://d32dm0rphc51dk.cloudfront.net/3Q8YQZ7YjJ8ZQ3ZQ8ZQ8ZQ/medium.jpg",
      },
    },
  }),
}
