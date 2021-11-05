import { mount, ReactWrapper } from "enzyme"
import {
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "../Components/ArtworkDetailsForm"
import { ArtistAutosuggest } from "../Components/ArtistAutosuggest"
import { Form, Formik } from "formik"
import { Input } from "@artsy/palette"
import { SystemContextProvider } from "v2/System"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn().mockResolvedValue({
    searchConnection: {
      edges: [
        {
          node: {
            displayLabel: "Banksy",
            internalID: "111",
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
        { node: { displayLabel: "Andy Warhol", internalID: "222" } },
      ],
    },
  }),
}))

import { fetchQuery } from "react-relay"
import { artworkDetailsValidationSchema } from "../../Utils/validation"

const mockErrorHandler = jest.fn()
const mockFetchQuery = fetchQuery as jest.Mock

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
              <ArtistAutosuggest
                onAutosuggestError={() => mockErrorHandler(true)}
              />
            </Form>
          )
        }}
      </Formik>
    </SystemContextProvider>
  )

const simulateTyping = async (wrapper: ReactWrapper, text: string) => {
  const artistInput = wrapper.find("input[data-test-id='autosuggest-input']")
  artistInput.simulate("focus").simulate("change", { target: { value: text } })
  await flushPromiseQueue()
  wrapper.update()
}

const simulateSelectSuggestion = async (wrapper: ReactWrapper, idx: number) => {
  const suggestion = wrapper
    .find("div[data-test-id='artist-suggestion']")
    .at(idx)
  suggestion.simulate("focus").simulate("click")
  wrapper.find("input[data-test-id='autosuggest-input']").simulate("blur")
  await flushPromiseQueue()
  wrapper.update()
}

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
        await simulateTyping(wrapper, "Ban")

        const searchString = (fetchQuery as jest.Mock).mock.calls[0][2]
          .searchQuery

        expect(fetchQuery).toHaveBeenCalledTimes(1)
        expect(searchString).toBe("Ban")
      })

      it("spaces are not counted", async () => {
        await simulateTyping(wrapper, " Ba n")

        const searchString = (fetchQuery as jest.Mock).mock.calls[0][2]
          .searchQuery

        expect(fetchQuery).toHaveBeenCalledTimes(1)
        expect(searchString).toBe(" Ba n")
      })
    })
    describe("doesn't sends request", () => {
      it("when less then 3 character is entered", async () => {
        await simulateTyping(wrapper, "Ba")

        expect(fetchQuery).toHaveBeenCalledTimes(0)
      })

      it("spaces are not counted", async () => {
        simulateTyping(wrapper, " Ba ")

        expect(fetchQuery).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe("Autosuggest component", () => {
    it("fires error handler with correct arg when query failed", async () => {
      mockFetchQuery.mockRejectedValueOnce("no artist")

      await simulateTyping(wrapper, "cas")

      expect(mockErrorHandler).toHaveBeenCalledTimes(1)
      expect(mockErrorHandler).toHaveBeenCalledWith(true)
    })
  })

  describe("Suggestions", () => {
    it("render suggestions labels", async () => {
      const correctSuggestionsLabels = ["Banksy", "Andy Warhol"]
      await simulateTyping(wrapper, "Ban")

      const suggestions = wrapper.find("div[data-test-id='artist-suggestion']")

      suggestions.forEach((node, idx) => {
        expect(node.text()).toBe(correctSuggestionsLabels[idx])
      })
    })

    it("render suggestions images", async () => {
      await simulateTyping(wrapper, "Ban")

      const suggestions = wrapper.find("div[data-test-id='artist-suggestion']")

      expect(suggestions.first().find("Image").length).toBe(1)
      expect(suggestions.first().find("Box").length).toBe(0)
      expect(suggestions.last().find("Image").length).toBe(0)
      expect(suggestions.last().find("Box").length).toBe(1)
    })

    it("suggestion selected", async () => {
      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 0)

      expect(
        wrapper.find("input[data-test-id='autosuggest-input']").prop("value")
      ).toBe("Banksy")
      expect(formikValues.artistName).toBe("Banksy")
      expect(formikValues.artistId).toBe("111")
      expect(wrapper.find("div[data-test-id='artist-suggestion']").length).toBe(
        0
      )

      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 1)

      expect(
        wrapper.find("input[data-test-id='autosuggest-input']").prop("value")
      ).toBe("Andy Warhol")
      expect(formikValues.artistName).toBe("Andy Warhol")
      expect(formikValues.artistId).toBe("222")
      expect(wrapper.find("div[data-test-id='artist-suggestion']").length).toBe(
        0
      )
    })

    it("renders suggestions after focus backed to input", async () => {
      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 1)

      expect(wrapper.find("div[data-test-id='artist-suggestion']").length).toBe(
        0
      )

      wrapper.find("input[data-test-id='autosuggest-input']").simulate("focus")
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("div[data-test-id='artist-suggestion']").length).toBe(
        2
      )
    })

    it("resets artistId if changing input", async () => {
      await simulateTyping(wrapper, "Ban")
      await simulateSelectSuggestion(wrapper, 1)

      expect(formikValues.artistId).toBe("222")

      await simulateTyping(wrapper, "k")

      expect(formikValues.artistId).toBe("")
    })
  })

  describe("Shows an error", () => {
    it("if focus moved out without selected suggestion", async () => {
      await simulateTyping(wrapper, "Ban")

      expect(wrapper.find("div[color='red100']").length).toBe(0)

      wrapper.find("input[data-test-id='autosuggest-input']").simulate("blur")

      expect(wrapper.find("div[color='red100']").text()).toBe(
        "Unfortunately, we currently do not have enough demand for this artist’s work to be consigned."
      )
    })
  })
})
