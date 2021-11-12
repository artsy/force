import { mount } from "enzyme"
import { EditButton } from "../EditButton"
import { SystemContextProvider } from "@artsy/reaction/dist/Artsy"

jest.mock("sharify", () => ({
  data: {
    CURRENT_USER: { id: "567" },
    POSITRON_URL: "https://writer.artsy.net",
  },
}))
const sd = require("sharify").data

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))
const mockPositronql = require("desktop/lib/positronql").positronql as jest.Mock

describe("EditButton", () => {
  let props
  const getWrapper = () => {
    return mount(
      <SystemContextProvider user={null}>
        <EditButton {...props} />
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    props = {
      slug: "artsy-editorial-slug",
      channelId: "123",
    }
    mockPositronql.mockReset()
  })

  it("renders edit button if the user is a member of the article's channel", async () => {
    const data = { channels: [{ id: "123" }, { id: "234" }] }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    const instance = component.find(EditButton).instance()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    await instance.componentDidMount()

    component.update()
    expect(component.html()).toMatch(
      "https://writer.artsy.net/articles/artsy-editorial-slug/edit"
    )
    expect(component.html()).toMatch("icon-with-black-circle")
    expect(instance.state).toEqual({
      hasButtonState: true,
      showEditButton: true,
    })
  })

  it("does not render edit button if the user is not a member of the article's channel", async () => {
    const data = { channels: [{ id: "234" }] }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    const instance = component.find(EditButton).instance()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    await instance.componentDidMount()

    expect(component.children().length).toBe(1)
    expect(instance.state).toEqual({
      hasButtonState: true,
      showEditButton: false,
    })
  })

  it("does not render edit button if there is no user", async () => {
    delete sd.CURRENT_USER
    const component = getWrapper()
    const instance = component.find(EditButton).instance()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    await instance.componentDidMount()

    expect(mockPositronql).not.toBeCalled()
    expect(component.children().length).toBe(1)
    expect(instance.state).toEqual({
      hasButtonState: true,
      showEditButton: false,
    })
  })
})
