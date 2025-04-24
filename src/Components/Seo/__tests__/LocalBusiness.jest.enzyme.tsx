import { LocalBusiness } from "Components/Seo/LocalBusiness"
import { mount } from "enzyme"
import { HeadProvider } from "react-head"

describe("LocalBusiness", () => {
  const defaultProps = {
    partnerData: {
      name: "Default Gallery",
      profile: {
        locations: [
          {
            address: "123 Main Street",
            address2: null,
            city: "New York",
            coordinates: null,
            country: "US",
            postalCode: "10001",
            state: "NY",
          },
        ],
      },
    },
  }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <LocalBusiness {...defaultProps} {...props} />
      </HeadProvider>,
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const wrapper = getWrapper()
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "LocalBusiness"')
  })

  it("sets the name attribute", () => {
    const props = {
      partnerData: {
        name: "Great Gallery",
        profile: {
          locations: [
            {
              address: "123 Main Street",
              address2: null,
              city: "New York",
              coordinates: null,
              country: "US",
              postalCode: "10001",
              state: "NY",
            },
          ],
        },
      },
    }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"name": "Great Gallery"')
  })

  it("returns null when no locations exist", () => {
    const props = {
      partnerData: {
        name: "Great Gallery",
        profile: {
          locations: [],
        },
      },
    }
    const wrapper = getWrapper(props)
    expect(wrapper.find("script").length).toBe(0)
  })

  it("sets the optional data when location and coordinates exist", () => {
    const props = {
      partnerData: {
        name: "Great Gallery",
        profile: {
          locations: [
            {
              address2: "Apt 1",
              address: "123 Main Street",
              city: "New York",
              coordinates: { lat: 12, lng: 7 },
              country: "US",
              postalCode: "10001",
              state: "NY",
            },
          ],
        },
      },
    }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "PostalAddress"')
    expect(script.text()).toMatch('"@type": "Place"')
    expect(script.text()).toMatch('"streetAddress": "123 Main Street Apt 1"')
    expect(script.text()).toMatch('"addressLocality": "New York"')
    expect(script.text()).toMatch('"addressRegion": "NY"')
    expect(script.text()).toMatch('"postalCode": "10001"')
    expect(script.text()).toMatch('"addressCountry": "US"')
    expect(script.text()).toMatch('"latitude": 12')
    expect(script.text()).toMatch('"longitude": 7')
  })
})
