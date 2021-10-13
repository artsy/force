import React from "react"
import { mount } from "enzyme"
import { ArtworkDetails } from "../ArtworkDetails"
import { ArtworkDetailsForm } from "../Components/ArtworkDetailsForm"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"

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

describe("ArtworkDetails", () => {
  it("renders correctly", () => {
    const wrapper = mount(<ArtworkDetails />)
    const text = wrapper.text()

    expect(wrapper.find(SubmissionStepper)).toBeTruthy()
    expect(text).toContain("Tell us about your artwork")
    expect(text).toContain("All fields are required to submit a work.")
    expect(wrapper.find(ArtworkDetailsForm)).toBeTruthy()
    expect(wrapper.find("[data-test-id='save-button']")).toBeTruthy()
  })
})
