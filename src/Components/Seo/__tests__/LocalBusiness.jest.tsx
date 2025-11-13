import { LocalBusiness } from "Components/Seo/LocalBusiness"
import { render } from "@testing-library/react"
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

  const renderComponent = (props = {}) => {
    return render(
      <HeadProvider>
        <LocalBusiness {...defaultProps} {...props} />
      </HeadProvider>
    )
  }

  it("sets the schema type", () => {
    renderComponent()
    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"@type": "LocalBusiness"')
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
    renderComponent(props)
    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"name": "Great Gallery"')
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
    renderComponent(props)
    expect(document.querySelectorAll("script")).toHaveLength(0)
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
    renderComponent(props)
    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"@type": "PostalAddress"')
    expect(script?.textContent).toMatch('"@type": "Place"')
    expect(script?.textContent).toMatch(
      '"streetAddress": "123 Main Street Apt 1"'
    )
    expect(script?.textContent).toMatch('"addressLocality": "New York"')
    expect(script?.textContent).toMatch('"addressRegion": "NY"')
    expect(script?.textContent).toMatch('"postalCode": "10001"')
    expect(script?.textContent).toMatch('"addressCountry": "US"')
    expect(script?.textContent).toMatch('"latitude": 12')
    expect(script?.textContent).toMatch('"longitude": 7')
  })
})
