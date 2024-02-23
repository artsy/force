import { ShowInstallShotsFragmentContainer } from "Apps/Show/Components/ShowInstallShots"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

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
    const { wrapper } = getWrapper({ Show: () => ({ images: [] }) })

    expect(wrapper.html()).toBe("")
  })

  it("renders the images", () => {
    const { wrapper } = getWrapper({
      Show: (_, generateID) => ({
        images: [{ internalID: generateID() }, { internalID: generateID() }],
      }),
    })

    expect(wrapper.find("button")).toHaveLength(4)
    expect(wrapper.find("img")).toHaveLength(2)
  })
})
