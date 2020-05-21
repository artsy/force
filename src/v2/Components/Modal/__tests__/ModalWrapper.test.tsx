import { mount } from "enzyme"
import React from "react"
import { ModalContainer, ModalOverlay, ModalWrapper } from "../ModalWrapper"

describe("Modal", () => {
  const getWrapper = inputs => {
    return mount(
      <ModalWrapper {...inputs}>
        <div>Modal Contents</div>
      </ModalWrapper>
    )
  }

  let props
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      blurContainerSelector: "",
      fullscreenResponsiveModal: true,
    }
  })

  it("does not render children by default", () => {
    const component = getWrapper(props)
    expect(component.html()).not.toMatch("Modal Contents")
  })

  it("Renders children if props.show", () => {
    props.show = true
    const component = getWrapper(props)

    expect(component.find(ModalContainer)).toHaveLength(1)
    expect(component.find(ModalOverlay)).toHaveLength(1)
    expect(component.html()).toMatch("Modal Contents")
  })
  it("Closes on background click", () => {
    props.show = true
    const component = getWrapper(props)
    ;(component.instance() as any).removeBlurToContainers = jest.fn()
    component
      .find(ModalOverlay)
      .at(0)
      .simulate("click")

    expect(
      (component.instance() as any).removeBlurToContainers
    ).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })
})
