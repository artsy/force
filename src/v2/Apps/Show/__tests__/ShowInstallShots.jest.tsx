import { ShowInstallShotsFragmentContainer } from "../Components/ShowInstallShots"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.mock("v2/Components/Carousel", () => ({
  Carousel: ({ children }) => children,
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalBase: ({ children }) => children,
    useMutationObserver: jest.fn(),
  }
})

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ShowInstallShotsFragmentContainer,
  query: graphql`
    query ShowInstallShots_Test_Query @relay_test_operation {
      show(id: "xxx") {
        ...ShowInstallShots_show
      }
    }
  `,
})

describe("ShowInstallShots", () => {
  it("renders empty string if there are no images", () => {
    const wrapper = getWrapper({ Show: () => ({ images: [] }) })

    expect(wrapper.html()).toBe("")
  })

  it("renders the images", () => {
    const wrapper = getWrapper({
      Show: (_, generateID) => ({
        images: [{ internalID: generateID() }, { internalID: generateID() }],
      }),
    })

    expect(wrapper.find("button")).toHaveLength(4)
    expect(wrapper.find("img")).toHaveLength(2)
  })

  it("zooms the second image when it is clicked", () => {
    const wrapper = getWrapper({
      Show: (_, generateID) => ({
        images: [
          { internalID: generateID() },
          { internalID: generateID(), zoom: { src: "1_zoomExample1x.jpg" } },
        ],
      }),
    })

    expect(wrapper.html()).not.toContain("1_zoomExample1x.jpg")
    wrapper.find("button").at(3).simulate("click")
    wrapper.update()
    expect(wrapper.html()).toContain("1_zoomExample1x.jpg")
  })
})
