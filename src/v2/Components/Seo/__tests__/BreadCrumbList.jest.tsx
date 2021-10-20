import { mount } from "enzyme"
import { BreadCrumbList, computeListItems } from "../BreadCrumbList"
import { HeadProvider } from "react-head"

describe("BreadCrumbList", () => {
  const defaultProps = { items: [] }

  const getWrapper = (props = {}) => {
    const wrapper = mount(
      <HeadProvider>
        <BreadCrumbList {...defaultProps} {...props} />
      </HeadProvider>
    )

    return wrapper
  }

  it("sets the schema type", () => {
    const wrapper = getWrapper()
    const script = wrapper.find("script")
    expect(script.text()).toMatch('"@type": "BreadcrumbList"')
  })
})

describe("computeListItems", () => {
  it("prepends a root item", () => {
    const items = []
    const listItems = computeListItems(items, "artsy.net")
    expect(listItems.length).toEqual(1)
    const rootItem = listItems[0]
    expect(rootItem["@type"]).toEqual("ListItem")
    expect(rootItem.position).toEqual(1)
    expect(rootItem.item["@id"]).toEqual("artsy.net")
    expect(rootItem.item.name).toEqual("Artsy")
  })

  it("converts additional items to schema spec", () => {
    const items = [{ path: "/artworks", name: "Artworks" }]
    const listItems = computeListItems(items, "artsy.net")
    expect(listItems.length).toEqual(2)
    const artworksItem = listItems[1]
    expect(artworksItem["@type"]).toEqual("ListItem")
    expect(artworksItem.position).toEqual(2)
    expect(artworksItem.item["@id"]).toEqual("artsy.net/artworks")
    expect(artworksItem.item.name).toEqual("Artworks")
  })
})
