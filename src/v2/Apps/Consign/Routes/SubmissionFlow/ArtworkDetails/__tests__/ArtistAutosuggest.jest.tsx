import { mount, ReactWrapper } from "enzyme"
import {
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "../Components/ArtworkDetailsForm"
import { ArtistAutosuggest } from "../Components/ArtistAutosuggest"
import { Formik } from "formik"
import { Input } from "@artsy/palette"

const renderArtistAutosuggest = (values: ArtworkDetailsFormModel) =>
  mount(
    <Formik initialValues={values} onSubmit={jest.fn()}>
      <ArtistAutosuggest />
    </Formik>
  )

describe("ArtistAutosuggest", () => {
  let wrapper: ReactWrapper
  beforeEach(() => {
    wrapper = renderArtistAutosuggest(getArtworkDetailsFormInitialValues())
  })

  it("renders correctly", () => {
    const input = wrapper.find(Input)
    expect(wrapper.find(ArtistAutosuggest)).toBeTruthy()
    expect(input.prop("placeholder")).toBe("Enter Full Name")
    expect(input.prop("title")).toBe("Artist")
  })
})
