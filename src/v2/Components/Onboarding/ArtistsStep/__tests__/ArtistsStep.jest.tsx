import { mount } from "enzyme"
import { ArtistsStep } from "../ArtistsStep"
import { MultiButtonState } from "v2/Components/Buttons/MultiStateButton"

describe("ArtistsStep", () => {
  const props = { router: {} }

  it("renders popular artists to start", () => {
    const wrapper = mount(<ArtistsStep {...props} />)
    expect(wrapper.find("ArtistSearchResultsComponent")).toHaveLength(0)
    expect(wrapper.find("PopularArtistsComponent")).toHaveLength(1)
  })

  it("renders search results with query", () => {
    const wrapper = mount(<ArtistsStep {...props} />)

    const onInput = wrapper.find("input").prop("onInput")
    const event: any = { target: { value: "andy" } }
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    onInput(event)
    wrapper.update()

    expect(wrapper.find("ArtistSearchResultsComponent")).toHaveLength(1)
    expect(wrapper.find("PopularArtistsComponent")).toHaveLength(0)
  })

  it("renders default next button", () => {
    const wrapper = mount(<ArtistsStep {...props} />)
    const buttonState = wrapper.find("Layout").prop("buttonState")
    expect(buttonState).toEqual(MultiButtonState.Default)
  })
})
