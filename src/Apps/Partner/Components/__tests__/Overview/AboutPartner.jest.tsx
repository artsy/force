import { AboutPartnerFragmentContainer } from "Apps/Partner/Components/Overview/AboutPartner"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ partner }: any) => {
    return <AboutPartnerFragmentContainer partner={partner} />
  },
  query: graphql`
    query AboutPartnerTestQuery @relay_test_operation {
      partner(id: "unit-london") @principalField {
        ...AboutPartner_partner
      }
    }
  `,
})

describe("AboutPartner", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        website: "http://www.theunitldn.com",
        profile: {
          fullBio: "FULL BIO",
        },
        displayFullPartnerPage: true,
      }),
    })

    expect(screen.getByText("FULL BIO")).toBeInTheDocument()
    expect(container.innerHTML).toContain("http://www.theunitldn.com")
  })

  it("tracks correctly", () => {
    const website = "http://www.theunitldn.com"
    const slug = "the-unit-ldn"
    const internalID = "1234asdf"

    renderWithRelay({
      Partner: () => ({
        website,
        slug,
        internalID,
        displayFullPartnerPage: true,
      }),
    })

    const linkElement = screen.getByRole("link")
    fireEvent.click(linkElement)

    expect(trackingSpy).toHaveBeenCalledWith({
      action: "clickedPartnerLink",
      context_owner_id: internalID,
      context_owner_slug: slug,
      context_owner_type: "partner",
      destination_path: website,
    })
  })

  it("doesn't render the text if data is empty", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        website: null,
        profile: null,
      }),
    })

    // Component should not render any text content when data is empty
    expect(container.textContent?.trim()).toBe("")
  })

  it("doesn't render the component if all data is empty", () => {
    const { container } = renderWithRelay({
      Partner: () => ({
        website: null,
        profile: null,
      }),
    })

    // Component should not render anything when all data is empty
    expect(container.firstChild).toBeNull()
  })
})
