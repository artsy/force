import { fireEvent, screen } from "@testing-library/react"
import { MyCollectionCreateArtworkFragmentContainer } from "Apps/MyCollection/Routes/EditArtwork/MyCollectionCreateArtwork"
import { flushPromiseQueue, MockBoot } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { CleanRelayFragment } from "Utils/typeSupport"
import { MyCollectionCreateArtwork_me$data } from "__generated__/MyCollectionCreateArtwork_me.graphql"

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
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
    const {
      breakpoint = "lg",
      featureFlags = {
        "cx-my-collection-uploading-flow-steps": { flagEnabled: false },
      },
    } = props

    setupTestWrapperTL({
      Component: (props: any) => {
        return (
          <MockBoot breakpoint={breakpoint} context={{ featureFlags }}>
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
  }

  describe("when the new upload flow is enabled", () => {
    describe("Select Artist step", () => {
      describe("back button", () => {
        it("navigates back to the My Collection page", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          fireEvent.click(screen.getByText("Back"))

          expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/settings/my-collection",
          })
        })
      })

      describe("skip button", () => {
        it("navigates to the Detail step", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          await flushPromiseQueue()

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        })
      })
    })

    describe("Select Artwork step", () => {
      describe("back button", () => {
        it("navigates back to the select artist step", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          await flushPromiseQueue()

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          expect(screen.getByText("Select Artwork")).toBeInTheDocument()

          fireEvent.click(screen.getByText("Back"))

          expect(screen.getByText("Select an Artist")).toBeInTheDocument()
        })
      })

      describe("skip button", () => {
        it("navigates to the Detail step", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          expect(screen.getByText("Select Artwork")).toBeInTheDocument()

          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        })
      })
    })

    describe("Detail step", () => {
      describe("back button", () => {
        it("opens modal before navigating to the previous screen", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the detail step
          fireEvent.click(screen.getByTestId("artist-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()

          fireEvent.click(screen.getByText("Back"))

          fireEvent.click(screen.getByText("Leave Without Saving"))

          expect(screen.getByText("Select an Artist")).toBeInTheDocument()
        })
      })

      it("doesn't populate inputs", async () => {
        getWrapper({
          featureFlags: {
            "cx-my-collection-uploading-flow-steps": {
              flagEnabled: true,
            },
          },
        })

        // Navigate to the detail step
        fireEvent.click(screen.getByTestId("artist-select-skip-button"))

        expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

        expect(screen.getByPlaceholderText("Enter full name")).toHaveValue("")
      })
    })

    describe("when skipping the artist select step", () => {
      it("populates artwork name input with search query", async () => {
        getWrapper({
          featureFlags: {
            "cx-my-collection-uploading-flow-steps": {
              flagEnabled: true,
            },
          },
        })

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
      describe("when skipping the artwork select step", () => {
        it("populates artist and artwork title in the form", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-4dd1584de0091e000100207c"))

          // TODO: Implement test for search query
          // fireEvent.change(
          //   screen.getByPlaceholderText("Search for artists on Artsy"),
          //   {
          //     target: { value: "An Artwork" },
          //   }
          // )

          // Navigate to the detail step
          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
          expect(screen.getByText("Upload Artwork")).toBeInTheDocument()

          expect(screen.getByPlaceholderText("Enter full name")).toHaveValue(
            "Banksy"
          )

          // TODO: Implement test for search query
          // expect(screen.getByPlaceholderText("Title")).toHaveValue("An Artwork")
        })
      })
    })
  })

  describe("when new upload flow is disabled", () => {
    describe("Initial render", () => {
      it("doesn't populate inputs", async () => {
        getWrapper()

        await flushPromiseQueue()

        expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
        expect(screen.getByTestId("save-button")).toBeDisabled()

        expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()

        expect(screen.getByPlaceholderText("Enter full name")).toHaveValue("")
      })
    })

    describe("Back Link behavior", () => {
      describe("when the form is dirty", () => {
        it("opens modal before navigating to the previous screen", async () => {
          getWrapper()

          fireEvent.change(
            screen.getByTestId("my-collection-artwork-details-title"),
            {
              target: { value: "Some new value" },
            }
          )

          fireEvent.click(screen.getByText("Back"))
          fireEvent.click(screen.getByText("Leave Without Saving"))

          expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/settings/my-collection",
          })
        })
      })

      describe("when the form is not dirty", () => {
        it("navigates to the previous screen", async () => {
          getWrapper()

          fireEvent.click(screen.getByText("Back"))

          expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/settings/my-collection",
          })
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
