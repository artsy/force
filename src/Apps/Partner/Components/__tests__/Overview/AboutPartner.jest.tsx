import { AboutPartnerFragmentContainer } from "Apps/Partner/Components/Overview/AboutPartner"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return <AboutPartnerFragmentContainer partner={partner} />
  },
  query: graphql`
    query AboutPartner_Test_Query @relay_test_operation {
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
    const { wrapper } = getWrapper({
      Partner: () => ({
        website: "http://www.theunitldn.com",
        vatNumber: "GB204716728",
        profile: {
          fullBio: "FULL BIO",
        },
        displayFullPartnerPage: true,
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("FULL BIO")
    expect(html).toContain("http://www.theunitldn.com")
    expect(html).toContain(`VAT ID#: GB204716728`)
    expect(html).toContain("http://www.theunitldn.com")
  })

  it("tracks correctly", () => {
    const website = "http://www.theunitldn.com"
    const slug = "the-unit-ldn"
    const internalID = "1234asdf"

    const { wrapper } = getWrapper({
      Partner: () => ({
        website,
        slug,
        internalID,
        displayFullPartnerPage: true,
      }),
    })
    wrapper.find("a").simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith({
      action: "clickedPartnerLink",
      context_owner_id: internalID,
      context_owner_slug: slug,
      context_owner_type: "partner",
      destination_path: website,
    })
  })

  it("doesn't render the text if data is empty", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        website: null,
        vatNumber: null,
        profile: null,
      }),
    })
    expect(wrapper.find("Text").at(1).length).toEqual(0)
    expect(wrapper.find("Text").at(2).length).toEqual(0)
    expect(wrapper.find("Text").at(3).length).toEqual(0)
    expect(wrapper.find("Text").at(4).length).toEqual(0)
  })

  it("doesn't render the component if all data is empty", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        website: null,
        vatNumber: null,
        profile: null,
      }),
    })
    expect(wrapper.find("GridColumns").first().length).toEqual(0)
  })
})
