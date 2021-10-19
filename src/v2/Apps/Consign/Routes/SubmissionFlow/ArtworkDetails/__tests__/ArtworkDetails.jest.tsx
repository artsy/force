import React from "react"
import { mount } from "enzyme"
import { ArtworkDetails } from "../ArtworkDetails"
import { ArtworkDetailsForm } from "../Components/ArtworkDetailsForm"
import {
  submissionFlowSteps,
  submissionFlowStepsMobile,
  SubmissionStepper,
} from "v2/Apps/Consign/Components/SubmissionStepper"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "v2/Utils/Responsive"

jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        match: {
          params: {
            id: "1",
          },
        },
      }
    }),
  }
})

const getWrapper = (breakpoint: Breakpoint = "lg") =>
  mount(
    <MockBoot breakpoint={breakpoint}>
      <ArtworkDetails />
    </MockBoot>
  )

describe("ArtworkDetails", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper()
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
    it("on mobile", () => {
      const wrapper = getWrapper("xs")
      const steps = wrapper
        .find("button")
        .filterWhere(n => n.prop("aria-selected") !== undefined)

      steps.forEach((n, idx) => {
        expect(n.text()).toBe(submissionFlowStepsMobile[idx])
      })
    })

    it("on desktop", () => {
      const wrapper = getWrapper("lg")
      const steps = wrapper
        .find("button")
        .filterWhere(n => n.prop("aria-selected") !== undefined)

      steps.forEach((n, idx) => {
        expect(n.text()).toBe(submissionFlowSteps[idx])
      })
    })
  })
})
