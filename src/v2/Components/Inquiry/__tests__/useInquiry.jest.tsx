import { mount } from "enzyme"
import * as React from "react";
import { useInquiry, withInquiry, WithInquiryProps } from "../useInquiry"

jest.mock("../Inquiry", () => ({
  Inquiry: ({ askSpecialist }) => (
    <>{askSpecialist ? "Specialist Inquiry" : "Artwork Inquiry"}</>
  ),
}))

describe("useInquiry", () => {
  const Wrapper: React.FC = () => {
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
  const Wrapper: React.FC<WithInquiryProps> = ({
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
