import { Input } from "@artsy/palette"
import { ArtistAutoComplete } from "Apps/Sell/Components/ArtistAutocomplete"
import { type FormValues, Schema } from "Apps/Sell/Routes/ArtistRoute"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { type ReactWrapper, mount } from "enzyme"
import { Form, Formik } from "formik"
import { fetchQuery } from "react-relay"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { params: { id: null } } })),
}))

const results = {
  searchConnection: {
    edges: [
      {
        node: {
          displayLabel: "Banksy",
          internalID: "111",
          formattedNationalityAndBirthday: "British, b. 1974",
          coverArtwork: {
            image: {
              cropped: {
                height: 44,
                src: "some-img",
                srcSet: "some-img",
                width: 44,
              },
            },
          },
        },
      },
      {
        node: {
          displayLabel: "Andy Warhol",
          formattedNationalityAndBirthday: "American, 1928–1987",
          internalID: "222",
        },
      },
    ],
  },
}

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

const mockErrorHandler = jest.fn()
let mockFetchQuery = (fetchQuery as jest.Mock).mockImplementation(() => ({
  toPromise: jest.fn().mockResolvedValue(results),
}))

let formikValues: FormValues
const renderArtistAutosuggest = (values: FormValues) =>
  mount(
    <SystemContextProvider>
      <Formik<FormValues>
        initialValues={values}
        onSubmit={jest.fn()}
        validationSchema={Schema}
      >
        {({ values }) => {
          formikValues = values
          return (
            <Form>
              <ArtistAutoComplete
                onSelect={() => {}}
                onError={() => mockErrorHandler(true)}
                title="Artist"
                placeholder="Enter full name"
              />
            </Form>
          )
        }}
      </Formik>
    </SystemContextProvider>,
  )

const inputSelector = "input[data-test-id='autocomplete-input']"
const optionsSelector = "button[role='option']"

const simulateTyping = async (wrapper: ReactWrapper, text: string) => {
  const artistInput = wrapper.find(inputSelector)
  artistInput.simulate("focus").simulate("change", { target: { value: text } })
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

  beforeAll(async () => {
    wrapper = renderArtistAutosuggest({
      artistName: "",
      artistId: "",
      isTargetSupply: false,
    })
  })

  beforeEach(() => {
    mockFetchQuery = (fetchQuery as jest.Mock).mockImplementation(() => ({
      toPromise: jest.fn().mockResolvedValue(results),
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const input = wrapper.find(Input)
    expect(wrapper.find(inputSelector).length).toBe(1)
    expect(input.prop("placeholder")).toBe("Enter full name")
    expect(input.prop("title")).toBe("Artist")
  })

  describe("Query", () => {
    it("starts when character is entered", async () => {
      await simulateTyping(wrapper, "B")

      const searchString = mockFetchQuery.mock.calls[0][2].searchQuery

      expect(fetchQuery).toHaveBeenCalledTimes(1)
      expect(searchString).toBe("B")
    })

    it("doesn't starts if it's space", async () => {
      await simulateTyping(wrapper, " ")

      expect(fetchQuery).toHaveBeenCalledTimes(0)
    })
  })

  describe("ArtistAutocomplete component", () => {
    it("fires error handler with correct arg when query failed", async () => {
      mockFetchQuery.mockImplementation(() => ({
        toPromise: jest.fn().mockRejectedValueOnce("no artist"),
      }))

      await simulateTyping(wrapper, "cas")

      expect(mockErrorHandler).toHaveBeenCalledTimes(1)
      expect(mockErrorHandler).toHaveBeenCalledWith(true)
    })
  })

  describe("Suggestions", () => {
    it("render suggestions labels", async () => {
      const correctSuggestionsLabels = ["Banksy", "Andy Warhol"]
      await simulateTyping(wrapper, "Ban")

      const suggestions = wrapper.find(optionsSelector)

      suggestions.forEach((node, idx) => {
        expect(node.text()).toContain(correctSuggestionsLabels[idx])
      })
    })

    it("render disambiguating info", async () => {
      const correctDisambiguatingInfo = [
        "British, b. 1974",
        "American, 1928–1987",
      ]
      await simulateTyping(wrapper, "Ban")

      const suggestions = wrapper.find(optionsSelector)

      suggestions.forEach((node, idx) => {
        expect(node.text()).toContain(correctDisambiguatingInfo[idx])
      })
    })

    it("render suggestions images", async () => {
      await simulateTyping(wrapper, "Ban")

      const suggestions = wrapper.find(optionsSelector)

      expect(suggestions.first().find("Image").length).toBe(1)
      expect(suggestions.first().find("Box").length).toBe(0)
      expect(suggestions.last().find("Image").length).toBe(0)
      expect(suggestions.last().find("Box").length).toBe(1)
    })

    it("suggestion selected", async () => {
      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 0)
      expect(wrapper.find(inputSelector).prop("value")).toBe("Banksy")
      expect(formikValues.artistName).toBe("Banksy")
      expect(formikValues.artistId).toBe("111")
      expect(wrapper.find(optionsSelector).length).toBe(0)

      await simulateTyping(wrapper, "Andy")
      await simulateSelectSuggestion(wrapper, 1)
      expect(wrapper.find(inputSelector).prop("value")).toBe("Andy Warhol")
      expect(formikValues.artistName).toBe("Andy Warhol")
      expect(formikValues.artistId).toBe("222")
      expect(wrapper.find(optionsSelector).length).toBe(0)
    })

    it("renders suggestions after focus backed to input", async () => {
      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 0)
      expect(wrapper.find(optionsSelector).length).toBe(0)

      wrapper.find(inputSelector).simulate("focus")
      expect(wrapper.find(optionsSelector).length).toBe(2)
    })

    it("resets artistId if changing input", async () => {
      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 1)
      expect(formikValues.artistId).toBe("222")

      await simulateTyping(wrapper, "k")
      expect(formikValues.artistId).toBe("")
    })
  })
})
