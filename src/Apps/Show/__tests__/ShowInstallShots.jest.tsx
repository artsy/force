import { ShowInstallShotsFragmentContainer } from "Apps/Show/Components/ShowInstallShots"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalBase: ({ children }) => children,
    useMutationObserver: jest.fn(),
  }
})

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
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
    const { container } = renderWithRelay({ Show: () => ({ images: [] }) })

    expect(container.innerHTML).toBe("")
  })

  it("renders the images", () => {
    const { container } = renderWithRelay({
      Show: (_, generateID) => ({
        images: [{ internalID: generateID() }, { internalID: generateID() }],
      }),
    })

    expect(container.querySelectorAll("button")).toHaveLength(4)
    expect(container.querySelectorAll("img")).toHaveLength(2)
  })
})
