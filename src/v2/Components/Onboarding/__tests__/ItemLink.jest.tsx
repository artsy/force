import { mount } from "enzyme"
import ItemLink from "../ItemLink"
import { CircleWhiteCheckIcon, PlusIcon } from "@artsy/palette"

describe("ArtistSearchResults", () => {
  const mockedOnFollow = jest.fn()
  const mockedArtist = {}

  const props = {
    href: "#",
    item: mockedArtist,
    key: "id",
    id: "id",
    name: "Anna",
    image_url: "url",
    onFollow: mockedOnFollow,
  }

  it("renders PlusIcon", () => {
    const wrapper = mount(<ItemLink {...props} />)
    expect(wrapper.find(CircleWhiteCheckIcon).exists()).toBeFalsy()
    expect(wrapper.find(PlusIcon).exists()).toBeTruthy()
  })

  it("renders CircleWhiteCheckIcon", () => {
    const wrapper = mount(<ItemLink {...props} />)

    const onClick = wrapper.find("Link").prop("onClick")
    const event: any = {}
    // @ts-expect-error STRICT_NULL_CHECK
    onClick(event)
    wrapper.update()

    expect(wrapper.find(CircleWhiteCheckIcon).exists()).toBeTruthy()
    expect(wrapper.find(PlusIcon).exists()).toBeFalsy()
  })
})
