import * as actions from "desktop/apps/consign/client//actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { createStore } from "redux"
import { mount } from "enzyme"

import SubmissionFlow from "desktop/apps/consign/components/submission_flow"

jest.mock("desktop/apps/consign/components/step_marker", () => () => (
  <div className="step-marker" />
))

jest.mock("desktop/apps/consign/client/steps_config", () => ({
  chooseArtist: {
    component: () => <div className="choose-artist" />,
  },
  createAccount: {
    component: () => <div className="create-account" />,
  },
  describeWork: {
    component: () => <div className="describe-work-container" />,
  },
  uploadPhotos: {
    component: () => <div className="upload-photos" />,
  },
}))

describe("SubmissionFlow", () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  describe("non-logged-in user, stepping through", () => {
    it("shows the create account step first", () => {
      const wrapper = mount(<SubmissionFlow store={initialStore} />)
      expect(wrapper.find(".create-account").length).toBe(1)
    })
    it("shows the choose artist step", () => {
      initialStore.dispatch(actions.updateCurrentStep("chooseArtist"))
      const wrapper = mount(<SubmissionFlow store={initialStore} />)
      expect(wrapper.find(".choose-artist").length).toBe(1)
    })

    it("shows the describe work step third", () => {
      initialStore.dispatch(actions.updateCurrentStep("describeWork"))
      const wrapper = mount(<SubmissionFlow store={initialStore} />)
      expect(wrapper.find(".describe-work-container").length).toBe(1)
    })

    it("shows the upload photo step last", () => {
      initialStore.dispatch(actions.updateCurrentStep("uploadPhotos"))
      const wrapper = mount(<SubmissionFlow store={initialStore} />)
      expect(wrapper.find(".upload-photos").length).toBe(1)
    })
  })
})
