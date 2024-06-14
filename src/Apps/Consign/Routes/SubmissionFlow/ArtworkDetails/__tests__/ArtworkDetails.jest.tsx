import { fireEvent, screen } from "@testing-library/react"
import {
  submissionFlowSteps,
  submissionFlowStepsMobile,
} from "Apps/Consign/Hooks/useSubmissionFlowSteps"
import { ArtworkDetailsFragmentContainer } from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/ArtworkDetails"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { Breakpoint } from "Utils/Responsive"
import { ArtworkDetails_submission$data } from "__generated__/ArtworkDetails_submission.graphql"
import { graphql } from "react-relay"

const validForm = {
  externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
  artist: {
    internalID: "artistId",
    name: "Banksy",
  },
  category: "Painting",
  locationCity: "NY, USA",
  locationCountry: null,
  locationState: null,
  locationPostalCode: "12345",
  locationCountryCode: "US",
  year: "2021",
  title: "Some title",
  medium: "materials",
  attributionClass: "LIMITED_EDITION",
  editionNumber: "1",
  editionSize: "2",
  height: "3",
  width: "4",
  depth: "5",
  dimensionsMetric: "cm",
  provenance: "provenance",
} as ArtworkDetails_submission$data

const artwrokData = {
  internalID: "6324911f2c6b47000e277879",
  artist: {
    internalID: "artist-id",
    name: "name",
  },
  mediumType: {
    name: "Painting",
  },
  location: {
    city: "",
  },
  date: "2021",
  title: "Some title",
  medium: "materials",
  attributionClass: { name: "LIMITED_EDITION" },
  editionNumber: "1",
  editionSize: "2",
  height: "3",
  width: "4",
  depth: "5",
  metric: "cm",
  provenance: "provenance",
}

const utmParams = { utmMedium: "Medium", utmSource: "Source", utmTerm: "Term" }

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush, replace: mockRouterReplace },
  })),
}))

jest.unmock("react-relay")

let sessionStore = {}
Object.defineProperty(window, "sessionStorage", {
  value: { getItem: key => sessionStore[key] || null, setItem: jest.fn() },
})

jest.mock("../../Utils/createOrUpdateConsignSubmission", () => ({
  ...jest.requireActual("../../Utils/createOrUpdateConsignSubmission"),
  createOrUpdateConsignSubmission: jest.fn().mockResolvedValue("1"),
}))

jest.mock("Utils/getENV")

const getWrapper = (breakpoint: Breakpoint = "lg") =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint={breakpoint}>
          <ArtworkDetailsFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkDetails_SubmissionFlowTest_Query($externalId: ID)
        @relay_test_operation {
        submission(id: $externalId) {
          ...ArtworkDetails_submission
        }
      }
    `,
    variables: {
      externalId: validForm.externalId,
    },
  })

const getAutopopulateWrapper = () =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot>
          <ArtworkDetailsFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkDetails_SubmissionFlowPrepopulatedTest_Query(
        $artworkId: String!
      ) @relay_test_operation {
        myCollectionArtwork: artwork(id: $artworkId) {
          ...ArtworkDetails_myCollectionArtwork
        }
      }
    `,
    variables: {
      artworkId: artwrokData.internalID,
    },
  })

describe("ArtworkDetails", () => {
  beforeEach(() => {
    sessionStore = {}
  })

  describe("Initial render when opened from My Collection artwork page", () => {
    it("prepupulates the data", () => {
      getAutopopulateWrapper().renderWithRelay({
        Artwork: () => artwrokData,
      })

      expect(screen.getByPlaceholderText("Enter full name")).toHaveValue("name")
      expect(screen.getByPlaceholderText("YYYY")).toHaveValue("2021")
      expect(
        screen.getByPlaceholderText("Add title or write 'Unknown'")
      ).toHaveValue("Some title")
      expect(screen.getByPlaceholderText("Add materials")).toHaveValue(
        "materials"
      )
      expect(
        screen
          .getAllByRole("combobox")
          .find(c => c.getAttribute("name") == "rarity")
      ).toHaveValue("limited edition")
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "height")
      ).toHaveValue("3")
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "width")
      ).toHaveValue("4")
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "depth")
      ).toHaveValue("5")
      expect(
        screen.getAllByRole("radio").find(c => c.textContent == "cm")
      ).toBeChecked()
      expect(
        screen.getByPlaceholderText("Describe how you acquired the work")
      ).toHaveValue("provenance")

      expect(
        screen.getByPlaceholderText("Enter city where artwork is located")
      ).toHaveValue(
        '<mock-value-for-field-"city">, <mock-value-for-field-"state">, <mock-value-for-field-"country">'
      )
    })
  })

  describe("Initial render", () => {
    it("renders correctly", async () => {
      getWrapper().renderWithRelay()

      expect(screen.getByText("Artwork Details")).toBeInTheDocument()
      expect(screen.getByText("Tell us about your artwork")).toBeInTheDocument()
      expect(
        screen.getByText(
          "• Currently, artists can not sell their own work on Artsy."
        )
      ).toBeInTheDocument()
      expect(
        screen.getByText("• All fields are required to submit a work.")
      ).toBeInTheDocument()

      expect(screen.getByTestId("save-button")).toBeInTheDocument()
    })

    it("renders learn more link with correct href", () => {
      getWrapper().renderWithRelay()

      const learnMoreLink = screen.getByTestId("learn-more-anchor")

      expect(learnMoreLink).toBeInTheDocument()
      expect(learnMoreLink).toHaveAttribute(
        "href",
        "https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell"
      )
    })

    it("fields are pre-populating from server", async () => {
      getWrapper().renderWithRelay({
        ConsignmentSubmission: () => validForm,
      })

      expect(screen.getByPlaceholderText("Enter full name")).toHaveValue(
        "Banksy"
      )
      expect(screen.getByPlaceholderText("YYYY")).toHaveValue("2021")
      expect(
        screen.getByPlaceholderText("Add title or write 'Unknown'")
      ).toHaveValue("Some title")
      expect(screen.getByPlaceholderText("Add materials")).toHaveValue(
        "materials"
      )
      expect(screen.getByPlaceholderText("Add materials")).toHaveValue(
        "materials"
      )
      expect(
        screen
          .getAllByRole("combobox")
          .find(c => c.getAttribute("name") == "rarity")
      ).toHaveValue("limited edition")
      expect(screen.getByPlaceholderText("Your work's #")).toHaveValue("1")
      expect(screen.getByPlaceholderText("Total # in edition")).toHaveValue("2")
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "height")
      ).toHaveValue("3")
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "width")
      ).toHaveValue("4")
      expect(
        screen
          .getAllByRole("textbox")
          .find(c => c.getAttribute("name") == "depth")
      ).toHaveValue("5")
      expect(
        screen.getAllByRole("radio").find(c => c.textContent == "cm")
      ).toBeChecked()
      expect(
        screen.getByPlaceholderText("Describe how you acquired the work")
      ).toHaveValue("provenance")
      expect(
        screen.getByPlaceholderText("Enter city where artwork is located")
      ).toHaveValue("NY, USA")
    })

    describe("Correct steps", () => {
      it("on mobile", async () => {
        getWrapper("xs").renderWithRelay()

        const steps = screen
          .getAllByRole("button")
          .filter(c => c.getAttribute("disabled"))

        steps.forEach((n, idx) => {
          expect(n).toHaveTextContent(submissionFlowStepsMobile[idx])
        })
      })

      it("on desktop", async () => {
        getWrapper("lg").renderWithRelay()

        const steps = screen
          .getAllByRole("button")
          .filter(c => c.getAttribute("disabled"))

        steps.forEach((n, idx) => {
          expect(n).toHaveTextContent(submissionFlowSteps[idx])
        })
      })
    })
  })

  describe("Save and Continue button", () => {
    it("is disabled if form isn't valid", async () => {
      getWrapper().renderWithRelay({
        ConsignmentSubmission: () => ({
          ...validForm,
          title: "",
        }),
      })

      expect(screen.getByTestId("save-button")).toBeDisabled()
    })

    it("is enabled if form is valid", async () => {
      getWrapper().renderWithRelay({
        ConsignmentSubmission: () => validForm,
      })

      expect(screen.getByTestId("save-button")).toBeEnabled()
    })

    describe("Valid form submit", () => {
      it("replace current route and redirects to Upload photos step", async () => {
        getWrapper().renderWithRelay({
          ConsignmentSubmission: () => validForm,
        })

        fireEvent.click(screen.getByText("Save and Continue"))

        await flushPromiseQueue()

        expect(mockRouterReplace).toHaveBeenCalledWith("/sell")
        expect(mockRouterPush).toHaveBeenCalledWith(
          "/sell/submission/1/upload-photos"
        )
      })

      it("data with UTM params is saved in session storage and submition created", async () => {
        sessionStore = {
          utmParams: JSON.stringify(utmParams),
        }

        getWrapper().renderWithRelay({
          ConsignmentSubmission: () => validForm,
        })

        fireEvent.click(screen.getByText("Save and Continue"))

        await flushPromiseQueue()

        expect(createOrUpdateConsignSubmission).toHaveBeenLastCalledWith(
          expect.anything(),
          {
            artistID: "artistId",
            attributionClass: "LIMITED_EDITION",
            category: "Painting",
            depth: "5",
            dimensionsMetric: "cm",
            editionNumber: "1",
            editionSizeFormatted: "2",
            height: "3",
            externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
            locationCity: "NY, USA",
            locationPostalCode: "12345",
            locationCountryCode: "US",
            medium: "materials",
            provenance: "provenance",
            sessionID: undefined,
            state: "DRAFT",
            title: "Some title",
            utmMedium: "Medium",
            utmSource: "Source",
            utmTerm: "Term",
            width: "4",
            year: "2021",
          }
        )
      })

      it("delete spaces before saving", async () => {
        getWrapper().renderWithRelay({
          ConsignmentSubmission: () => ({
            ...validForm,
            locationCity: "  NY, USA  ",
            year: "  2021  ",
            title: "  Some title  ",
            medium: "  materials  ",
            editionNumber: "  1  ",
            editionSize: "  2  ",
            height: "  3  ",
            width: "  4  ",
            depth: "  5  ",
            provenance: "  provenance  ",
          }),
        })

        fireEvent.click(screen.getByText("Save and Continue"))

        await flushPromiseQueue()

        expect(createOrUpdateConsignSubmission).toHaveBeenLastCalledWith(
          expect.anything(),
          {
            artistID: "artistId",
            attributionClass: "LIMITED_EDITION",
            category: "Painting",
            depth: "5",
            dimensionsMetric: "cm",
            editionNumber: "1",
            editionSizeFormatted: "2",
            height: "3",
            externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
            locationCity: "NY, USA",
            locationPostalCode: "12345",
            locationCountryCode: "US",
            medium: "materials",
            provenance: "provenance",
            sessionID: undefined,
            state: "DRAFT",
            title: "Some title",
            width: "4",
            year: "2021",
          }
        )
      })
    })
  })
})
