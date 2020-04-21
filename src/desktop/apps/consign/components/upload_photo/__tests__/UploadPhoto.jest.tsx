import UploadPhoto from "desktop/apps/consign/components/upload_photo"
import UploadedImage from "desktop/apps/consign/components/uploaded_image"
import * as actions from "desktop/apps/consign/client//actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { createStore } from "redux"
import { mount } from "enzyme"

jest.mock("desktop/apps/consign/components/uploaded_image", () => jest.fn())

describe("UploadPhoto", () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  beforeEach(() => {
    UploadedImage.mockImplementation(() => <div className="uploaded-image" />)
  })

  it("disables the submit button when there are no photos", () => {
    const wrapper = mount(<UploadPhoto store={initialStore} />)
    expect(
      wrapper.find(
        ".consignments-submission-upload-photo__submit-button[disabled]"
      ).length
    ).toBe(1)
  })

  describe("with photos", () => {
    it("enables the button when there is an uploaded photo and there are no processing images", () => {
      initialStore.dispatch(
        actions.addImageToUploadedImages("astronaut.jpg", "blahblabhalbhablah")
      )
      const wrapper = mount(<UploadPhoto store={initialStore} />)
      expect(
        wrapper
          .find(
            ".consignments-submission-upload-photo__submit-button[disabled]"
          )
          .prop("disabled")
      ).toBe(false)
      expect(wrapper.find(".uploaded-image").length).toBe(1)
    })

    it("disables the button when there is an uploaded photo and there are some processing images", () => {
      const wrapper = mount(<UploadPhoto store={initialStore} />)
      initialStore.dispatch(
        actions.addImageToUploadedImages("astronaut.jpg", "blahblabhalbhablah")
      )
      initialStore.dispatch(actions.startProcessingImage("astronaut.jpg"))
      expect(
        wrapper
          .find(
            ".consignments-submission-upload-photo__submit-button[disabled]"
          )
          .prop("disabled")
      ).toBe(true)
    })
  })
})
