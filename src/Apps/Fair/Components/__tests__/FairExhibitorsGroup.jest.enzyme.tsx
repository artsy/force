import { FairExhibitorsGroupFragmentContainer } from "Apps/Fair/Components/FairExhibitors/FairExhibitorsGroup"
import { mount } from "enzyme"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: "",
      },
    },
  }),
}))

describe("FairExhibitorsGroup", () => {
  const getWrapper = () => {
    return mount(
      <FairExhibitorsGroupFragmentContainer
        exhibitorsGroup={FAIR_EXHIBITORS_FIXTURE as any}
        fair={FAIR_FIXTURE as any}
      />
    )
  }

  it("renders the exhibitors group", async () => {
    const wrapper = getWrapper()

    const exhibitorsCards = wrapper.find("FairExhibitorCard")

    expect(exhibitorsCards.length).toBe(2)
  })
})

const FAIR_EXHIBITORS_FIXTURE = {
  exhibitors: [
    {
      partner: {
        name: "Cheryl Hazan Gallery",
        href: "/cheryl-hazan-gallery",
        internalID: "551db9a6726169422f4d0600",
        cities: ["New York"],
        profile: {
          icon: {
            resized: {
              src:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=50&height=50&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKw5-1P5ytRxpSxBTMenYxg%2Flarge.jpg",
              srcSet:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=50&height=50&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKw5-1P5ytRxpSxBTMenYxg%2Flarge.jpg 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=100&height=100&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKw5-1P5ytRxpSxBTMenYxg%2Flarge.jpg 2x",
            },
          },
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/ZVgfEYpNiJD0wVUTik19LQ/square.jpg",
          },
        },
      },
      partnerID: "551db9a6726169422f4d0600",
    },
    {
      partner: {
        name: "CULT | Aimee Friberg Exhibitions",
        href: "/cult",
        cities: ["San Francisco"],
        internalID: "5694406501925b322c00010b",
        profile: {
          icon: {
            resized: {
              src:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=50&height=50&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKdNH0s8y2HGtVxWQZy5dkg%2Flarge.jpg",
              srcSet:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=50&height=50&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKdNH0s8y2HGtVxWQZy5dkg%2Flarge.jpg 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=100&height=100&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKdNH0s8y2HGtVxWQZy5dkg%2Flarge.jpg 2x",
            },
          },
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/wAZ4Kk9IE0lCpdRJi7MJsA/wide.jpg",
          },
        },
      },
      partnerID: "5694406501925b322c00010b",
    },
  ],
}

const FAIR_FIXTURE = {
  internalID: "fair-id",
}
