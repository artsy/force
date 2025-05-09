import {
  type WithInquiryProps,
  useInquiry,
  withInquiry,
} from "Components/Inquiry/useInquiry"
import { mount } from "enzyme"
import type * as React from "react"

jest.mock("../Inquiry", () => ({
  Inquiry: ({ askSpecialist }) => (
    <>{askSpecialist ? "Specialist Inquiry" : "Artwork Inquiry"}</>
  ),
}))

describe("useInquiry", () => {
  const Wrapper: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { showInquiry, inquiryComponent } = useInquiry({
      artworkID: "example",
    })

    return (
      <>
        {inquiryComponent}

        <button id="artwork-inquiry" onClick={() => showInquiry()}>
          show artwork inquiry
        </button>

        <button
          id="specialist-inquiry"
          onClick={() => showInquiry({ askSpecialist: true })}
        >
          show specialist inquiry
        </button>
      </>
    )
  }

  it("displays the artwork inquiry modal when called", () => {
    const wrapper = mount(<Wrapper />)

    expect(wrapper.html()).not.toContain("Artwork Inquiry")

    wrapper.find("#artwork-inquiry").simulate("click")

    expect(wrapper.html()).toContain("Artwork Inquiry")
  })

  it("displays the specialist inquiry modal when called", () => {
    const wrapper = mount(<Wrapper />)

    expect(wrapper.html()).not.toContain("Specialist Inquiry")

    wrapper.find("#specialist-inquiry").simulate("click")

    expect(wrapper.html()).toContain("Specialist Inquiry")
  })
})

describe("withInquiry", () => {
  const Wrapper: React.FC<React.PropsWithChildren<WithInquiryProps>> = ({
    showInquiry,
    inquiryComponent,
  }) => {
    return (
      <>
        {inquiryComponent}

        <button id="artwork-inquiry" onClick={() => showInquiry()}>
          show artwork inquiry
        </button>

        <button
          id="specialist-inquiry"
          onClick={() => showInquiry({ askSpecialist: true })}
        >
          show specialist inquiry
        </button>
      </>
    )
  }

  const WrapperWithInquiry = withInquiry(Wrapper)

  it("displays the artwork inquiry modal when called", () => {
    const wrapper = mount(<WrapperWithInquiry artworkID="example" />)

    expect(wrapper.html()).not.toContain("Artwork Inquiry")

    wrapper.find("#artwork-inquiry").simulate("click")

    expect(wrapper.html()).toContain("Artwork Inquiry")
  })

  it("displays the specialist inquiry modal when called", () => {
    const wrapper = mount(<WrapperWithInquiry artworkID="example" />)

    expect(wrapper.html()).not.toContain("Specialist Inquiry")

    wrapper.find("#specialist-inquiry").simulate("click")

    expect(wrapper.html()).toContain("Specialist Inquiry")
  })
})
