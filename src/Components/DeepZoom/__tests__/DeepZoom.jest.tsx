import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { DeepZoomFragmentContainer } from "Components/DeepZoom/DeepZoom"
import { DeepZoom_Test_Query } from "__generated__/DeepZoom_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalBase: ({ children }) => children,
  }
})

const handleClose = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<DeepZoom_Test_Query>({
  Component: ({ artwork }) => {
    const image = artwork!.images![0]!
    return <DeepZoomFragmentContainer image={image} onClose={handleClose} />
  },
  query: graphql`
    query DeepZoom_Test_Query @relay_test_operation {
      artwork(id: "example") {
        images {
          ...DeepZoom_image
        }
      }
    }
  `,
})

describe("DeepZoom", () => {
  beforeAll(() => {
    handleClose.mockReset()
  })

  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByLabelText("Zoom level")).toBeInTheDocument()
  })

  it("calls onClose when the close button is clicked", () => {
    renderWithRelay()

    expect(handleClose).not.toBeCalled()

    const button = screen.getByLabelText("Close")
    button.click()

    expect(handleClose).toBeCalledTimes(1)
  })
})
