import React from "react"
import { mount, ReactWrapper } from "enzyme"
import { ArtworkDetailsFormModel } from "../Components/ArtworkDetailsForm"
import { ArtistAutosuggest } from "../Components/ArtistAutosuggest"
import { Formik } from "formik"
import { initialValues } from "../ArtworkDetails"

const renderArtistAutosuggest = (values: ArtworkDetailsFormModel) =>
  mount(
    <Formik initialValues={values} onSubmit={jest.fn()}>
      <ArtistAutosuggest />
    </Formik>
  )

describe("ArtistAutosuggest", () => {
  let wrapper: ReactWrapper
  beforeEach(() => (wrapper = renderArtistAutosuggest(initialValues)))

  it("renders correctly", () => {
    const input = wrapper.find("input[name='artist']")
    expect(wrapper.find(ArtistAutosuggest)).toBeTruthy()
    expect(input).toBeTruthy()
    expect(input.prop("placeholder")).toBe("Enter Full Name")
  })
})
