import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { ArtworkSortFilter } from "../ArtworkSortFilter"

describe("ArtworkSortFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider
        sortOptions={[
          {
            value: "foo",
            text: "foo",
          },
          {
            value: "bar",
            text: "bar",
          },
        ]}
      >
        <SortFilterFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const SortFilterFilterTest = () => {
    context = useArtworkFilterContext()
    return <ArtworkSortFilter />
  }

  it("updates context on filter change", () => {
    const wrapper = getWrapper()
    wrapper.find("Select").find("option").at(1).simulate("change")
    expect(context.filters.sort).toEqual("bar")
  })
})
