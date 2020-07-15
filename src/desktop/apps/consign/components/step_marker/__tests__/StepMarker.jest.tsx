import * as actions from "desktop/apps/consign/client//actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { responsiveWindowAction } from "desktop/components/react/responsive_window"
import { createStore } from "redux"
import { mount } from "enzyme"

import StepMarker from "desktop/apps/consign/components/step_marker"

describe("StepMarker", () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  describe("non-logged-in user", () => {
    it("displays four steps", () => {
      initialStore.dispatch(actions.updateStepsWithoutUser())
      const wrapper = mount(<StepMarker store={initialStore} />)
      expect(wrapper.find(".consignments-step-marker__step").length).toBe(4)
    })

    it("updates the color of step labels", () => {
      initialStore.dispatch(actions.updateStepsWithoutUser())
      const wrapper = mount(<StepMarker store={initialStore} />)
      expect(
        wrapper.find(".consignments-step-marker__step_active").length
      ).toBe(1)
      const activeText = wrapper.text()
      expect(activeText).toContain("Create Account")
    })

    it("includes the shorter labels if in mobile mode", () => {
      initialStore.dispatch(responsiveWindowAction(600))
      initialStore.dispatch(actions.updateStepsWithoutUser())
      const wrapper = mount(<StepMarker store={initialStore} />)
      expect(
        wrapper.find(".consignments-step-marker__step_active").length
      ).toBe(1)
      const activeText = wrapper.text()
      expect(activeText).toBe("ConfirmCreateDescribeUpload")
    })
  })

  describe("logged-in user", () => {
    it("displays three steps", () => {
      initialStore.dispatch(actions.updateStepsWithUser())
      const wrapper = mount(<StepMarker store={initialStore} />)
      expect(wrapper.find(".consignments-step-marker__step").length).toBe(3)
    })

    it("updates the color of step labels", () => {
      initialStore.dispatch(actions.updateStepsWithUser())
      const wrapper = mount(<StepMarker store={initialStore} />)
      expect(
        wrapper.find(".consignments-step-marker__step_active").length
      ).toBe(1)
      const activeText = wrapper.text()
      expect(activeText).toContain("Confirm Artist/Designer")
    })

    it("includes the shorter labels if in mobile mode", () => {
      initialStore.dispatch(responsiveWindowAction(600))
      initialStore.dispatch(actions.updateStepsWithUser())
      const wrapper = mount(<StepMarker store={initialStore} />)
      const rendered = wrapper.render()
      expect(
        rendered.find(".consignments-step-marker__step_active").length
      ).toBe(1)
      const activeText = rendered.text()
      expect(activeText).toBe("ConfirmDescribeUpload")
    })
  })
})
