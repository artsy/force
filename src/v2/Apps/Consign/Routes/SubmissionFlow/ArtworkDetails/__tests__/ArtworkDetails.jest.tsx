import { mount } from "enzyme"
import { ArtworkDetails } from "../ArtworkDetails"
import {
  ArtworkDetailsForm,
  getArtworkDetailsFormInitialValues,
} from "../Components/ArtworkDetailsForm"
import {
  submissionFlowSteps,
  submissionFlowStepsMobile,
  SubmissionStepper,
} from "v2/Apps/Consign/Components/SubmissionStepper"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "v2/Utils/Responsive"
import { flushPromiseQueue } from "v2/DevTools"

const validForm = {
  artistId: "artistId",
  artistName: "Banksy",
  year: "2021",
  title: "Some title",
  medium: "PAINTING",
  rarity: "limited edition",
  editionNumber: "1",
  editionSize: "2",
  height: "3",
  width: "4",
  depth: "5",
  units: "cm",
  provenance: "provenance",
}

const validFormWithSpaces = {
  artistId: "artistId",
  artistName: "Banksy",
  year: " 2021 ",
  title: " Some title ",
  medium: "PAINTING",
  rarity: "limited edition",
  editionNumber: " 1 ",
  editionSize: " 2 ",
  height: " 3 ",
  width: " 4 ",
  depth: " 5 ",
  units: " cm ",
  provenance: "  provenance  ",
}

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()
jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: { push: mockRouterPush, replace: mockRouterReplace },
        match: { params: { id: "1" } },
      }
    }),
  }
})

let sessionStore = { "submission-1": JSON.stringify({ artistId: "artistId" }) }
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem(key) {
      return sessionStore[key] || null
    },
    setItem: jest.fn(),
  },
})

const getWrapper = (breakpoint: Breakpoint = "lg") =>
  mount(
    <MockBoot breakpoint={breakpoint}>
      <ArtworkDetails />
    </MockBoot>
  )

describe("ArtworkDetails", () => {
  beforeEach(() => {
    sessionStore = {
      "submission-1": JSON.stringify({
        artworkDetailsForm: getArtworkDetailsFormInitialValues(),
      }),
    }
  })
  describe("Initial render", () => {
    it("renders correctly", async () => {
      const wrapper = getWrapper()
      await flushPromiseQueue()
      wrapper.update()

      const text = wrapper.text()

      const artworkCurrentStep = wrapper
        .find("button")
        .filterWhere(n => n.prop("aria-selected") === true)

      artworkCurrentStep.forEach(n => {
        expect(n.text()).toContain("Artwork")
      })

      expect(wrapper.find(SubmissionStepper)).toBeTruthy()
      expect(text).toContain("Tell us about your artwork")
      expect(text).toContain("All fields are required to submit a work.")
      expect(text).toContain(
        "Unfortunately we are not accepting consignments directly from artists at this time."
      )
      expect(wrapper.find(ArtworkDetailsForm)).toBeTruthy()
      expect(wrapper.find("[data-test-id='save-button']")).toBeTruthy()
      expect(wrapper.find("BackLink")).toHaveLength(1)
      expect(wrapper.find("BackLink").prop("to")).toEqual("/consign")
    })

    it("fields are pre-populating from session storage", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({
          artworkDetailsForm: { ...validForm },
        }),
      }
      const wrapper = getWrapper()
      await flushPromiseQueue()
      wrapper.update()

      expect(
        wrapper.find("input[data-test-id='autosuggest-input']").prop("value")
      ).toBe("Banksy")

      expect(wrapper.find("input[name='year']").prop("value")).toBe("2021")
      expect(wrapper.find("input[name='title']").prop("value")).toBe(
        "Some title"
      )
      expect(wrapper.find("select[name='medium']").prop("value")).toBe(
        "PAINTING"
      )
      expect(wrapper.find("select[name='rarity']").prop("value")).toBe(
        "limited edition"
      )
      expect(wrapper.find("input[name='editionNumber']").prop("value")).toBe(
        "1"
      )
      expect(wrapper.find("input[name='editionSize']").prop("value")).toBe("2")
      expect(wrapper.find("input[name='height']").prop("value")).toBe("3")
      expect(wrapper.find("input[name='width']").prop("value")).toBe("4")
      expect(wrapper.find("input[name='depth']").prop("value")).toBe("5")
      expect(wrapper.find("Radio[value='cm']").prop("selected")).toBe(true)
      expect(wrapper.find("input[name='provenance']").prop("value")).toBe(
        "provenance"
      )
    })

    describe("Correct steps", () => {
      it("on mobile", async () => {
        const wrapper = getWrapper("xs")
        await flushPromiseQueue()
        wrapper.update()

        const steps = wrapper
          .find("button")
          .filterWhere(n => n.prop("aria-selected") !== undefined)

        steps.forEach((n, idx) => {
          expect(n.text()).toBe(submissionFlowStepsMobile[idx])
        })
      })

      it("on desktop", async () => {
        const wrapper = getWrapper("lg")
        await flushPromiseQueue()
        wrapper.update()

        const steps = wrapper
          .find("button")
          .filterWhere(n => n.prop("aria-selected") !== undefined)

        steps.forEach((n, idx) => {
          expect(n.text()).toBe(submissionFlowSteps[idx])
        })
      })
    })
  })

  describe("Save and Continue button", () => {
    it("is disabled if form isn't valid", async () => {
      const wrapper = getWrapper()
      await flushPromiseQueue()
      wrapper.update()
      const button = wrapper.find("button[data-test-id='save-button']")

      expect(button.prop("disabled")).toBe(true)
    })

    it("is enabled if form is valid", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({
          artworkDetailsForm: { ...validForm },
        }),
      }
      const wrapper = getWrapper()
      await flushPromiseQueue()
      const button = wrapper.find("button[data-test-id='save-button']")

      expect(button.prop("disabled")).toBe(false)
    })

    describe("Valid form submit", () => {
      it("replace current route and redirects to Upload photos step", async () => {
        sessionStore = {
          "submission-1": JSON.stringify({
            artworkDetailsForm: { ...validForm },
          }),
        }
        const wrapper = getWrapper()
        await flushPromiseQueue()

        wrapper.find("Form").simulate("submit")

        await flushPromiseQueue()

        expect(mockRouterReplace).toHaveBeenCalledWith({
          pathname: "/consign/submission/1/artwork-details",
        })

        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: "/consign/submission/1/upload-photos",
        })
      })

      it("data is saved in session storage and submition created", async () => {
        sessionStore = {
          "submission-1": JSON.stringify({
            artworkDetailsForm: { ...validForm },
          }),
        }
        const wrapper = getWrapper()
        await flushPromiseQueue()

        wrapper.find("Form").simulate("submit")

        await flushPromiseQueue()

        expect(sessionStorage.setItem).toHaveBeenCalledWith(
          "submission-1",
          JSON.stringify({ artworkDetailsForm: { ...validForm } })
        )
      })

      it("delete spaces before saving to session storage", async () => {
        sessionStore = {
          "submission-1": JSON.stringify({
            artworkDetailsForm: { ...validFormWithSpaces },
          }),
        }
        const wrapper = getWrapper()
        await flushPromiseQueue()

        wrapper.find("Form").simulate("submit")

        await flushPromiseQueue()

        expect(sessionStorage.setItem).toHaveBeenCalledWith(
          "submission-1",
          JSON.stringify({ artworkDetailsForm: { ...validForm } })
        )
      })
    })
  })
})
