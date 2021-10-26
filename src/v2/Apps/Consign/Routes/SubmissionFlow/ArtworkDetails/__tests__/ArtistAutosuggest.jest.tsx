import { mount, ReactWrapper } from "enzyme"
import {
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "../Components/ArtworkDetailsForm"
import { ArtistAutosuggest } from "../Components/ArtistAutosuggest"
import { Formik } from "formik"
import { Input } from "@artsy/palette"
import { SystemContextProvider } from "v2/System"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn().mockResolvedValue({
    searchConnection: {
      edges: [
        { node: { displayLabel: "Banksy", internalID: "111" } },
        { node: { displayLabel: "Andy Warhol", internalID: "222" } },
        { node: { displayLabel: "Shepard Fairey", internalID: "333" } },
      ],
    },
  }),
}))

import { fetchQuery } from "react-relay"

const renderArtistAutosuggest = (values: ArtworkDetailsFormModel) =>
  mount(
    <Formik initialValues={values} onSubmit={jest.fn()}>
      <SystemContextProvider>
        <ArtistAutosuggest />
      </SystemContextProvider>
    </Formik>
  )

describe("ArtistAutosuggest", () => {
  let wrapper: ReactWrapper

  beforeEach(async () => {
    wrapper = renderArtistAutosuggest(getArtworkDetailsFormInitialValues())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const input = wrapper.find(Input)
    expect(wrapper.find(ArtistAutosuggest)).toBeTruthy()
    expect(input.prop("placeholder")).toBe("Enter Full Name")
    expect(input.prop("title")).toBe("Artist")
  })

  describe("Query", () => {
    describe("sends request", () => {
      it("when the 3rd character is entered", async () => {
        wrapper
          .find("input[data-test-id='autosuggest-input']")
          .simulate("change", { target: { value: "Ban" } })

        await flushPromiseQueue()
        wrapper.update()

        const searchString = (fetchQuery as jest.Mock).mock.calls[0][2]
          .searchQuery

        expect(fetchQuery).toHaveBeenCalledTimes(1)
        expect(searchString).toBe("Ban")
      })

      it("spaces are not counted", async () => {
        wrapper
          .find("input[data-test-id='autosuggest-input']")
          .simulate("change", { target: { value: " Ba n" } })

        await flushPromiseQueue()
        wrapper.update()

        const searchString = (fetchQuery as jest.Mock).mock.calls[0][2]
          .searchQuery

        expect(fetchQuery).toHaveBeenCalledTimes(1)
        expect(searchString).toBe(" Ba n")
      })
    })
    describe("doesn't sends request", () => {
      it("when less then 3 character is entered", async () => {
        wrapper
          .find("input[data-test-id='autosuggest-input']")
          .simulate("change", { target: { value: "Ba" } })

        await flushPromiseQueue()
        wrapper.update()

        expect(fetchQuery).toHaveBeenCalledTimes(0)
      })

      it("spaces are not counted", async () => {
        wrapper
          .find("input[data-test-id='autosuggest-input']")
          .simulate("change", { target: { value: " Ba " } })

        await flushPromiseQueue()
        wrapper.update()

        expect(fetchQuery).toHaveBeenCalledTimes(0)
      })
    })
  })
})
