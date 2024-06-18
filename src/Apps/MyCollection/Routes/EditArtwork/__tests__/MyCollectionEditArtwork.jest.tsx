import { fireEvent, screen, waitFor } from "@testing-library/react"
import { MyCollectionEditArtworkFragmentContainer } from "Apps/MyCollection/Routes/EditArtwork/MyCollectionEditArtwork"
import { uploadPhotoToS3 } from "Components/PhotoUpload/Utils/fileUtils"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { createMockEnvironment } from "relay-test-utils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Breakpoint } from "Utils/Responsive"
import { CleanRelayFragment } from "Utils/typeSupport"
import { MyCollectionEditArtwork_artwork$data } from "__generated__/MyCollectionEditArtwork_artwork.graphql"

jest.mock("System/Hooks/useSystemContext")

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()
const mockSubmitArtwork = jest.fn().mockResolvedValue({
  myCollectionUpdateArtwork: {
    artworkOrError: { artwork: { internalID: "internal-id" } },
  },
})
const mockDeleteArtwork = jest.fn().mockResolvedValue({
  myCollectionDeleteArtwork: {
    artworkOrError: { artwork: { internalID: "internal-id" } },
  },
})

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
jest.mock("../Mutations/useUpdateArtwork", () => ({
  ...jest.requireActual("../Mutations/useUpdateArtwork"),
  useUpdateArtwork: jest.fn(() => ({
    submitMutation: mockSubmitArtwork,
  })),
}))
jest.mock("../Mutations/useDeleteArtwork", () => ({
  ...jest.requireActual("../Mutations/useDeleteArtwork"),
  useDeleteArtwork: jest.fn(() => ({
    submitMutation: mockDeleteArtwork,
  })),
}))
const mockSubmitDeleteArtworkImage = jest.fn()
jest.mock("../Mutations/useDeleteArtworkImage", () => ({
  ...jest.requireActual("../Mutations/useDeleteArtworkImage"),
  useDeleteArtworkImage: jest.fn(() => ({
    submitMutation: mockSubmitDeleteArtworkImage,
  })),
}))
jest.mock("Components/PhotoUpload/Utils/fileUtils", () => ({
  ...jest.requireActual("Components/PhotoUpload/Utils/fileUtils"),
  uploadPhotoToS3: jest.fn(),
}))
const mockUploadPhoto = uploadPhotoToS3 as jest.Mock
jest.mock("react-tracking")
jest.unmock("react-relay")

const getWrapper = (breakpoint: Breakpoint = "lg") =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint={breakpoint}>
          <MyCollectionEditArtworkFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query MyCollectionEditArtworkTest_Query($slug: String!) {
        artwork(id: $slug) {
          ...MyCollectionEditArtwork_artwork
        }
      }
    `,
    variables: {
      slug: mockArtwork.internalID,
    },
  })

describe("Edit artwork", () => {
  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      relayEnvironment: createMockEnvironment(),
    }))
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  describe("Initial render", () => {
    it("populates inputs with values from the artwork", async () => {
      getWrapper().renderWithRelay({ Artwork: () => mockArtwork })

      expect(screen.getByText("Save Changes")).toBeInTheDocument()
      expect(screen.getByTestId("save-button")).toBeDisabled()

      expect(screen.getByText("Edit Artwork Details")).toBeInTheDocument()

      expect(
        screen.queryByPlaceholderText("Enter full name")
      ).not.toBeInTheDocument()
      expect(screen.getByText("Willem de Kooning")).toBeInTheDocument()
      expect(screen.getByText("Dutch-American, 1904–1997")).toBeInTheDocument()

      expect(screen.getByPlaceholderText("YYYY")).toHaveValue("1975")
      expect(screen.getByPlaceholderText("Title")).toHaveValue("Untitled")
      expect(
        screen.getByPlaceholderText("Oil on Canvas, Mixed Media, Lithograph…")
      ).toHaveValue("Charcoal on paper")
      expect(
        screen
          .getAllByRole("combobox")
          .find(c => c.getAttribute("name") == "category")
      ).toHaveValue("Drawing, Collage or other Work on Paper")
      expect(
        screen
          .getAllByRole("combobox")
          .find(c => c.getAttribute("name") == "attributionClass")
      ).toHaveValue("LIMITED_EDITION")
      expect(screen.getByPlaceholderText("Your work's #")).toHaveValue(1)
      expect(screen.getByPlaceholderText("Total # in edition")).toHaveValue(2)
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "height")
      ).toHaveValue(8.75)
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "width")
      ).toHaveValue(11)
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "depth")
      ).toHaveValue(2)
      expect(
        screen.getAllByRole("radio").find(c => c.textContent == "in")
      ).toBeChecked()
      expect(
        screen.getByPlaceholderText("Describe how you acquired the work")
      ).toHaveValue("Fooo")
      expect(screen.getByTestId("autocomplete-location")).toHaveValue(
        "Berlin, Berlin, Germany"
      )
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "confidentialNotes")
      ).toHaveValue("Secret Notes here")
    })
  })

  describe("Back Link behavior", () => {
    it("opens modal on press when the form has been changed", async () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      fireEvent.change(
        screen.getByTestId("my-collection-artwork-details-title"),
        {
          target: { value: "Some new value" },
        }
      )

      fireEvent.click(screen.getByText("Back"))
      fireEvent.click(screen.getByText("Leave Without Saving"))

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname:
          "/collector-profile/my-collection/artwork/62fc96c48d3ff8000b556c3a",
      })
    })

    it("navigates to the previous screen when the form has not been changed", async () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      fireEvent.click(screen.getByText("Back"))

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname:
          "/collector-profile/my-collection/artwork/62fc96c48d3ff8000b556c3a",
      })
    })
  })

  describe("With valid values", () => {
    it("keeps save button disabled if form is not dirty", () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      expect(screen.getByTestId("save-button")).toBeDisabled()
    })

    it("enables save button if form is dirty", () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })
      fireEvent.change(
        screen.getByTestId("my-collection-artwork-details-title"),
        {
          target: { value: "Some new value" },
        }
      )
      expect(screen.getByTestId("save-button")).toBeEnabled()
    })
  })

  describe("With invalid values", () => {
    it("disables save button", () => {
      getWrapper().renderWithRelay({
        Artwork: () => ({
          ...mockArtwork,
          title: "",
        }),
      })
      expect(screen.getByTestId("save-button")).toBeDisabled()
    })
  })

  describe("Form submit", () => {
    it("saves the artwork and navigates to artwork detail page if changes have been made", async () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      fireEvent.change(
        screen.getByTestId("my-collection-artwork-details-title"),
        {
          target: { value: "Some new value" },
        }
      )

      fireEvent.click(screen.getByText("Save Changes"))

      await flushPromiseQueue()

      expect(mockSubmitArtwork).toHaveBeenCalledWith(
        expect.objectContaining({
          rejectIf: expect.any(Function),
          variables: {
            input: {
              artistIds: ["4d8b929e4eb68a1b2c0002f2"],
              artworkId: "62fc96c48d3ff8000b556c3a",
              collectorLocation: {
                city: "Berlin",
                country: "Germany",
                countryCode: "DE",
                state: "Berlin",
              },
              attributionClass: "LIMITED_EDITION",
              category: "Drawing, Collage or other Work on Paper",
              date: "1975",
              depth: "2",
              editionNumber: "1",
              editionSize: "2",
              externalImageUrls: [],
              height: "8.75",
              medium: "Charcoal on paper",
              metric: "in",
              pricePaidCents: 400000,
              pricePaidCurrency: "EUR",
              provenance: "Fooo",
              title: "Some new value",
              width: "11",
              confidentialNotes: "Secret Notes here",
            },
          },
        })
      )

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: "/collector-profile/my-collection/artwork/internal-id",
      })
    })
  })

  describe("Adding images", () => {
    beforeEach(() => {
      //@ts-ignore
      jest.spyOn(global, "FileReader").mockImplementation(function () {
        this.readAsDataURL = jest.fn()
      })
      mockUploadPhoto.mockResolvedValue("image-url")
    })

    afterEach(() => {
      mockUploadPhoto.mockReset()
    })

    it.each([
      ["foo.png", "image/png"],
      ["foo.jpg", "image/jpeg"],
      ["foo.jpeg", "image/jpeg"],
    ])("uploads and shows image for %s", async (name, type) => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: name,
              path: name,
              type: type,
              size: 20000,
            },
          ],
        },
      })

      expect(await screen.findByText("0.02 MB")).toBeInTheDocument()
      expect(await screen.findByText(name)).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(2)
      })

      expect(mockUploadPhoto).toHaveBeenCalledWith(
        expect.anything(),
        {
          abortUploading: undefined,
          assetId: undefined,
          errorMessage: undefined,
          file: {
            name: name,
            path: name,
            size: 20000,
            type: type,
          },
          geminiToken: undefined,
          id: expect.any(String),
          loading: false,
          name: name,
          progress: undefined,
          removed: false,
          size: 20000,
          url: "image-url",
        },
        expect.any(Function)
      )

      fireEvent.click(screen.getByText("Save Changes"))
    })
  })

  describe("Removing images", () => {
    it("correctly removes new images", async () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.png",
              path: "foo.png",
              type: "image/png",
              size: 200,
            },
          ],
        },
      })

      fireEvent.click(screen.getByTestId("delete-photo-thumbnail"))

      await waitFor(() => {
        expect(screen.queryByText("foo.png")).not.toBeInTheDocument()
      })
    })

    it("correctly removes already uploaded images", async () => {
      getWrapper().renderWithRelay({
        Artwork: () => ({
          ...mockArtwork,
          photos: [
            {
              internalID: "123",
              isDefault: false,
              imageURL: "image-url",
              width: 1200,
              height: 800,
            },
          ],
        }),
      })

      await waitFor(() => {
        expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(1)
      })

      fireEvent.click(screen.getByTestId("delete-photo-thumbnail"))

      await waitFor(() => {
        expect(screen.queryByTestId("photo-thumbnail")).not.toBeInTheDocument()
      })

      fireEvent.click(screen.getByText("Save Changes"))

      await flushPromiseQueue()

      expect(mockSubmitDeleteArtworkImage).toHaveBeenCalledWith({
        variables: {
          input: {
            artworkID: "62fc96c48d3ff8000b556c3a",
            imageID: "62fc96c4aa88f0000d053af7",
          },
        },
      })
    })
  })

  describe("Delete artwork", () => {
    it("deletes artwork", async () => {
      getWrapper().renderWithRelay({
        Artwork: () => mockArtwork,
      })

      // opens modal
      fireEvent.click(screen.getByTestId("delete-button"))
      fireEvent.click(screen.getByTestId("submit-delete-button"))

      await flushPromiseQueue()

      expect(mockDeleteArtwork).toHaveBeenCalledWith(
        expect.objectContaining({
          rejectIf: expect.any(Function),
          variables: {
            input: {
              artworkId: "62fc96c48d3ff8000b556c3a",
            },
          },
        })
      )

      expect(trackingSpy).toBeCalledTimes(1)
      expect(trackingSpy.mock.calls[0]).toMatchInlineSnapshot(`
        [
          {
            "action": "deleteCollectedArtwork",
            "context_module": "myCollectionArtwork",
            "context_owner_id": "62fc96c48d3ff8000b556c3a",
            "context_owner_slug": "62fc96c48d3ff8000b556c3a",
            "context_owner_type": "myCollectionArtwork",
            "platform": "web",
          },
        ]
      `)

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: "/collector-profile/my-collection/artwork/internal-id",
      })
    })
  })
})

const mockArtwork = {
  artist: {
    internalID: "4d8b929e4eb68a1b2c0002f2",
    initials: "WK",
    name: "Willem de Kooning",
    formattedNationalityAndBirthday: "Dutch-American, 1904–1997",
    targetSupply: {
      isP1: true,
    },
    isPersonalArtist: false,
    image: {
      cropped: {
        src: "https://example.com/image.jpg",
        srcSet: "https://example.com/image.jpg 1x",
        height: 12,
        width: 12,
      },
    },
  },
  consignmentSubmission: null,
  artistNames: "Willem de Kooning",
  category: "Drawing, Collage or other Work on Paper",
  pricePaid: {
    display: "€4,000",
    minor: 400000,
    currencyCode: "EUR",
  },
  date: "1975",
  depth: "2",
  dimensions: {
    in: "8 3/4 × 11 × 2 in",
    cm: "22.2 × 27.9 × 5.1 cm",
  },
  editionSize: "2",
  editionNumber: "1",
  height: "8.75",
  attributionClass: {
    name: "Limited edition",
  },
  id: "QXJ0d29yazo2MmZjOTZjNDhkM2ZmODAwMGI1NTZjM2E=",
  images: [
    {
      isDefault: true,
      imageURL:
        "https://d2v80f5yrouhh2.cloudfront.net/FV2gbZ1UDy7Y5qTZSv-Gwg/:version.jpg",
      width: 640,
      height: 501,
      internalID: "62fc96c4aa88f0000d053af7",
    },
  ],
  internalID: "62fc96c48d3ff8000b556c3a",
  isEdition: true,
  medium: "Charcoal on paper",
  metric: "in",
  collectorLocation: {
    city: "Berlin",
    state: "Berlin",
    country: "Germany",
    countryCode: "DE",
  },
  provenance: "Fooo",
  slug: "62fc96c48d3ff8000b556c3a",
  title: "Untitled",
  width: "11",
  confidentialNotes: "Secret Notes here",
} as CleanRelayFragment<MyCollectionEditArtwork_artwork$data>
