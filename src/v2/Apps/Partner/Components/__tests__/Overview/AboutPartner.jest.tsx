import { AboutPartnerFragmentContainer } from "../../Overview/AboutPartner"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
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
    const website = "http://www.theunitldn.com"
    const vatNumber = "GB204716728"
    let limitedBio =
      "Our core mission is the identification, development and exposure of talented and innovative artists for a contemporary audience."
    let fullBio =
      "Since the brand’s inception in 2013, Unit London has established a global artistic platform for the world’s most distinctive emerging talent. In an often opaque and impenetrable art world, Unit London seeks to identify, cultivate and expose works of art on a purely meritocratic basis. The gallery has successfully launched and advanced the careers of numerous important contemporary artists and remains a bastion of equity, innovation and sustainability."

    limitedBio = limitedBio ? limitedBio : fullBio
    fullBio = fullBio ? fullBio : limitedBio

    const wrapper = getWrapper({
      Partner: () => ({
        website,
        vatNumber,
        profile: {
          fullBio,
          bio: limitedBio,
        },
        displayFullPartnerPage: true,
      }),
    })

    expect(wrapper.find("Text").at(1).text()).toEqual(limitedBio)
    expect(wrapper.find("Text").at(2).text()).toEqual(fullBio)
    expect(wrapper.find("Text").at(3).text()).toEqual(website)
    expect(wrapper.find("Text").at(4).text()).toEqual(`VAT ID#: ${vatNumber}`)
    expect(wrapper.find("a").props().href).toEqual("http://www.theunitldn.com")
  })

  it("tracks correctly", () => {
    const website = "http://www.theunitldn.com"
    const slug = "the-unit-ldn"
    const internalID = "1234asdf"

    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
      Partner: () => ({
        website: null,
        vatNumber: null,
        profile: null,
      }),
    })
    expect(wrapper.find("GridColumns").first().length).toEqual(0)
  })
})
