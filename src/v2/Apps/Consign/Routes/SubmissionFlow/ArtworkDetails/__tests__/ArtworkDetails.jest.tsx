import React from "react"
import { mount } from "enzyme"
import { ArtworkDetails, initialValues } from "../ArtworkDetails"
import { ArtworkDetailsForm } from "../Components/ArtworkDetailsForm"
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
}

const mockRouterPush = jest.fn()
jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: { push: mockRouterPush },
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
  it("renders correctly", async () => {
    sessionStore = {
      "submission-1": JSON.stringify({
        artworkDetailsForm: { ...initialValues },
      }),
    }
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
    expect(wrapper.find(ArtworkDetailsForm)).toBeTruthy()
    expect(wrapper.find("[data-test-id='save-button']")).toBeTruthy()
  })

  describe("Correct steps", () => {
    it("on mobile", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({
          artworkDetailsForm: { ...initialValues },
        }),
      }
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
      sessionStore = {
        "submission-1": JSON.stringify({
          artworkDetailsForm: { ...initialValues },
        }),
      }
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

  describe("Save and Continue button", () => {
    it("is disabled if form isn't valid", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({
          artworkDetailsForm: { ...initialValues },
        }),
      }
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
  })
})
