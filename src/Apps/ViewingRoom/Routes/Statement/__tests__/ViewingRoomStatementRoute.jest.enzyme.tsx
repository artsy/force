import { useTracking } from "react-tracking"
import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"
import { ViewingRoomStatementRoute_Test_Query$rawResponse } from "__generated__/ViewingRoomStatementRoute_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { ViewingRoomStatementRouteFragmentContainer } from "Apps/ViewingRoom/Routes/Statement/ViewingRoomStatementRoute"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
}))

describe("ViewingRoomStatementRoute", () => {
  const slug = "subscription-demo-gg-guy-yanai"

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: ViewingRoomStatementRoute_Test_Query$rawResponse = ViewingRoomStatmentRouteFixture
  ) => {
    return await renderRelayTree({
      Component: ({ viewingRoom }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <ViewingRoomStatementRouteFragmentContainer
              viewingRoom={viewingRoom}
            />
          </MockBoot>
        )
      },
      query: graphql`
        query ViewingRoomStatementRoute_Test_Query($slug: ID!)
          @raw_response_type
          @relay_test_operation {
          viewingRoom(id: $slug) {
            ...ViewingRoomStatementRoute_viewingRoom
          }
        }
      `,
      variables: {
        slug,
      },
      mockData: response,
    })
  }

  it("renders the correct components", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ViewingRoomIntro").length).toBe(1)
    expect(wrapper.find("ViewingRoomWorks").length).toBe(1)
    expect(wrapper.find("ViewingRoomPullQuote").length).toBe(1)
    expect(wrapper.find("ViewingRoomBody").length).toBe(1)
    expect(wrapper.find("ViewingRoomSubsections").length).toBe(1)
  })

  it("renders view works", async () => {
    const wrapper = await getWrapper()
    const buttons = wrapper.find("ViewWorksButton")
    expect(buttons.length).toBe(2)
    const a = buttons.at(0).html()
    expect(a).toContain("View works (5)")
    const b = buttons.at(0).html()
    expect(b).toContain("View works (5)")
  })

  describe("ViewingRoomIntro", () => {
    it("renders an intro statement", async () => {
      const wrapper = (await getWrapper()).find("ViewingRoomIntro")
      expect(wrapper.text()).toContain(
        "Checked into a Club Med in the French Alps"
      )
    })
  })

  describe("ViewingRoomWorks", () => {
    const trackEvent = jest.fn()
    const mockTracking = useTracking as jest.Mock
    let wrapper

    beforeAll(async () => {
      wrapper = (await getWrapper()).find("ViewingRoomWorks")
      mockTracking.mockImplementation(() => ({ trackEvent }))
    })

    afterEach(() => {
      mockTracking.mockReset()
      trackEvent.mockReset()
    })

    it("renders artworks", () => {
      const items = wrapper.find("ViewingRoomWorksArtwork")
      expect(items.length).toBe(2)
      const a = items.at(0).html()
      expect(a).toContain("Bill Miles")
      expect(a).toContain("Beep Beep")
      expect(a).toContain("2015")
      const b = items.at(1).html()
      expect(b).toContain("Emma Johnson")
      expect(b).toContain("Please Do Not Touch")
      expect(b).toContain("2018")
    })

    it("renders buttons", async () => {
      expect(wrapper.find("Button").length).toBe(1)
      expect(wrapper.find("RouterLink").length).toBe(3)
      wrapper.find("RouterLink").forEach(link => {
        expect(link.html()).toContain(`href="/viewing-room/${slug}/works`)
      })
    })

    it.skip("tracks artwork image clicks", () => {
      wrapper
        .find("ViewingRoomWorksArtwork")
        .first()
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "clickedArtworkGroup",
        context_module: "viewingRoomArtworkRail",
        destination_path: "/viewing-room/subscription-demo-gg-guy-yanai/works",
        subject: "ArtworkThumbnail",
      })
    })

    it.skip("tracks view works button clicks", () => {
      wrapper
        .find("[data-test='viewingRoomWorksButton']")
        .first()
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "clickedArtworkGroup",
        context_module: "viewingRoomArtworkRail",
        destination_path: "/viewing-room/subscription-demo-gg-guy-yanai/works",
        subject: "View works",
      })
    })
  })

  describe("ViewingRoomPullQuote", () => {
    it("displays the correct text", async () => {
      const wrapper = (await getWrapper()).find("ViewingRoomPullQuote")
      expect(wrapper.html()).toContain("I have everything I need right here")
    })
  })

  describe("ViewingRoomBody", () => {
    it("displays the correct text", async () => {
      const wrapper = (await getWrapper()).find("ViewingRoomBody")
      expect(wrapper.html()).toContain(
        "Life can only be understood backwards; but it must be lived forwards."
      )
    })
  })

  describe("ViewingRoomSubsections", () => {
    it("displays the correct text", async () => {
      const wrapper = (await getWrapper()).find("ViewingRoomSubsections")
      expect(wrapper.find("Image").length).toBe(1)
      const html = wrapper.html()
      expect(html).toContain("Guy Yanai")
      expect(html).toContain("His visual tools are both ubiquitous and obscure")
      expect(html).toContain("View of Guy Yanai’s studio in February 2019")
    })
  })
})

const ViewingRoomStatmentRouteFixture: ViewingRoomStatementRoute_Test_Query$rawResponse = {
  viewingRoom: {
    introStatement:
      "Checked into a Club Med in the French Alps, and quickly discovered it was not what he expected. The hotel was an outdated ski lodge without any snow. “It was this horrible vacation,” the fortysomething artist said of his family trip there, a few years back. Still, he wanted to paint the drab resort—maybe so he could get a do-over of his vacation, this time in colorful and glorious surroundings.",
    artworksConnection: {
      totalCount: 5,
      edges: [
        {
          node: {
            internalID: "5de6b49aa665fc000db78197",
            image: {
              resized: {
                width: 800,
                height: 800,
                src:
                  "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
                srcSet:
                  "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
              },
            },
            artistNames: "Bill Miles",
            title: "Beep Beep",
            date: "2015",
            saleMessage: "Sell me",
            id: "QXJ0d29yazo1ZGU2YjQ5YWE2NjVmYzAwMGRiNzgxOTc=",
          },
        },
        {
          node: {
            internalID: "5de6b3a46882b7000eee31f8",
            image: {
              resized: {
                width: 800,
                height: 800,
                src:
                  "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
                srcSet:
                  "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
              },
            },
            artistNames: "Emma Johnson",
            title: "Please Do Not Touch",
            date: "2018",
            saleMessage: "Buy me",
            id: "QXJ0d29yazo1ZGU2YjNhNDY4ODJiNzAwMGVlZTMxZjg=",
          },
        },
      ],
    },
    pullQuote:
      "I have everything I need right here. I have this kind of self-sufficiency, and now it’s even more valuable.",
    body:
      "Life can only be understood backwards; but it must be lived forwards.",
    subsections: [
      {
        internalID: "0ea3e292-8bf4-48c4-815a-f342cb4eaf65",
        title: "Guy Yanai",
        body:
          "His visual tools are both ubiquitous and obscure, seemingly random but also all somehow personal. Yanai has used the New York Times, Vitra furniture catalogs, Peanuts comic strips, his iPhone photos, and classic films like Claire’s Knee (1970), directed by Eric Rohmer. “I’ve done so many paintings from this movie,” he said, showing me a reproduction of Lake Annecy (2019), which he painted from a still photo last year. “And honestly, I could do the whole rest of my life just painting from this movie.",
        image: {
          width: 800,
          height: 800,
          imageURLs: {
            normalized:
              "https://artsy-media-uploads.s3.amazonaws.com/QxcoFTsyj4gBuvUFZwrL9g/Studio+shot+February+2019.jpg",
          },
        },
        caption:
          "View of Guy Yanai’s studio in February 2019. Photo by Elad Sarig. Courtesy of the artist.",
      },
    ],
  },
}
