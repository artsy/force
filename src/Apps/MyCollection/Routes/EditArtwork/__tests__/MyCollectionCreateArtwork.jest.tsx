import { act, fireEvent, screen } from "@testing-library/react"
import { MyCollectionCreateArtworkFragmentContainer } from "Apps/MyCollection/Routes/EditArtwork/MyCollectionCreateArtwork"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MockPayloadGenerator } from "relay-test-utils"
import { CleanRelayFragment } from "Utils/typeSupport"
import { MyCollectionCreateArtwork_me$data } from "__generated__/MyCollectionCreateArtwork_me.graphql"

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: {
      push: mockRouterPush,
      replace: mockRouterReplace,
    },
  })),
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

jest.mock("Components/PhotoUpload/Utils/fileUtils", () => ({
  ...jest.requireActual("Components/PhotoUpload/Utils/fileUtils"),
  uploadMyCollectionPhoto: jest.fn(),
}))
jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyCollectionCreateArtwork", () => {
  const getWrapper = (props: Record<string, any> = {}) => {
    const { breakpoint = "lg" } = props

    const { env } = setupTestWrapperTL({
      Component: (props: any) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <MyCollectionCreateArtworkFragmentContainer {...props} />
          </MockBoot>
        )
      },
      query: graphql`
        query MyCollectionCreateArtworkTest_Query {
          me {
            ...MyCollectionCreateArtwork_me
          }
        }
      `,
    }).renderWithRelay({ Me: () => mockMe })

    return env
  }

  describe("when the new upload flow is enabled", () => {
    describe("Select Artist step", () => {
      describe("back button", () => {
        it("navigates back to the My Collection page", async () => {
          getWrapper()

          fireEvent.click(screen.getByText("Back"))

          expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/collector-profile/my-collection",
          })
        })
      })
    })

    describe("Select Artwork step", () => {
      describe("back button", () => {
        it("navigates back to the select artist step", async () => {
          getWrapper()

          await flushPromiseQueue()

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          expect(screen.getByText("Select an Artwork")).toBeInTheDocument()

          fireEvent.click(screen.getByText("Back"))

          expect(screen.getByText("Select an Artist")).toBeInTheDocument()
        })
      })

      describe("skip button", () => {
        it("navigates to the Detail step", async () => {
          getWrapper()

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          expect(screen.getByText("Select an Artwork")).toBeInTheDocument()

          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        })
      })
    })

    describe("Detail step", () => {
      describe("back button", () => {
        it("opens modal before navigating to the previous screen", async () => {
          getWrapper()

          // Navigate to the detail step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))
          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()

          fireEvent.click(screen.getByText("Back"))

          fireEvent.click(screen.getByText("Leave Without Saving"))

          expect(screen.getByText("Select an Artist")).toBeInTheDocument()
        })
      })

      describe("when an artist has been selected", () => {
        it("shows the artist avatar", async () => {
          getWrapper()

          // Navigate to the detail step and select an artist
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))
          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
          expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

          expect(
            screen.queryByPlaceholderText("Enter full name")
          ).not.toBeInTheDocument()
          expect(screen.getByText("Banksy")).toBeInTheDocument()
          expect(screen.getByText("British, b. 1974")).toBeInTheDocument()
        })
      })
    })

    describe("when no artist has been selected", () => {
      it("shows the artist input", async () => {
        getWrapper()

        // Navigate to the detail step without selecting an artist
        fireEvent.click(screen.getByTestId("artist-select-skip-button"))

        expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

        expect(
          screen.queryByPlaceholderText("Enter full name")
        ).toBeInTheDocument()
      })
    })

    describe("when skipping the artist select step", () => {
      it("populates artwork name input with search query", async () => {
        getWrapper()

        fireEvent.change(
          screen.getByPlaceholderText("Search for artists on Artsy"),
          {
            target: { value: "Someone" },
          }
        )

        // Navigate to the detail step
        fireEvent.click(screen.getByTestId("artist-select-skip-button"))

        expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

        expect(screen.getByPlaceholderText("Enter full name")).toHaveValue(
          "Someone"
        )
      })
    })

    describe("when selecting an artist", () => {
      describe("with an artist without artworks", () => {
        it("skips the Artwork step", async () => {
          getWrapper()

          // Selecting an artist without artworks
          fireEvent.click(screen.getByTestId("artist-4d8b927f4eb68a1b2c00017c"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
          expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

          expect(screen.getByText("Joan Miró")).toBeInTheDocument()
          expect(screen.getByText("Spanish, 1893–1983")).toBeInTheDocument()
        })
      })
      describe("when skipping the artwork select step", () => {
        it("populates artist and artwork title in the form", async () => {
          getWrapper()

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          fireEvent.change(screen.getByPlaceholderText("Search for artworks"), {
            target: { value: "An Artwork" },
          })

          // Navigate to the detail step
          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
          expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

          expect(screen.getByText("Banksy")).toBeInTheDocument()
          expect(screen.getByText("British, b. 1974")).toBeInTheDocument()

          expect(
            screen.getByTestId("my-collection-artwork-details-title")
          ).toHaveValue("An Artwork")
        })
      })

      describe("when selecting an artwork", () => {
        it("populates the form with the artwork details", async () => {
          const env = getWrapper()

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          act(() => {
            env.mock.resolveMostRecentOperation(operation => {
              return MockPayloadGenerator.generate(operation, {
                Artist: () => mockArtist,
              })
            })
          })

          await flushPromiseQueue()

          // Navigate to the detail step
          fireEvent.click(
            screen.getByTestId("artwork-630df944aeae3e000ea202f3")
          )

          // TODO: Check form values
          expect(screen.getByText("Select an Artwork")).toBeInTheDocument()

          // await flushPromiseQueue()
          // expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
          // expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

          // expect(screen.getByText("Banksy")).toBeInTheDocument()
          // expect(screen.getByText("British, b. 1974")).toBeInTheDocument()

          // expect(screen.getByPlaceholderText("Title")).toHaveValue("An Artwork")
          // expect(screen.getByPlaceholderText("YYYY")).toHaveValue("An Artwork")
          // expect(
          //   screen.getByPlaceholderText(
          //     "Oil on Canvas, Mixed Media, Lithograph…"
          //   )
          // ).toHaveValue("An Artwork")
          // expect(screen.getByPlaceholderText("Edition Number")).toHaveValue(
          //   "An Artwork"
          // )
          // expect(
          //   screen.getByTestId("my-collection-artwork-details-height")
          // ).toHaveValue("An Artwork")

          // TODO: Check photos
        })
      })
    })
  })
})

const mockMe = {
  myCollectionInfo: {
    collectedArtistsConnection: {
      edges: [
        {
          node: {
            __typename: "Artist",
            displayLabel: "Banksy",
            formattedNationalityAndBirthday: "British, b. 1974",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FX9vVvod7QY73ZwLDSZzljw%2Flarge.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FX9vVvod7QY73ZwLDSZzljw%2Flarge.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FX9vVvod7QY73ZwLDSZzljw%2Flarge.jpg&width=90 2x",
              },
            },
            initials: "B",
            internalID: "4dd1584de0091e000100207c",
            isPersonalArtist: false,
            name: "Banksy",
            slug: "banksy",
            counts: {
              artworks: 100,
            },
          },
        },
        {
          node: {
            __typename: "Artist",
            displayLabel: "Joan Miró",
            formattedNationalityAndBirthday: "Spanish, 1893–1983",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FDvZH9-qtZotZ5w1596tctA%2Flarge.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FDvZH9-qtZotZ5w1596tctA%2Flarge.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FDvZH9-qtZotZ5w1596tctA%2Flarge.jpg&width=90 2x",
              },
            },
            initials: "JM",
            internalID: "4d8b927f4eb68a1b2c00017c",
            isPersonalArtist: false,
            name: "Joan Miró",
            slug: "joan-miro",
            counts: {
              artworks: 0,
            },
          },
        },
        {
          node: {
            __typename: "Artist",
            displayLabel: "Daniel Richter",
            formattedNationalityAndBirthday: "German, b. 1962",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F4F7gPHDcx-zo1-KQMZrhOQ%2Flarge.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F4F7gPHDcx-zo1-KQMZrhOQ%2Flarge.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F4F7gPHDcx-zo1-KQMZrhOQ%2Flarge.jpg&width=90 2x",
              },
            },
            initials: "DR",
            internalID: "4e9763d14e77d30001001da6",
            isPersonalArtist: false,
            name: "Daniel Richter",
            slug: "daniel-richter",
          },
        },
        {
          node: {
            __typename: "Artist",
            displayLabel: "Gerhard Richter",
            formattedNationalityAndBirthday: "German, b. 1932",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrRTvzzrz1FIybrFzbrPagQ%2Flarge.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrRTvzzrz1FIybrFzbrPagQ%2Flarge.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrRTvzzrz1FIybrFzbrPagQ%2Flarge.jpg&width=90 2x",
              },
            },
            initials: "GR",
            internalID: "4df69349bc3cf10001000726",
            isPersonalArtist: false,
            name: "Gerhard Richter",
            slug: "gerhard-richter",
          },
        },
        {
          node: {
            __typename: "Artist",
            displayLabel: "Hans Richter",
            formattedNationalityAndBirthday: "German, 1888–1976",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKVLI9Ht_Dt2WJN1ByAv0yg%2Fsquare.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKVLI9Ht_Dt2WJN1ByAv0yg%2Fsquare.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKVLI9Ht_Dt2WJN1ByAv0yg%2Fsquare.jpg&width=90 2x",
              },
            },
            initials: "HR",
            internalID: "5295e90a9c18dbf487000158",
            isPersonalArtist: false,
            name: "Hans Richter",
            slug: "hans-richter",
          },
        },
        {
          node: {
            __typename: "Artist",
            displayLabel: "Sal",
            formattedNationalityAndBirthday: "Japanese, b. 1970",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8SRr_x1xJiobS88sZdn52Q%2Flarge.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8SRr_x1xJiobS88sZdn52Q%2Flarge.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8SRr_x1xJiobS88sZdn52Q%2Flarge.jpg&width=90 2x",
              },
            },
            initials: "S",
            internalID: "5d93338eadee1a000effa25a",
            isPersonalArtist: false,
            name: "Sal",
            slug: "sal-1",
          },
        },
        {
          node: {
            __typename: "Artist",
            displayLabel: "Andy Warhol",
            formattedNationalityAndBirthday: "American, 1928–1987",
            image: {
              cropped: {
                src:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE-k-uLoQADM8AjadsSKHrA%2Flarge.jpg&width=45",
                srcSet:
                  "https://d196wkiy8qx2u5.cloudfront.net?height=45&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE-k-uLoQADM8AjadsSKHrA%2Flarge.jpg&width=45 1x, https://d196wkiy8qx2u5.cloudfront.net?height=90&quality=50&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE-k-uLoQADM8AjadsSKHrA%2Flarge.jpg&width=90 2x",
              },
            },
            initials: "AW",
            internalID: "4d8b92b34eb68a1b2c0003f4",
            isPersonalArtist: false,
            name: "Andy Warhol",
            slug: "andy-warhol",
          },
        },
      ],
    },
  },
} as CleanRelayFragment<MyCollectionCreateArtwork_me$data>

const mockArtist = {
  filterArtworksConnection: {
    edges: [
      {
        node: {
          medium: "Oil on canvas",
          date: "2022",
          depth: null,
          editionSize: null,
          editionNumber: null,
          height: null,
          images: [
            {
              height: 2385,
              isDefault: true,
              imageURL:
                "https://d32dm0rphc51dk.cloudfront.net/DTh4yTCxyXI1XYcc7Sq7zg/:version.jpg",
              width: 3157,
            },
          ],
          id: "QXJ0d29yazo2MzBkZjk0NGFlYWUzZTAwMGVhMjAyZjM=",
          internalID: "630df944aeae3e000ea202f3",
          isEdition: false,
          category: "Painting",
          metric: null,
          title: "Landscape Study no.3 (Tiepolo)",
          width: null,
          imageTitle:
            "Megan Mary Baker, ‘Landscape Study no.3 (Tiepolo)’, 2022",
          image: {
            placeholder: "75.5464048146975%",
            url:
              "https://d32dm0rphc51dk.cloudfront.net/DTh4yTCxyXI1XYcc7Sq7zg/larger.jpg",
            aspectRatio: 1.32,
          },
          artistNames: "Megan Mary Baker",
          href: "/artwork/megan-mary-baker-landscape-study-no-dot-3-tiepolo",
          sale_message: "Sold",
          cultural_maker: null,
          artist: {
            targetSupply: {
              isP1: false,
            },
            id: "QXJ0aXN0OjVkYjllN2U3Nzg3YWRkMDAxMjM0YjAyNQ==",
          },
          marketPriceInsights: null,
          artists: [
            {
              id: "QXJ0aXN0OjVkYjllN2U3Nzg3YWRkMDAxMjM0YjAyNQ==",
              href: "/artist/megan-mary-baker",
              name: "Megan Mary Baker",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Gillian Jason Gallery",
            href: "/partner/gillian-jason-gallery",
            id: "UGFydG5lcjo1YmZkNDA1N2Q0MGJkNjM1NDYwNmI0NzI=",
          },
          sale: null,
          sale_artwork: null,
          slug: "megan-mary-baker-landscape-study-no-dot-3-tiepolo",
          isSaved: false,
          attributionClass: {
            name: "Unique",
            id: "QXR0cmlidXRpb25DbGFzczp1bmlxdWU=",
          },
          mediumType: {
            filterGene: {
              name: "Painting",
              id: "R2VuZTo0ZDkwZDE4ZWRjZGQ1ZjQ0YTUwMDAwMTA=",
            },
          },
          is_biddable: false,
        },
      },
      {
        node: {
          medium: "Oil on canvas",
          date: "2022",
          depth: null,
          editionSize: null,
          editionNumber: null,
          height: null,
          images: [
            {
              height: 2399,
              isDefault: true,
              imageURL:
                "https://d32dm0rphc51dk.cloudfront.net/rnlenDwA_AgRuMIvn0MG0Q/:version.jpg",
              width: 2802,
            },
          ],
          id: "QXJ0d29yazo2MzBkZjg4NWMwZGQyNTAwMGM5YjhjOGY=",
          internalID: "630df885c0dd25000c9b8c8f",
          isEdition: false,
          category: "Painting",
          metric: null,
          title: "What a Thing to Be Still When Everything Else is Moving",
          width: null,
          imageTitle:
            "Megan Mary Baker, ‘What a Thing to Be Still When Everything Else is Moving’, 2022",
          image: {
            placeholder: "85.61741613133475%",
            url:
              "https://d32dm0rphc51dk.cloudfront.net/rnlenDwA_AgRuMIvn0MG0Q/larger.jpg",
            aspectRatio: 1.17,
          },
          artistNames: "Megan Mary Baker",
          href:
            "/artwork/megan-mary-baker-what-a-thing-to-be-still-when-everything-else-is-moving",
          sale_message: "£9,750–£10,250",
          cultural_maker: null,
          artist: {
            targetSupply: {
              isP1: false,
            },
            id: "QXJ0aXN0OjVkYjllN2U3Nzg3YWRkMDAxMjM0YjAyNQ==",
          },
          marketPriceInsights: null,
          artists: [
            {
              id: "QXJ0aXN0OjVkYjllN2U3Nzg3YWRkMDAxMjM0YjAyNQ==",
              href: "/artist/megan-mary-baker",
              name: "Megan Mary Baker",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Gillian Jason Gallery",
            href: "/partner/gillian-jason-gallery",
            id: "UGFydG5lcjo1YmZkNDA1N2Q0MGJkNjM1NDYwNmI0NzI=",
          },
          sale: null,
          sale_artwork: null,
          slug:
            "megan-mary-baker-what-a-thing-to-be-still-when-everything-else-is-moving",
          isSaved: false,
          attributionClass: {
            name: "Unique",
            id: "QXR0cmlidXRpb25DbGFzczp1bmlxdWU=",
          },
          mediumType: {
            filterGene: {
              name: "Painting",
              id: "R2VuZTo0ZDkwZDE4ZWRjZGQ1ZjQ0YTUwMDAwMTA=",
            },
          },
          is_biddable: false,
        },
      },
    ],
    id:
      "ZmlsdGVyQXJ0d29ya3NDb25uZWN0aW9uOnsiYWdncmVnYXRpb25zIjpbInRvdGFsIl0sImFydGlzdF9pZCI6IjVkYjllN2U3Nzg3YWRkMDAxMjM0YjAyNSIsInBhZ2UiOjEsInNpemUiOjMwfQ==",
  },
  id: "QXJ0aXN0OjVkYjllN2U3Nzg3YWRkMDAxMjM0YjAyNQ==",
}
