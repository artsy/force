import { useTracking } from "v2/System/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { graphql } from "relay-runtime"

import { Breakpoint } from "@artsy/palette"
import { FeatureAKGRoute_Test_QueryRawResponse } from "v2/__generated__/FeatureAKGRoute_Test_Query.graphql"
import { FeatureAKGAppFragmentContainer } from "../FeatureAKGApp"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

describe("FeatureAKG", () => {
  jest.setTimeout(20000)
  const trackEvent = jest.fn()
  const defaultVariables = {
    articleIDs: ["article1", "article2", "article3", "article4"],
    selectedWorksSetID: "set1",
    collectionRailItemIDs: [
      "collection1",
      "collection2",
      "collection3",
      "collection4",
    ],
    auctionRailItemIDs: ["auction1", "auction", "auction3", "auction4"],
    fairRailItemIDs: ["fair1", "fair2", "fair3", "fair4"],
    hasCollectionRailItems: true,
    hasAuctionRailItems: true,
    hasFairRailItems: true,
  }

  const getWrapper = async (
    response: FeatureAKGRoute_Test_QueryRawResponse = ArtKeepsGoingFixture,
    variables = defaultVariables,
    injectedData = defaultData,
    breakpoint: Breakpoint = "xl"
  ) => {
    return await renderRelayTree({
      Component: ({ viewer }) => {
        return (
          <MockBoot breakpoint={breakpoint} context={{ injectedData }}>
            <FeatureAKGAppFragmentContainer viewer={viewer} />
          </MockBoot>
        )
      },
      query: graphql`
        query FeatureAKGRoute_Test_Query(
          $articleIDs: [String]!
          $selectedWorksSetID: String!
          $collectionRailItemIDs: [String!]
          $auctionRailItemIDs: [String!]
          $fairRailItemIDs: [String!]
          $hasCollectionRailItems: Boolean!
          $hasAuctionRailItems: Boolean!
          $hasFairRailItems: Boolean!
        ) @raw_response_type @relay_test_operation {
          viewer {
            ...FeatureAKGApp_viewer
              @arguments(
                articleIDs: $articleIDs
                selectedWorksSetID: $selectedWorksSetID
                collectionRailItemIDs: $collectionRailItemIDs
                auctionRailItemIDs: $auctionRailItemIDs
                fairRailItemIDs: $fairRailItemIDs
                hasCollectionRailItems: $hasCollectionRailItems
                hasAuctionRailItems: $hasAuctionRailItems
                hasFairRailItems: $hasFairRailItems
              )
          }
        }
      `,
      variables,
      mockData: response,
    })
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  describe("Page content", () => {
    it("displays the description and sections from the context data", async () => {
      const defaultWrapper = await getWrapper()
      expect(defaultWrapper.html()).toContain(
        "Art-world spaces have paused, museums and galleries have closed their doors"
      )
      expect(defaultWrapper.find("Section").length).toEqual(5)
    })

    describe("Videos", () => {
      it("displays the large videos at the large breakpoint", async () => {
        const defaultWrapper = await getWrapper()
        expect(defaultWrapper.html()).toContain("video_1_large")
        expect(defaultWrapper.html()).toContain("video_2_large")
        expect(defaultWrapper.html()).toContain("hero_video_large")

        // Does not display small videos
        expect(defaultWrapper.html()).not.toContain("video_1_small")
        expect(defaultWrapper.html()).not.toContain("video_2_small")
        expect(defaultWrapper.html()).not.toContain("hero_video_small")
      })

      it("displays the small videos at the small breakpoint", async () => {
        const smallWrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          defaultData,
          "xs"
        )
        expect(smallWrapper.html()).not.toContain("video_1_large")
        expect(smallWrapper.html()).not.toContain("video_2_large")
        expect(smallWrapper.html()).not.toContain("hero_video_large")

        // Does not display small videos
        expect(smallWrapper.html()).toContain("video_1_small")
        expect(smallWrapper.html()).toContain("video_2_small")
        expect(smallWrapper.html()).toContain("hero_video_small")
      })

      it("displays no videos if none specified at the large breakpoint", async () => {
        const largeWrapperData = {
          ...defaultData,
          video_1: {
            ...defaultData.video_1,
            large_src: null,
          },
          video_2: {
            ...defaultData.video_2,
            large_src: null,
          },
          hero_video: {
            ...defaultData.hero_video,
            large_src: null,
          },
        }

        const largeWrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          largeWrapperData
        )
        expect(largeWrapper.html()).not.toContain("video_1_large")
        expect(largeWrapper.html()).not.toContain("video_2_large")
        expect(largeWrapper.html()).not.toContain("hero_video_large")

        // Does not display small videos
        expect(largeWrapper.html()).not.toContain("video_1_small")
        expect(largeWrapper.html()).not.toContain("video_2_small")
        expect(largeWrapper.html()).not.toContain("hero_video_small")
      })

      it("displays no videos if none specified at the small breakpoint", async () => {
        const smallWrapperData = {
          ...defaultData,
          video_1: {
            ...defaultData.video_1,
            small_src: null,
          },
          video_2: {
            ...defaultData.video_2,
            small_src: null,
          },
          hero_video: {
            ...defaultData.hero_video,
            small_src: null,
          },
        }

        const smallWrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          smallWrapperData,
          "xs"
        )
        expect(smallWrapper.html()).not.toContain("video_1_large")
        expect(smallWrapper.html()).not.toContain("video_2_large")
        expect(smallWrapper.html()).not.toContain("hero_video_large")

        // Does not display small videos
        expect(smallWrapper.html()).not.toContain("video_1_small")
        expect(smallWrapper.html()).not.toContain("video_2_small")
        expect(smallWrapper.html()).not.toContain("hero_video_small")
      })
    })

    describe("Featured this week", () => {
      it("displays both featured items", async () => {
        const defaultWrapper = await getWrapper()
        expect(defaultWrapper.html()).toContain("Featured This Week")

        const featuredThisWeekSection = defaultWrapper.find("Section").at(0)
        expect(
          featuredThisWeekSection.find("FeaturedContentLink").length
        ).toEqual(2)
        expect(featuredThisWeekSection.text()).toContain(
          "Artworks to buy in a crisis"
        )
        expect(featuredThisWeekSection.text()).toContain(
          "Benefit Auction For Good"
        )
      })

      it("tracks a click event", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper.find("FeaturedContentLink").at(0).simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "FeaturedThisWeek",
          destination_path:
            "https://staging.artsy.net/collection/impressionist-and-modern",
        })
      })
    })

    describe("Editorial", () => {
      it("displays a featured article and 3 other articles", async () => {
        const defaultWrapper = await getWrapper()
        expect(defaultWrapper.html()).toContain("Editorial")
        expect(
          defaultWrapper.find("FeaturedArticles").find("StyledLink").length
        ).toEqual(4)
        expect(defaultWrapper.find("FeaturedArticles").text()).toContain(
          "View more"
        )
      })

      it("tracks clicking the featured article", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper
          .find("FeaturedArticles")
          .find("StyledLink")
          .at(0)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "Editorial",
          destination_path: "/article/article-1",
        })
      })

      it("tracks clicking a standard article", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper
          .find("FeaturedArticles")
          .find("StyledLink")
          .at(1)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "Editorial",
          destination_path: "/article/article-2",
        })
      })

      it("tracks clicking the view more link", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper
          .find("FeaturedArticles")
          .find("RouterLink")
          .at(4)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "Editorial",
          destination_path: "/articles",
          subject: "View more",
        })
      })

      it("does not show the section if there are no articles", async () => {
        const injectedData = {
          ...defaultData,
          editorial: {
            ...defaultData.editorial,
            article_ids: null,
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          injectedData
        )

        expect(wrapper.find("Section").length).toEqual(4)
        expect(wrapper.html()).not.toContain("Editorial")
      })

      it("does not show the section if there is an empty array in the articles input", async () => {
        const injectedData = {
          ...defaultData,
          editorial: {
            ...defaultData.editorial,
            article_ids: [],
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          injectedData
        )

        expect(wrapper.find("Section").length).toEqual(4)
        expect(wrapper.html()).not.toContain("Editorial")
      })

      it("handles the case where none of the articles are returned from the API", async () => {
        const noArticlesData = {
          ...ArtKeepsGoingFixture,
          viewer: {
            ...ArtKeepsGoingFixture.viewer,
            articles: [],
          },
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper(noArticlesData, defaultVariables)

        // In this case we'll still render the section, but it should just be
        // empty and not error out.
        expect(wrapper.find("Section").length).toEqual(5)
        expect(
          wrapper.find("FeaturedArticles").find("StyledLink").length
        ).toEqual(0)
      })
    })

    describe("Selected works", () => {
      it("displays a grid of artworks", async () => {
        const defaultWrapper = await getWrapper()
        expect(defaultWrapper.html()).toContain("Selected Works")
        expect(defaultWrapper.find("ArtworkGrid").length).toEqual(1)
      })
      it("doesn't show the section if there are no selected works returned from the API", async () => {
        const noSelectedWorksData = {
          ...ArtKeepsGoingFixture,
          viewer: {
            ...ArtKeepsGoingFixture.viewer,
            selectedWorks: {
              id: "sadsfs",
              itemsConnection: {
                edges: [],
              },
            },
          },
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper(noSelectedWorksData, defaultVariables)

        // In this case we'll still render the section, but it should just be
        // empty and not error out.
        expect(wrapper.find("Section").length).toEqual(5)
        expect(wrapper.find("ArtworkGrid").length).toEqual(0)
      })

      it("doesn't show the section if there is no set_id", async () => {
        const injectedData = {
          ...defaultData,
          selected_works: {
            ...defaultData.selected_works,
            set_id: null,
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          injectedData
        )

        expect(wrapper.find("Section").length).toEqual(4)
        expect(wrapper.html()).not.toContain("Selected Works")
      })
    })

    describe("Featured artists", () => {
      it("displays all of the featured artists", async () => {
        const defaultWrapper = await getWrapper()
        expect(defaultWrapper.html()).toContain("Featured Artists")

        const featuredArtistsSection = defaultWrapper.find("Section").at(3)
        expect(
          featuredArtistsSection.find("FeaturedContentLink").length
        ).toEqual(4)
      })

      it("doesn't show the section if there are no featured artists", async () => {
        const injectedData = {
          ...defaultData,
          featured_artists: {
            ...defaultData.featured_artists,
            artists: [],
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          injectedData
        )

        expect(wrapper.find("Section").length).toEqual(4)
        expect(wrapper.html()).not.toContain("Featured Artists")
      })
      it("tracks clicking on an artist", async () => {
        const defaultWrapper = await getWrapper()

        defaultWrapper
          .find("FeaturedArtists")
          .find("FeaturedContentLink")
          .at(0)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "FeaturedArtists",
          destination_path: "https://artsy.net/artist/nicolas-party",
        })
      })
    })

    describe("Browse", () => {
      it("displays all three rails", async () => {
        const defaultWrapper = await getWrapper()
        expect(defaultWrapper.html()).toContain("Browse")
        expect(defaultWrapper.find("FeaturedRailCarousel").length).toEqual(3)
        expect(defaultWrapper.find("FeaturedRails").text()).toContain(
          "Collections"
        )
        expect(defaultWrapper.find("FeaturedRails").text()).toContain(
          "Benefit Auctions"
        )
        expect(defaultWrapper.find("FeaturedRails").text()).toContain("Fairs")
      })

      it("doesn't display the collections rail if there are no matching collections", async () => {
        const noCollectionsData = {
          ...ArtKeepsGoingFixture,
          viewer: {
            ...ArtKeepsGoingFixture.viewer,
            collections: [],
          },
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper(noCollectionsData, defaultVariables)
        expect(wrapper.find("FeaturedRailCarousel").length).toEqual(2)
        expect(wrapper.find("FeaturedRails").text()).not.toContain(
          "Collections"
        )
      })

      it("doesn't display the auctions rail if there are no matching auctions", async () => {
        const noAuctionsData = {
          ...ArtKeepsGoingFixture,
          viewer: {
            ...ArtKeepsGoingFixture.viewer,
            auctions: {
              edges: [],
            },
          },
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper(noAuctionsData, defaultVariables)
        expect(wrapper.find("FeaturedRailCarousel").length).toEqual(2)
        expect(wrapper.find("FeaturedRails").text()).not.toContain(
          "Benefit Auctions"
        )
      })
      it("doesn't display the fairs rail if there are no matching fairs", async () => {
        const noFairsData = {
          ...ArtKeepsGoingFixture,
          viewer: {
            ...ArtKeepsGoingFixture.viewer,
            fairs: [],
          },
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper(noFairsData, defaultVariables)
        expect(wrapper.find("FeaturedRailCarousel").length).toEqual(2)
        expect(wrapper.find("FeaturedRails").text()).not.toContain("Fairs")
      })

      it("doesn't break if a single auction doesn't match the graphQL response", async () => {
        const partialAuctionsData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            auctions_rail: {
              ...defaultData.browse.auctions_rail,
              items: [
                {
                  id: "bad-slug",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
                {
                  id: "heritage-signature-photographs-1",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
                {
                  id:
                    "dope-gallery-global-icons-slash-contemporary-prints-and-editions",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
              ],
            },
          },
        }

        const defaultWrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          partialAuctionsData
        )
        expect(defaultWrapper.html()).toContain("Browse")
        expect(defaultWrapper.find("FeaturedRailCarousel").length).toEqual(3)
        expect(defaultWrapper.find("FeaturedRails").text()).toContain(
          "Benefit Auctions"
        )
      })

      it("doesn't break if a single collection doesn't match the graphQL response", async () => {
        const partialCollectionsData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            collections_rail: {
              ...defaultData.browse.collections_rail,
              items: [
                {
                  id: "bad-slug",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
                {
                  id: "collect-by-color-orange",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
                {
                  id: "minimalist-prints",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
              ],
            },
          },
        }

        const defaultWrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          partialCollectionsData
        )
        expect(defaultWrapper.html()).toContain("Browse")
        expect(defaultWrapper.find("FeaturedRailCarousel").length).toEqual(3)
        expect(defaultWrapper.find("FeaturedRails").text()).toContain(
          "Collections"
        )
      })

      it("doesn't break if a single fair doesn't match the graphQL response", async () => {
        const partialFairsData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            fairs_rail: {
              ...defaultData.browse.fairs_rail,
              items: [
                {
                  id: "bad-id",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
                {
                  id: "5e5e45095c859000102aa95f",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
                {
                  id: "5d88fbc5192508000efb03d4",
                  image_src:
                    "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
                },
              ],
            },
          },
        }

        const defaultWrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          partialFairsData
        )
        expect(defaultWrapper.html()).toContain("Browse")
        expect(defaultWrapper.find("FeaturedRailCarousel").length).toEqual(3)
        expect(defaultWrapper.find("FeaturedRails").text()).toContain("Fairs")
      })

      it("doesn't attempt to display the collections rail if there is no manual data", async () => {
        const injectedData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            collections_rail: {
              ...defaultData.browse.collections_rail,
              items: [],
            },
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          injectedData
        )

        expect(wrapper.find("FeaturedCollectionsRail").length).toEqual(0)
      })

      it("doesn't attempt to display the auctions rail if there is no manual data", async () => {
        const injectedData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            auctions_rail: {
              ...defaultData.browse.auctions_rail,
              items: [],
            },
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          injectedData
        )

        expect(wrapper.find("FeaturedAuctionsRail").length).toEqual(0)
      })

      it("doesn't attempt to display the fairs rail if there is no manual data", async () => {
        const injectedData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            fairs_rail: {
              ...defaultData.browse.fairs_rail,
              items: [],
            },
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          injectedData
        )

        expect(wrapper.find("FeaturedFairsRail").length).toEqual(0)
      })

      it("tracks clicking on a collection", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper
          .find("FeaturedCollectionsRail")
          .find("StyledLink")
          .at(0)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "BrowseCollections",
          destination_path: "/collection/jean-michel-basquiat-crowns",
        })
      })
      it("tracks clicking on an auction", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper
          .find("FeaturedAuctionsRail")
          .find("StyledLink")
          .at(0)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "BrowseAuctions",
          destination_path: "/auction/auction-1",
        })
      })

      it("tracks clicking on a fair", async () => {
        const defaultWrapper = await getWrapper()
        defaultWrapper
          .find("FeaturedFairsRail")
          .find("StyledLink")
          .at(0)
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "BrowseFairs",
          destination_path: "/fair/fair-1",
        })
      })

      it("doesn't show the section if there are no rails", async () => {
        const injectedData = {
          ...defaultData,
          browse: {
            ...defaultData.browse,
            fairs_rail: {
              ...defaultData.browse.fairs_rail,
              items: [],
            },
            auctions_rail: {
              ...defaultData.browse.auctions_rail,
              items: [],
            },
            collections_rail: {
              ...defaultData.browse.collections_rail,
              items: [],
            },
          },
        }

        const wrapper = await getWrapper(
          ArtKeepsGoingFixture,
          defaultVariables,
          injectedData
        )

        expect(wrapper.find("Section").length).toEqual(4)
        expect(wrapper.html()).not.toContain("Browse")
      })
    })
  })
})

const defaultData = {
  artistID: "4d8b92b34eb68a1b2c0003f4",
  browse: {
    auctions_rail: {
      items: [
        {
          id: "seoul-auction-spring-online-auction-goat",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
        {
          id: "heritage-signature-photographs-1",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
        {
          id:
            "dope-gallery-global-icons-slash-contemporary-prints-and-editions",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
      ],
      subtitle: null,
      title: "Benefit Auctions",
    },
    collections_rail: {
      items: [
        {
          id: "jean-michel-basquiat-crowns",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
        {
          id: "collect-by-color-orange",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
        {
          id: "minimalist-prints",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
      ],
      subtitle: "Proceeds go to a cool charity.",
      title: "Collections",
    },
    fairs_rail: {
      items: [
        {
          id: "5dfcfda63f1d3b00127644ad",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
        {
          id: "5e5e45095c859000102aa95f",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
        {
          id: "5d88fbc5192508000efb03d4",
          image_src:
            "https://d32dm0rphc51dk.cloudfront.net/Nr7AtUmX2UVpIcb7sXoJug/large.jpg",
        },
      ],
      subtitle: "Proceeds go to a cool charity.",
      title: "Fairs",
    },
    subtitle: null,
    title: "Browse",
  },
  description:
    "Art-world spaces have paused, museums and galleries have closed their doors, exhibitions have canceled, and auctions and fairs have been postponed. Still, even in times of crisis, art can bring us closer and keep us connected across time and place. And in times of crises, art continues to move us and keeps going, and and keeps us connected.",
  editorial: {
    article_ids: [
      "artsy-editorial-salman-toors-intimate-paintings-salve-isolated-times",
      "artsy-editorial-jordan-casteels-bold-portraiture-market-trend",
      "artsy-editorial-two-artists-endearing-lizard-videos-connecting-thousands-quarantine",
      "artsy-editorial-obsessed-mick-jaggers-green-jacket-richard-hamilton-work",
    ],
    subtitle: null,
    title: "Editorial",
    view_more_url: "/articles",
  },
  featured_artists: {
    artists: [
      {
        byline: "Pace Gallery",
        description:
          "This is why we’re featuring this artist. Art keeps us connected across time and place. Art is a source for joy, inspiration, and reflection.",
        image_src:
          "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
        subtitle: null,
        title: "Nicolas Party",
        url: "https://artsy.net/artist/nicolas-party",
      },
      {
        byline: "Pace Gallery",
        description:
          "This is why we’re featuring this artist. Art keeps us connected across time and place. Art is a source for joy, inspiration, and reflection.",
        image_src:
          "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
        subtitle: null,
        title: "Nicolas Party",
        url: "https://artsy.net/artist/nicolas-party",
      },
      {
        byline: "Pace Gallery",
        description:
          "This is why we’re featuring this artist. Art keeps us connected across time and place. Art is a source for joy, inspiration, and reflection.",
        image_src:
          "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
        subtitle: null,
        title: "Nicolas Party",
        url: "https://artsy.net/artist/nicolas-party",
      },
      {
        byline: "Pace Gallery",
        description:
          "This is why we’re featuring this artist. Art keeps us connected across time and place. Art is a source for joy, inspiration, and reflection.",
        image_src:
          "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
        subtitle: null,
        title: "Nicolas Party",
        url: "https://artsy.net/artist/nicolas-party",
      },
    ],
    subtitle: null,
    title: "Featured Artists",
  },
  featured_this_week: {
    featured_item_1: {
      description:
        "This is why we’re featuring this collection. Art keeps us connected across time and place. Art is a source for joy, inspiration, and reflection.",
      image_src:
        "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
      subtitle: "Collection",
      title: "Artworks to buy in a crisis",
      url: "https://staging.artsy.net/collection/impressionist-and-modern",
    },
    featured_item_2: {
      description:
        "This is why we’re featuring this collection. Art keeps us connected across time and place. Art is a source for joy, inspiration, and reflection.",
      image_src:
        "https://d32dm0rphc51dk.cloudfront.net/VtWCDMSUVOlNb16y_cf2Mg/large.jpg",
      subtitle: "Auction ends 5/30",
      title: "Benefit Auction For Good",
      url: "https://staging.artsy.net/auction/heritage-signature-photographs-1",
    },
    subtitle: null,
    title: "Featured This Week",
  },
  selected_works: {
    set_id: "56e057c8139b213d70002393",
    subtitle: "10% of all proceeds to go to Charity Name",
    title: "Selected Works",
  },
  video_1: {
    small_src: "https://files.artsy.net/video_1_small.mp4",
    large_src: "https://files.artsy.net/video_1_large.mp4",
  },
  video_2: {
    small_src: "https://files.artsy.net/video_2_small.mp4",
    large_src: "https://files.artsy.net/video_2_large.mp4",
  },
  hero_video: {
    small_src: "https://files.artsy.net/hero_video_small.mp4",
    large_src: "https://files.artsy.net/hero_video_large.mp4",
  },
}

const ArtKeepsGoingFixture: FeatureAKGRoute_Test_QueryRawResponse = {
  viewer: {
    articles: [
      {
        id: "articleid-1",
        thumbnailTitle: "This Article is Really Cool",
        publishedAt: "April 20, 2013",
        thumbnailImage: {
          cropped: {
            width: 1,
            height: 1,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        tinyImage: {
          cropped: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        href: "/article/article-1",
      },
      {
        id: "articleid-2",
        thumbnailTitle: "This Article is Really Cool",
        publishedAt: "April 20, 2013",
        thumbnailImage: {
          cropped: {
            width: 1,
            height: 1,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        tinyImage: {
          cropped: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        href: "/article/article-2",
      },
      {
        id: "articleid-3",
        thumbnailTitle: "This Article is Really Cool",
        publishedAt: "April 20, 2013",
        thumbnailImage: {
          cropped: {
            width: 1,
            height: 1,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        tinyImage: {
          cropped: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        href: "/article/article-1",
      },
      {
        id: "articleid-4",
        thumbnailTitle: "This Article is Really Cool",
        publishedAt: "April 20, 2013",
        thumbnailImage: {
          cropped: {
            width: 1,
            height: 1,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        tinyImage: {
          cropped: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/PCuKcu_h43P0IfBpXNkNcQ/large.jpg",
          },
        },
        href: "/article/article-1",
      },
    ],
    selectedWorks: {
      id: "selected-works",
      itemsConnection: {
        __isArtworkConnectionInterface: "ArtworkConnection",
        edges: [
          {
            __typename: "Artwork",
            id: "edge-1",
            node: {
              id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=",
              slug: "andy-warhol-cow-ii-dot-12-31",
              href: "/artwork/andy-warhol-cow-ii-dot-12-31",
              image: {
                resized: {
                  src: "",
                  srcSet: "",
                  width: 10,
                  height: 200,
                },
                aspect_ratio: 0.69,
                placeholder: "foo",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
              },
              image_title: "title",
              internalID: "5811004d8b0c141dd4000b61",
              title: "Cow, II.12",
              date: "1971",
              sale_message: "$32,500",
              cultural_maker: null,
              artists: [
                {
                  id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                  href: "/artist/andy-warhol",
                  name: "Andy Warhol",
                },
              ],
              artistNames: "Andy Warhol",
              collecting_institution: null,
              partner: {
                name: "Hamilton-Selway Fine Art",
                href: "/hamilton-selway-fine-art",
                id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
                type: "Gallery",
              },
              sale: null,
              sale_artwork: null,
              saleArtwork: null,
              is_inquireable: true,
              is_saved: false,
              is_biddable: false,
              attributionClass: null,
              mediumType: null,
            },
          },
          {
            __typename: "Artwork",
            id: "edge-2",
            node: {
              id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=sss",
              slug: "andy-warhol-cow-ii-dot-12-31",
              href: "/artwork/andy-warhol-cow-ii-dot-12-31",
              image: {
                resized: {
                  src: "",
                  srcSet: "",
                  width: 10,
                  height: 200,
                },
                aspect_ratio: 0.69,
                placeholder: "foo",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
              },
              internalID: "5811004d8b0c141dd4000b61",
              title: "Cow, II.12",
              image_title: "title",
              date: "1971",
              sale_message: "$32,500",
              cultural_maker: null,
              artists: [
                {
                  id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                  href: "/artist/andy-warhol",
                  name: "Andy Warhol",
                },
              ],
              artistNames: "Andy Warhol",
              collecting_institution: null,
              partner: {
                name: "Hamilton-Selway Fine Art",
                href: "/hamilton-selway-fine-art",
                id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
                type: "Gallery",
              },
              sale: null,
              sale_artwork: null,
              saleArtwork: null,
              is_inquireable: true,
              is_saved: false,
              is_biddable: false,
              attributionClass: null,
              mediumType: null,
            },
          },
        ],
      },
    },
    collections: [
      {
        slug: "jean-michel-basquiat-crowns",
        title: "Kaws: Red",
        id: "collection-1",
      },
      {
        slug: "collect-by-color-orange",
        title: "Kaws: Blue",
        id: "collection-2",
      },
      {
        slug: "minimalist-prints",
        title: "Kaws: Green",
        id: "collection-3",
      },
    ],
    auctions: {
      edges: [
        {
          node: {
            slug: "seoul-auction-spring-online-auction-goat",
            name: "Auction 1",
            href: "/auction/auction-1",
            id: "auction1",
          },
        },
        {
          node: {
            slug: "heritage-signature-photographs-1",
            name: "Auction 2",
            href: "/auction/auction-2",
            id: "auction",
          },
        },
        {
          node: {
            slug:
              "dope-gallery-global-icons-slash-contemporary-prints-and-editions",
            name: "Auction 3",
            href: "/auction/auction-3",
            id: "auction3",
          },
        },
      ],
    },
    fairs: [
      {
        internalID: "5dfcfda63f1d3b00127644ad",
        name: "Fair 1",
        id: "fair-1",
        href: "/fair/fair-1",
      },
      {
        internalID: "5e5e45095c859000102aa95f",
        name: "Fair 2",
        id: "fair-2",
        href: "/fair/fair-2",
      },
      {
        internalID: "5d88fbc5192508000efb03d4",
        name: "Fair 3",
        id: "fair-3",
        href: "/fair/fair-3",
      },
    ],
  },
}
