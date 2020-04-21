import ChooseArtist from "desktop/apps/consign/components/choose_artist"
import * as actions from "desktop/apps/consign/client//actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { createStore } from "redux"
import { mount } from "enzyme"

describe("ChooseArtist", () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  it("disables the button when there is no input", () => {
    const wrapper = mount(<ChooseArtist store={initialStore} />)
    expect(
      wrapper
        .find(".consignments-submission-choose-artist__next-button[disabled]")
        .props().disabled
    ).toBe(true)
  })

  it("enables the button when there is an input", () => {
    initialStore.dispatch(actions.updateArtistAutocompleteValue("andy"))
    const wrapper = mount(<ChooseArtist store={initialStore} />)
    expect(
      wrapper
        .find(".consignments-submission-choose-artist__next-button[disabled]")
        .props().disabled
    ).toBe(false)
  })

  it("shows and hides warning message", () => {
    initialStore.dispatch(actions.showNotConsigningMessage())
    const wrapper = mount(<ChooseArtist store={initialStore} />)
    expect(
      wrapper.find(".consignments-submission-choose-artist__not-consigning")
        .length
    ).toBe(1)

    initialStore.dispatch(actions.hideNotConsigningMessage())
    const newWrapper = mount(<ChooseArtist store={initialStore} />)
    expect(
      newWrapper.find(".consignments-submission-choose-artist__not-consigning")
        .length
    ).toBe(0)
  })
})
