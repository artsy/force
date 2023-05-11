import { screen } from "@testing-library/react"
import { CollectorProfileHeaderInfoFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderInfo"
import { MockBoot } from "DevTools/MockBoot"
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

    expect(screen.getByText("New York, NY, USA")).toBeInTheDocument()
    expect(screen.getByText("Collector")).toBeInTheDocument()
    expect(screen.getByText("Museum")).toBeInTheDocument()
  })

  it("renders the info field when some data is available", () => {
    renderWithRelay(mockResolversSomeFields, false)

    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument()
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
