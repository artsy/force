import * as actions from "desktop/apps/consign/client//actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { createStore } from "redux"
import { mount } from "enzyme"

import UploadedImage from "desktop/apps/consign/components/uploaded_image"

describe("UploadedImage", () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  it("correctly displays the processing state when there are no processing images", () => {
    const file = {
      fileName: "astronaut.jpg",
      src: "blahblabhalh",
    }
    const wrapper = mount(<UploadedImage store={initialStore} file={file} />)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__progress-wrapper")
        .length
    ).toBe(0)
  })

  it("correctly displays the processing state when the image is processing", () => {
    initialStore.dispatch(actions.startProcessingImage("astronaut.jpg"))
    const file = {
      fileName: "astronaut.jpg",
      src: "blahblabhalh",
    }
    const wrapper = mount(<UploadedImage store={initialStore} file={file} />)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__progress-wrapper")
        .length
    ).toBe(1)
  })

  it("correctly displays the processing state when a different image is processing", () => {
    initialStore.dispatch(actions.startProcessingImage("another-image.jpg"))
    const file = {
      fileName: "astronaut.jpg",
      src: "blahblabhalh",
    }
    const wrapper = mount(<UploadedImage store={initialStore} file={file} />)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__progress-wrapper")
        .length
    ).toBe(0)
  })

  it("correctly displays the error state when the image is errored", () => {
    initialStore.dispatch(actions.errorOnImage("astronaut.jpg"))
    const file = {
      fileName: "astronaut.jpg",
      src: "blahblabhalh",
    }
    const wrapper = mount(<UploadedImage store={initialStore} file={file} />)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__progress-wrapper")
        .length
    ).toBe(0)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__error").length
    ).toBe(1)
  })

  it("correctly displays the error state when the image is errored and processing", () => {
    initialStore.dispatch(actions.startProcessingImage("astronaut.jpg"))
    initialStore.dispatch(actions.errorOnImage("astronaut.jpg"))
    const file = {
      fileName: "astronaut.jpg",
      src: "blahblabhalh",
    }
    const wrapper = mount(<UploadedImage store={initialStore} file={file} />)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__progress-wrapper")
        .length
    ).toBe(0)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__error").length
    ).toBe(1)
  })

  it("correctly displays the error state when a different image is errored", () => {
    initialStore.dispatch(actions.errorOnImage("another-image.jpg"))
    const file = {
      fileName: "astronaut.jpg",
      src: "blahblabhalh",
    }
    const wrapper = mount(<UploadedImage store={initialStore} file={file} />)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__progress-wrapper")
        .length
    ).toBe(0)
    expect(
      wrapper.find(".consignments-submission-uploaded-image__error").length
    ).toBe(0)
  })
})
