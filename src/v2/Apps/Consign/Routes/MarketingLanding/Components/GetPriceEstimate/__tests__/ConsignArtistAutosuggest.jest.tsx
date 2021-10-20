import Autosuggest from "react-autosuggest"
import { mount } from "enzyme"
import { ConsignArtistAutosuggest, tests } from "../ConsignArtistAutosuggest"
import { usePriceEstimateContext } from "../ConsignPriceEstimateContext"
import { useTracking } from "react-tracking"

jest.mock("../ConsignPriceEstimateContext", () => ({
  PriceEstimateContextProvider: children => children,
  usePriceEstimateContext: jest.fn(),
}))

describe("ConsignArtistAutosugggest", () => {
  const trackEvent = jest.fn()
  let mockUsePriceEstimateContext

  beforeEach(() => {
    mockUsePriceEstimateContext = usePriceEstimateContext as jest.Mock
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const setupTest = (altSuggestions?: any[]) => {
    const fetchSuggestionsSpy = jest.fn()
    const searchQuery = "some search query"
    const selectSuggestionSpy = jest.fn()
    const setSearchQuerySpy = jest.fn()
    const suggestions = altSuggestions ?? [
      { node: { displayLabel: "someDisplayLabel" } },
    ]

    mockUsePriceEstimateContext.mockImplementation(() => ({
      fetchSuggestions: fetchSuggestionsSpy,
      searchQuery,
      selectSuggestion: selectSuggestionSpy,
      setSearchQuery: setSearchQuerySpy,
      suggestions,
    }))

    const wrapper = mount(<ConsignArtistAutosuggest />)
    const autosuggestWrapper = wrapper.find("Autosuggest") as Autosuggest

    return {
      autosuggestWrapper,
      fetchSuggestionsSpy,
      searchQuery,
      selectSuggestionSpy,
      setSearchQuerySpy,
      suggestions,
      wrapper,
    }
  }

  it("renders correct components", () => {
    const { wrapper } = setupTest()
    expect(wrapper.find("Autosuggest").length).toBe(1)
  })

  describe("Autosuggest API configuration", () => {
    it("#sugggestions: pulls suggestions from context", () => {
      const { autosuggestWrapper, suggestions } = setupTest()
      expect(autosuggestWrapper.props().suggestions).toStrictEqual(suggestions)
    })

    it("#onSuggestionsFetchRequested: triggers fetchSuggestions action", () => {
      const {
        autosuggestWrapper,
        fetchSuggestionsSpy,
        searchQuery,
      } = setupTest()
      autosuggestWrapper.props().onSuggestionsFetchRequested()
      expect(fetchSuggestionsSpy).toHaveBeenCalledWith(searchQuery)
    })

    it("#onSuggestionSelected: it triggers tracking and selectSuggestion action", () => {
      const {
        autosuggestWrapper,
        selectSuggestionSpy,
        suggestions,
      } = setupTest()
      const suggestion = suggestions[0]
      autosuggestWrapper.props().onSuggestionSelected(undefined, { suggestion })
      expect(trackEvent).toHaveBeenCalled()
      expect(selectSuggestionSpy).toHaveBeenCalledWith(suggestion)
    })

    it("#getSuggestionValue: returns the correct value from sugggestion", () => {
      const { autosuggestWrapper, suggestions } = setupTest()
      expect(
        autosuggestWrapper.props().getSuggestionValue(suggestions[0])
      ).toStrictEqual("someDisplayLabel")
    })

    it("#renderInputComponent: renders correct component", () => {
      const { autosuggestWrapper } = setupTest()
      expect(autosuggestWrapper.props().renderInputComponent).toEqual(
        tests.AutosuggestInput
      )
    })

    it("#renderSuggestion: renders correct component", () => {
      const { autosuggestWrapper } = setupTest()
      expect(autosuggestWrapper.props().renderSuggestion).toEqual(
        tests.Suggestion
      )
    })

    describe("#inputProps", () => {
      it("#onChange: it triggers setSearchQuery with new value", () => {
        const { autosuggestWrapper, setSearchQuerySpy } = setupTest()
        autosuggestWrapper
          .props()
          .inputProps.onChange(undefined, { newValue: "foo" })
        expect(setSearchQuerySpy).toHaveBeenCalledWith("foo")
      })

      it("#onFocus: it triggers trackFocusedOnSearchInput", () => {
        const { autosuggestWrapper } = setupTest()
        autosuggestWrapper.props().inputProps.onFocus()
        expect(trackEvent).toHaveBeenCalled()
      })

      it("#placeholder: renders correct placeholder text", () => {
        const { autosuggestWrapper } = setupTest()
        expect(autosuggestWrapper.props().inputProps.placeholder).toEqual(
          "Search by artist name"
        )
      })

      it("#value: renders correct value", () => {
        const { autosuggestWrapper, searchQuery } = setupTest()
        expect(autosuggestWrapper.props().inputProps.value).toEqual(searchQuery)
      })
    })
  })

  describe("tracking", () => {
    it("#trackFocusedOnSearchInput", () => {
      const { autosuggestWrapper } = setupTest()
      autosuggestWrapper.props().inputProps.onFocus()
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "focusedOnSearchInput",
          context_module: "priceEstimate",
          context_owner_type: "consign",
        })
      )
    })

    it("#trackSelectedItemFromSearch", () => {
      const { autosuggestWrapper, suggestions } = setupTest()
      const suggestion = suggestions[0]
      autosuggestWrapper.props().onSuggestionSelected(undefined, { suggestion })
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "selectedItemFromSearch",
          context_module: "priceEstimate",
          context_owner_type: "consign",
          owner_type: "artist",
          query: "some search query",
        })
      )
    })

    it("#trackSearchedWithNoResults", () => {
      setupTest([])
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "searchedWithNoResults",
          context_module: "priceEstimate",
          context_owner_type: "consign",
          query: "some search query",
        })
      )
    })
  })
})
