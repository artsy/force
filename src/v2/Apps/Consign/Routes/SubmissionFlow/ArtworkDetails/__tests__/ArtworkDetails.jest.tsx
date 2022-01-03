import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "v2/Utils/Responsive"
import { flushPromiseQueue } from "v2/DevTools"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { ArtworkDetailsFragmentContainer } from "../ArtworkDetails"
import { ArtworkDetails_submission } from "v2/__generated__/ArtworkDetails_submission.graphql"
import {
  submissionFlowSteps,
  submissionFlowStepsMobile,
} from "v2/Apps/Consign/Components/SubmissionStepper"
import { createOrUpdateConsignSubmission } from "../../Utils/createOrUpdateConsignSubmission"

const validForm = {
  id: "1",
  artist: {
    internalID: "artistId",
    name: "Banksy",
  },
  locationCity: "NY, USA",
  locationCountry: "",
  locationState: "",
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
} as ArtworkDetails_submission

const utmParams = { utmMedium: "Medium", utmSource: "Source", utmTerm: "Term" }

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("v2/System/Router/useRouter", () => ({
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

jest.mock("v2/Utils/getENV")

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
      query ArtworkDetails_SubmissionFlowTest_Query($id: ID!)
        @relay_test_operation {
        submission(id: $id) {
          ...ArtworkDetails_submission
        }
      }
    `,
    variables: {
      id: "1",
    },
  })

describe("ArtworkDetails", () => {
  beforeEach(() => {
    sessionStore = {}
  })

  describe("Initial render", () => {
    it("renders correctly", async () => {
      getWrapper().renderWithRelay()

      expect(screen.getByText("Artwork Details")).toBeInTheDocument()
      expect(screen.getByText("Tell us about your artwork")).toBeInTheDocument()
      expect(
        screen.getByText("• All fields are required to submit a work.")
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "• We currently do not allow artists to sell their own work on Artsy."
        )
      ).toBeInTheDocument()

      expect(screen.getByTestId("save-button")).toBeInTheDocument()
      expect(screen.getByText("Back")).toBeInTheDocument()

      expect(
        screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
      ).toHaveAttribute("href", "/consign")
    })

    it("fields are pre-populating from server", async () => {
      getWrapper().renderWithRelay({
        ConsignmentSubmission: () => validForm,
      })

      expect(screen.getByPlaceholderText("Enter Full Name")).toHaveValue(
        "Banksy"
      )
      expect(screen.getByPlaceholderText("YYYY")).toHaveValue("2021")
      expect(
        screen.getByPlaceholderText("Add Title or Write 'Unknown'")
      ).toHaveValue("Some title")
      expect(screen.getByPlaceholderText("Add Materials")).toHaveValue(
        "materials"
      )
      expect(screen.getByPlaceholderText("Add Materials")).toHaveValue(
        "materials"
      )
      expect(
        screen
          .getAllByRole("combobox")
          .find(c => c.getAttribute("name") == "rarity")
      ).toHaveValue("limited edition")
      expect(screen.getByPlaceholderText("Your Work's #")).toHaveValue("1")
      expect(screen.getByPlaceholderText("Total # in Edition")).toHaveValue("2")
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
        screen.getByPlaceholderText("Describe How You Acquired the Work")
      ).toHaveValue("provenance")
      expect(
        screen.getByPlaceholderText("Enter City Where Artwork Is Located")
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

        expect(mockRouterReplace).toHaveBeenCalledWith({
          pathname: "/consign/submission/1/artwork-details",
        })
        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: "/consign/submission/1/upload-photos",
        })
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
            depth: "5",
            dimensionsMetric: "cm",
            editionNumber: "1",
            editionSizeFormatted: "2",
            height: "3",
            id: "1",
            locationCity: "NY, USA",
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

      it("delete spaces before saving to session storage", async () => {
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
            depth: "5",
            dimensionsMetric: "cm",
            editionNumber: "1",
            editionSizeFormatted: "2",
            height: "3",
            id: "1",
            locationCity: "NY, USA",
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
