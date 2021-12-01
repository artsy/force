import { mount, ReactWrapper } from "enzyme"
import {
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "../Components/ArtworkDetailsForm"
import { LocationAutoComplete } from "../Components/LocationAutocomplete"
import { Form, Formik } from "formik"
import { Input } from "@artsy/palette"
import { SystemContextProvider } from "v2/System"
import { flushPromiseQueue } from "v2/DevTools"
import { artworkDetailsValidationSchema } from "../../Utils/validation"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { params: { id: null } } })),
}))

const mockGetPlacePredictions = jest.fn().mockResolvedValue({
  predictions: [
    { description: "Minden, Germany", place_id: "111" },
    { description: "Minsk, Belarus", place_id: "222" },
  ],
})
const AutocompleteService = jest.fn().mockImplementation(() => ({
  getPlacePredictions: mockGetPlacePredictions,
}))
const setupGoogleMapsMock = () => {
  // @ts-ignore
  global.window.google = { maps: { places: { AutocompleteService } } }
}

const mockErrorHandler = jest.fn()
let formikValues: ArtworkDetailsFormModel
const renderArtistAutosuggest = (values: ArtworkDetailsFormModel) =>
  mount(
    <SystemContextProvider>
      <Formik<ArtworkDetailsFormModel>
        initialValues={values}
        onSubmit={jest.fn()}
        validationSchema={artworkDetailsValidationSchema}
      >
        {({ values }) => {
          formikValues = values
          return (
            <Form>
              <LocationAutoComplete onError={() => mockErrorHandler(true)} />
            </Form>
          )
        }}
      </Formik>
    </SystemContextProvider>
  )

const inputSelector = "input[data-test-id='autocomplete-location']"
const optionsSelector = "button[role='option']"

const simulateTyping = async (wrapper: ReactWrapper, text: string) => {
  const locationInput = wrapper.find(inputSelector)
  locationInput
    .simulate("focus")
    .simulate("change", { target: { value: text } })
  await new Promise(r => setTimeout(r, 500))
  await flushPromiseQueue()
  wrapper.update()
}

const simulateSelectSuggestion = async (wrapper: ReactWrapper, idx: number) => {
  wrapper.find(inputSelector).simulate("focus")
  const suggestion = wrapper.find(optionsSelector).at(idx)
  suggestion.simulate("mouseenter").simulate("mousedown").simulate("mouseup")
  await flushPromiseQueue()
  wrapper.update()
}

describe("ArtistAutocomplete", () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    setupGoogleMapsMock()
  })

  beforeEach(async () => {
    wrapper = renderArtistAutosuggest(getArtworkDetailsFormInitialValues())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const input = wrapper.find(Input)
    expect(wrapper.find(inputSelector).length).toBe(1)
    expect(input.prop("placeholder")).toBe(
      "Enter City Where Artwork Is Located"
    )
    expect(input.prop("title")).toBe("Location")
  })

  describe("Query", () => {
    describe("sends request", () => {
      it("when the 3rd character is entered", async () => {
        await simulateTyping(wrapper, "Min")

        const searchString = mockGetPlacePredictions.mock.calls[0][0].input

        expect(mockGetPlacePredictions).toHaveBeenCalledTimes(1)
        expect(searchString).toBe("Min")
      })

      it("spaces are not counted", async () => {
        await simulateTyping(wrapper, " Mi n")

        const searchString = mockGetPlacePredictions.mock.calls[0][0].input

        expect(mockGetPlacePredictions).toHaveBeenCalledTimes(1)
        expect(searchString).toBe(" Mi n")
      })
    })
    describe("doesn't sends request", () => {
      it("when less then 3 character is entered", async () => {
        await simulateTyping(wrapper, "Mi")

        expect(mockGetPlacePredictions).toHaveBeenCalledTimes(0)
      })

      it("spaces are not counted", async () => {
        simulateTyping(wrapper, " Mi ")

        expect(mockGetPlacePredictions).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe("LocationAutocomplete component", () => {
    it("fires error handler with correct arg when query failed", async () => {
      mockGetPlacePredictions.mockRejectedValueOnce("query failed")

      await simulateTyping(wrapper, "Par")

      expect(mockErrorHandler).toHaveBeenCalledTimes(1)
      expect(mockErrorHandler).toHaveBeenCalledWith(true)
    })
  })

  describe("Suggestions", () => {
    it("render suggestions", async () => {
      const correctSuggestionsLabels = ["Minden, Germany", "Minsk, Belarus"]
      await simulateTyping(wrapper, "Min")

      const suggestions = wrapper.find(optionsSelector)

      suggestions.forEach((node, idx) => {
        expect(node.text()).toBe(correctSuggestionsLabels[idx])
      })
    })

    it("suggestion selected", async () => {
      await simulateTyping(wrapper, "Min")
      await simulateSelectSuggestion(wrapper, 0)
      expect(wrapper.find(inputSelector).prop("value")).toBe("Minden, Germany")
      expect(formikValues.location).toBe("Minden, Germany")
      expect(formikValues.locationId).toBe("111")
      expect(wrapper.find(optionsSelector).length).toBe(0)

      await simulateTyping(wrapper, "Mins")
      await simulateSelectSuggestion(wrapper, 1)
      expect(wrapper.find(inputSelector).prop("value")).toBe("Minsk, Belarus")
      expect(formikValues.location).toBe("Minsk, Belarus")
      expect(formikValues.locationId).toBe("222")
      expect(wrapper.find(optionsSelector).length).toBe(0)
    })

    it("renders suggestions after focus backed to input", async () => {
      await simulateTyping(wrapper, "Min")
      await simulateSelectSuggestion(wrapper, 0)
      expect(wrapper.find(optionsSelector).length).toBe(0)

      wrapper.find(inputSelector).simulate("focus")
      expect(wrapper.find(optionsSelector).length).toBe(2)
    })

    it("resets locationId if changing input", async () => {
      await simulateTyping(wrapper, "Min")
      await simulateSelectSuggestion(wrapper, 1)
      expect(formikValues.locationId).toBe("222")

      await simulateTyping(wrapper, "A")
      expect(formikValues.locationId).toBe("")
    })
  })

  describe("Shows an error", () => {
    it("if focus moved out without selected suggestion", async () => {
      await simulateTyping(wrapper, "Min")
      expect(wrapper.find("div[color='red100']").length).toBe(0)

      const handleClose: () => void = wrapper
        .find("AutocompleteInput")
        .prop("onClose")
      handleClose()
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("div[color='red100']").text()).toBe(
        `Could not find ${formikValues.location}`
      )
    })
  })
})
