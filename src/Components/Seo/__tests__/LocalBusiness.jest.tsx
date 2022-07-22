import { mount } from "enzyme"
import { computeOptionalSchemaData, LocalBusiness } from "../LocalBusiness"
import { HeadProvider } from "react-head"

describe("LocalBusiness", () => {
  const defaultProps = { partnerLocation: {}, partnerName: "" }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <LocalBusiness {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const wrapper = getWrapper()
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "LocalBusiness"')
  })

  it("sets both the name and legal name attributes", () => {
    const props = { partnerName: "Great Gallery", partnerLocation: undefined }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"name": "Great Gallery"')
    expect(script.text()).toMatch('"legalName": "Great Gallery"')
  })

  it("skips optional data when partnerLocation doesn't exist", () => {
    const props = { partnerName: "Great Gallery", partnerLocation: undefined }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).not.toMatch('"@type": "PostalAddress"')
    expect(script.text()).not.toMatch('"@type": "Place"')
  })

  it("sets the optional data when partnerLocation and coordinates exist", () => {
    const partnerLocation = {
      address2: "Apt 1",
      address: "123 Main Street",
      city: "New York",
      coordinates: { lat: 12, lng: 7 },
      country: "US",
      phone: "123-456-7890",
      postalCode: "10001",
      state: "NY",
    }
    const props = {
      partnerLocation,
      partnerName: "Great Gallery",
    }
    const wrapper = getWrapper(props)
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "PostalAddress"')
    expect(script.text()).toMatch('"@type": "Place"')
  })
})

describe("computeOptionalSchemaData", () => {
  it("returns undefined when partnerLocation doesn't exist", () => {
    const partnerLocation = null
    const { address, location } = computeOptionalSchemaData(partnerLocation)
    expect(address).toEqual(undefined)
    expect(location).toEqual(undefined)
  })

  it("returns a PostalAddress when partnerLocation exists", () => {
    const partnerLocation = {
      address: "123 Main Street",
      address2: "Apt 1",
      city: "New York",
      country: "US",
      phone: "123-456-7890",
      postalCode: "10001",
      state: "NY",
    }
    const { address } = computeOptionalSchemaData(partnerLocation)
    expect(address).toEqual({
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      streetAddress: "123 Main Street, Apt 1",
      telephone: "123-456-7890",
    })
  })

  it("suppresses PostalAddress attributes that do not exist", () => {
    const partnerLocation = {
      address: "123 Main Street",
      address2: "Apt 1",
      city: "New York",
      country: "US",
      postalCode: "10001",
      state: "NY",
    }
    const { address } = computeOptionalSchemaData(partnerLocation)
    expect(address).not.toHaveProperty("telephone")
  })

  it("returns a Place when coordinates exist", () => {
    const partnerLocation = { coordinates: { lat: 12, lng: 7 } }
    const { location } = computeOptionalSchemaData(partnerLocation)
    expect(location).toEqual({
      "@type": "Place",
      latitude: 12,
      longitude: 7,
    })
  })

  it("skips Place with partial coordinate info", () => {
    const partnerLocation = { coordinates: { lat: 12 } }
    const { location } = computeOptionalSchemaData(partnerLocation)
    expect(location).toEqual(undefined)
  })
})
