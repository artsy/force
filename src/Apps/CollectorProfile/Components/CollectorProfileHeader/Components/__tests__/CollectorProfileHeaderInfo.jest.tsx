import { screen } from "@testing-library/react"
import { CollectorProfileHeaderInfoFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderInfo"
import { MockBoot } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("CollectorProfileHeaderInfo", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot breakpoint="lg">
        <CollectorProfileHeaderInfoFragmentContainer {...props} />
      </MockBoot>
    ),
    query: graphql`
      query CollectorProfileHeaderInfoTestQuery @relay_test_operation {
        me {
          ...CollectorProfileHeaderInfo_me
        }
      }
    `,
  })

  it("renders all the info fields when all data is available", () => {
    renderWithRelay(mockResolversAllFields, false)

    expect(screen.getByTitle("Location")).toBeInTheDocument()
    expect(screen.getByText("New York, NY, USA")).toBeInTheDocument()

    expect(screen.getByTitle("Briefcase")).toBeInTheDocument()
    expect(screen.getByText("Collector")).toBeInTheDocument()

    expect(screen.getByTitle("Institution")).toBeInTheDocument()
    expect(screen.getByText("Museum")).toBeInTheDocument()
  })

  it("renders the info field when some data is available", () => {
    renderWithRelay(mockResolversSomeFields, false)

    expect(screen.getByTitle("Location")).toBeInTheDocument()
    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument()

    // Positions is not available
    expect(screen.queryByTitle("Briefcase")).not.toBeInTheDocument()

    expect(screen.getByTitle("Institution")).toBeInTheDocument()
    expect(screen.getByText("Gallery")).toBeInTheDocument()
  })
})

const mockResolversAllFields = {
  Me: () => ({
    location: {
      display: "New York, NY, USA",
    },
    profession: "Collector",
    otherRelevantPositions: "Museum",
  }),
}

const mockResolversSomeFields = {
  Me: () => ({
    location: {
      display: "Berlin, Germany",
    },
    profession: null,
    otherRelevantPositions: "Gallery",
  }),
}
