import { EntityHeader } from "@artsy/palette"
import { Header_artworks } from "v2/__generated__/Header_artworks.graphql"
import {
  collectionHeaderArtworks,
  defaultCollectionHeaderArtworks,
} from "v2/Apps/Collect/Routes/Collection/Components/Header/__tests__/fixtures/artworks"
import { SystemContextProvider } from "v2/Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import sharify from "sharify"
import { CollectionHeader, Props, getFeaturedArtists } from "../index"
import { mediator } from "lib/mediator"

jest.mock("sharify", () => ({
  get data() {
    return { IS_MOBILE: false }
  },
}))

jest.mock("found", () => ({
  Link: props => <div>{props.children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

jest.mock("v2/Artsy/Analytics/useTracking", () => {
  return {
    useTracking: () => ({
      trackEvent: jest.fn(),
    }),
  }
})

describe("collections header", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
  })

  const props: Props = {
    artworks: collectionHeaderArtworks,
    collection: {
      " $refType": null,
      id: "abcdefg1234",
      title: "KAWS: Toys",
      credit: null,
      description: null,
      category: "Collectible Sculptures",
      slug: "kaws-toys",
      headerImage:
        "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
      query: {
        artistIDs: ["4e934002e340fa0001005336"],
      },
      featuredArtistExclusionIds: [],
    },
  }

  function mountComponent(
    theProps: Props,
    breakpoint: "xs" | "sm" | "md" | "lg" = "sm"
  ) {
    return mount(
      <MockBoot breakpoint={breakpoint}>
        <SystemContextProvider>
          <CollectionHeader {...theProps} />
        </SystemContextProvider>
      </MockBoot>
    )
  }

  it("doesnt blow up if missing merchandisableArtists or artistIDs", () => {
    const noArtistsOrIDs = cloneDeep(props) as any
    noArtistsOrIDs.collection.query.artistIDs = null
    noArtistsOrIDs.artworks.merchandisableArtists = null
    expect(() => {
      mountComponent(noArtistsOrIDs)
    }).not.toThrowError()
  })

  it("renders the default collections header when there is no header image", () => {
    const component = mountComponent({
      ...props,
      artworks: defaultCollectionHeaderArtworks as any,
      collection: {
        ...props.collection,
        headerImage: "",
      },
    })

    const defaultHeader = component.find("CollectionDefaultHeader")
    const singleImageHeader = component.find("CollectionSingleImageHeader")

    expect(defaultHeader.length).toEqual(1)
    expect(singleImageHeader.length).toEqual(0)
  })

  describe("getFeaturedArtists", () => {
    it("returns the queried artists when there is explicit artistIDs", () => {
      const { collection, artworks } = props
      const results = getFeaturedArtists(
        9,
        collection,
        artworks.merchandisableArtists
      )

      expect(results!.length).toEqual(1)
    })

    it("returns merchandisable artists when there is no explicit artistIDs", () => {
      const { collection, artworks } = props
      const results = getFeaturedArtists(
        9,
        {
          ...collection,
          query: {
            ...collection.query,
            artistIDs: [],
          },
        },
        artworks.merchandisableArtists
      )

      expect(results!.length).toEqual(4)
    })

    it("passes correct arguments featuredArtistsEntityCollection", () => {
      const { collection, artworks } = props

      const results = getFeaturedArtists(
        9,
        collection,
        artworks.merchandisableArtists
      )

      expect(results.length).toBe(1)
      const artist = results[0]

      expect(artist).toMatchObject({
        name: "KAWS",
        image: {
          resized: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=45&height=45&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FWhacjFyMKlMkNVzncPjlRA%2Fsquare.jpg",
          },
        },
        birthday: "1974",
        nationality: "American",
      })
    })

    it("return artists with featuredArtistExclusionIds removed", () => {
      // artists ids for Robert Lazzarini and Medicom
      const excludedIds = [
        "4f5f64c23b555230ac0003ae",
        "58fe85ee275b2450a0fd2b51",
      ]
      const { collection, artworks } = props
      const results = getFeaturedArtists(
        9,
        {
          ...collection,
          featuredArtistExclusionIds: excludedIds,
          query: {
            ...collection.query,
            artistIDs: [],
          },
        },
        artworks.merchandisableArtists
      )

      const artistIds = results.map(artist => artist.slug)
      expect(artistIds).toEqual(expect.not.arrayContaining(excludedIds))
    })
  })

  describe("collection meta data", () => {
    it("renders the title", () => {
      const component = mountComponent({
        ...props,
        collection: {
          ...props.collection,
          title: "Scooby Doo",
        },
      })

      expect(component.find("h1").text()).toContain("Scooby Doo")
    })

    it("renders breadcrumb category", () => {
      const component = mountComponent({
        ...props,
        collection: {
          ...props.collection,
          category: "Nachos",
        },
      })

      expect(component.text()).toContain("All works")
      expect(component.text()).toContain("Nachos")
    })

    describe("description", () => {
      describe("smaller screen", () => {
        it("renders truncated description if description exists", () => {
          const component = mountComponent({
            ...props,
            collection: {
              ...props.collection,
              description: "some description",
            },
          })

          const readMore = component.find("ReadMore")
          expect(readMore.length).toEqual(1)
          expect(readMore.text()).toContain("some description")
        })

        it("renders truncation with no text if description does not exist", () => {
          const component = mountComponent({
            ...props,
            collection: {
              ...props.collection,
              description: undefined,
            },
          })

          const readMore = component.find("ReadMore")
          expect(readMore!.length).toEqual(1)
          expect(readMore.text()).toEqual("")
        })
      })

      describe("larger screen", () => {
        it("renders description untruncated if description exists", () => {
          const component = mountComponent(
            {
              ...props,
              collection: {
                ...props.collection,
                description: "some description",
              },
            },
            "lg"
          )

          expect(component.find("ReadMore").length).toEqual(0)
          expect(component.text()).toContain("some description")
        })
      })

      it("renders a formatted string description", () => {
        const component = mountComponent({
          ...props,
          collection: {
            ...props.collection,
            description: "<i>your description</i>",
          },
        })

        expect(component.html()).toContain("<i>your description</i>")
      })
    })
  })

  describe("collection header featured artists rail", () => {
    it("renders featured artists when featured artists exist", () => {
      const component = mountComponent(
        {
          ...props,
          collection: {
            ...props.collection,
            query: {
              ...props.collection.query,
              artistIDs: [],
            },
          },
        },
        "lg"
      )
      const entityHeaders = component.find(EntityHeader)

      expect(component.text()).toContain("Featured Artists")
      expect(entityHeaders.length).toEqual(4)
    })

    it("does not render featured artists when they don't exist", () => {
      const component = mountComponent(
        {
          ...props,
          artworks: {
            ...props.artworks,
            merchandisableArtists: [],
          },
        },
        "lg"
      )
      const entities = component.find(EntityHeader)

      expect(component.text()).not.toContain("Featured Artists")
      expect(entities.length).toEqual(0)
    })

    function anArtist(): Header_artworks["merchandisableArtists"][number] {
      return {
        slug: "medicom-toy-slash-china",
        internalID: "5b9821af86c8aa21d364dde5",
        name: "Medicom Toy/China",
        image: {
          resized: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=45&height=45&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FnpEmyaOeaPzkfEHX5VsmQg%2Fsquare.jpg",
          },
        },
        birthday: "",
        nationality: "",
        " $fragmentRefs": null,
      }
    }

    it("shows 3 featured artists on mobile when not filtered by artist ids", () => {
      const overrideData = jest.spyOn(sharify, "data", "get")
      overrideData.mockReturnValueOnce({ IS_MOBILE: true } as any)

      const component = mountComponent(
        {
          ...props,
          collection: {
            ...props.collection,
            query: {
              ...props.collection.query,
              artistIDs: [],
            },
          },
        },
        "xs"
      )
      const entityHeaders = component.find(EntityHeader)

      expect(component.text()).toContain("Featured Artists")
      expect(entityHeaders.length).toEqual(4) // 4 = 3 artists + 1 "View More"
    })

    it("shows 3 featured artists at small breakpoint when not filtered by artist ids", () => {
      const component = mountComponent(
        {
          ...props,
          artworks: {
            ...props.artworks,
            merchandisableArtists: [
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
            ],
          },
          collection: {
            ...props.collection,
            query: {
              ...props.collection.query,
              artistIDs: [],
            },
          },
        },
        "sm"
      )
      const entityHeaders = component.find(EntityHeader)

      expect(component.text()).toContain("Featured Artists")
      expect(entityHeaders.length).toEqual(4) // 4 = 3 artists + 1 "View More"
    })

    it("shows 5 featured artists at medium breakpoint when not filtered by artist ids", () => {
      const component = mountComponent(
        {
          ...props,
          artworks: {
            ...props.artworks,
            merchandisableArtists: [
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
            ],
          },
          collection: {
            ...props.collection,
            query: {
              ...props.collection.query,
              artistIDs: [],
            },
          },
        },
        "md"
      )
      const entityHeaders = component.find(EntityHeader)

      expect(component.text()).toContain("Featured Artists")
      expect(entityHeaders.length).toEqual(6) // 6 = 5 artists + 1 "View More"
    })

    it("shows 7 featured artists at large breakpoint when not filtered by artist ids", () => {
      const component = mountComponent(
        {
          ...props,
          artworks: {
            ...props.artworks,
            merchandisableArtists: [
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
            ],
          },
          collection: {
            ...props.collection,
            query: {
              ...props.collection.query,
              artistIDs: [],
            },
          },
        },
        "lg"
      )
      const entityHeaders = component.find(EntityHeader)

      expect(component.text()).toContain("Featured Artists")
      expect(entityHeaders.length).toEqual(8) // 8 = 7 artists + 1 "View More"
    })

    it("shows all featured artists after clicking 'show more'", () => {
      const component = mountComponent(
        {
          ...props,
          artworks: {
            ...props.artworks,
            merchandisableArtists: [
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
              anArtist(),
            ],
          },
          collection: {
            ...props.collection,
            query: {
              ...props.collection.query,
              artistIDs: [],
            },
          },
        },
        "xs"
      )
      const entityHeaders = component.find(EntityHeader)

      expect(entityHeaders.length).toEqual(4) // 4 = 3 artists + 1 "View More"

      const viewMore = component.find("ViewMore")
      viewMore.simulate("click")

      expect(component.find(EntityHeader).length).toEqual(6)
    })

    it("opens auth modal with expected args when following an artist", () => {
      const component = mountComponent(props)
      component.find(FollowArtistButton).first().simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        mode: "signup",
        contextModule: "featuredArtistsRail",
        copy: "Sign up to follow KAWS",
        intent: "followArtist",
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "kaws",
        },
      })
    })
  })
})
