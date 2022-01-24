import { NearbyGalleryCardFragmentContainer } from "../../Overview/NearbyGalleryCard"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { Text, Image } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowProfileButtonFragmentContainer } from "v2/Components/FollowButton/FollowProfileButton"

jest.unmock("react-relay")

const NearbyGalleryCardTestQuery = graphql`
  query NearbyGalleryCard_Test_Query($partnerId: String!)
    @relay_test_operation {
    partner(id: $partnerId) @principalField {
      ...NearbyGalleryCard_partner
    }
  }
`

describe("NearbyGalleryCard with London as a preferred city", () => {
  const { getWrapper } = setupTestWrapper({
    Component: ({ partner }: any) => {
      return (
        <NearbyGalleryCardFragmentContainer city="London" partner={partner} />
      )
    },
    variables: {
      partnerId: "unit-london",
    },
    query: NearbyGalleryCardTestQuery,
  })

  it("renders correctly", () => {
    const name = "Unit London"
    const slug = "unit-london"
    const type = "Gallery"
    const location = {
      city: "London",
      displayCountry: "United Kingdom",
    }

    const wrapper = getWrapper({
      Partner: () => ({
        name,
        type,
        slug,
        profile: {
          image: {
            cropped: {
              src: "https://www.example.com/square-fat.jpg",
              srcSet: "https://www.example.com/square-fat.jpg",
            },
          },
        },
        locationsConnection: {
          edges: [{ node: location }],
        },
      }),
    })

    const text = wrapper.text()

    expect(text).toContain(name)
    expect(text).toContain(location.city)

    expect(wrapper.find(Text).length).toEqual(2)
    expect(wrapper.find(RouterLink).length).toEqual(2)
    expect(wrapper.find(Image).length).toEqual(1)
    expect(wrapper.find(FollowProfileButtonFragmentContainer).length).toEqual(1)
  })

  it("renders city name correctly", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        locationsConnection: {
          edges: [
            {
              node: { city: "   london   ", displayCountry: "United Kingdom" },
            },
          ],
        },
      }),
    })

    const text = wrapper.text()

    expect(text).toContain("London")
  })

  it.each([
    [
      "partner locations contain preferred city",
      [{ city: "London", displayCountry: "United Kingdom" }],
      "London",
    ],
    [
      "partner has 2 locations",
      [
        { city: "London", displayCountry: "United Kingdom" },
        { city: "New York", displayCountry: "United States" },
      ],
      "London & 1 other location",
    ],
    [
      "partner has 3 or more locations",
      [
        { city: "London", displayCountry: "United Kingdom" },
        { city: "New York", displayCountry: "United States" },
        { city: "Paris", displayCountry: "France" },
      ],
      "London & 2 other locations",
    ],
    [
      "partner locations don't include location with preferred city",
      [
        { city: "Birmingham", displayCountry: "United Kingdom" },
        { city: "New York", displayCountry: "United States" },
        { city: "Paris", displayCountry: "France" },
      ],
      "Birmingham & 2 other locations",
    ],
    [
      "partner location don't have city",
      [{ city: null, displayCountry: "United Kingdom" }],
      "United Kingdom",
    ],
  ])(
    "renders location string correctly if %s",
    (
      testName: string,
      locations: Array<{ city: string; displayCountry: string }>,
      result: string
    ) => {
      const wrapper = getWrapper({
        Partner: () => ({
          locationsConnection: {
            edges: locations.map(location => ({ node: location })),
          },
        }),
      })

      const text = wrapper.text()

      expect(text).toContain(result)
    }
  )
})

describe("NearbyGalleryCard without a preferred city", () => {
  const { getWrapper } = setupTestWrapper({
    Component: ({ partner }: any) => {
      return <NearbyGalleryCardFragmentContainer partner={partner} />
    },
    variables: {
      partnerId: "unit-london",
    },
    query: NearbyGalleryCardTestQuery,
  })

  it("renders city", () => {
    const location = {
      city: "London",
      displayCountry: "United Kingdom",
    }

    const wrapper = getWrapper({
      Partner: () => ({
        locationsConnection: {
          edges: [{ node: location }],
        },
      }),
    })

    const text = wrapper.text()

    expect(text).toContain(location.city)
  })

  it("renders country name if city isn't entered", () => {
    const location = {
      city: null,
      displayCountry: "United Kingdom",
    }

    const wrapper = getWrapper({
      Partner: () => ({
        locationsConnection: {
          edges: [{ node: location }],
        },
      }),
    })

    const text = wrapper.text()

    expect(text).toContain(location.displayCountry)
  })

  it("doesn't render location", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        locationsConnection: {
          edges: [],
        },
      }),
    })

    expect(wrapper.find(RouterLink).find(Text).length).toEqual(1)
  })
})
