import { MockBoot } from "DevTools/MockBoot"
import { ArtworksRefetchContainer } from "Apps/Partner/Routes/Works"
import { graphql } from "react-relay"
import type { Works_Query } from "__generated__/Works_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => false),
}))

const { renderWithRelay } = setupTestWrapperTL<Works_Query>({
  Component: ({ partner }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <ArtworksRefetchContainer partner={partner!} />
    </MockBoot>
  ),
  query: graphql`
    query Works_Query($partnerId: String!) @relay_test_operation {
      partner(id: $partnerId) {
        ...Works_partner
      }
    }
  `,
  variables: { partnerId: "pontone-gallery" },
})

describe("PartnerArtworks", () => {
  const trackEvent = jest.fn()
  const mockUseRouter = useRouter as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {},
          pathname: "",
        },
      },
    }))
    mockUseFeatureFlag.mockImplementation(() => true)
  })

  it("`Recommended` sort option should be selected by default for all partners", () => {
    renderWithRelay()
    expect(screen.getByText("Sort: Recommended")).toBeInTheDocument()
  })

  it("`Recently Added` sort option should be selected by default for `artsy-2` partner", () => {
    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "ARTSY_MERCHANDISING_PARTNER_SLUGS":
          return "artsy-2"
      }
    })

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {},
        },
        params: {
          partnerId: "artsy-2",
        },
      },
    }))

    renderWithRelay()

    expect(screen.getByText("Sort: Recently Added")).toBeInTheDocument()
  })
})
