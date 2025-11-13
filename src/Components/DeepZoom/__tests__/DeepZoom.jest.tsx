import { DeepZoomFragmentContainer } from "Components/DeepZoom/DeepZoom"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { DeepZoom_Test_Query } from "__generated__/DeepZoom_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

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

  it("renders correctly", async () => {
    renderWithRelay()

    expect(screen.getByRole("slider")).toBeInTheDocument()
  })

  it("calls onClose when the close button is clicked", () => {
    renderWithRelay()

    expect(handleClose).not.toBeCalled()

    screen.getAllByRole("button")[0].click()

    expect(handleClose).toBeCalledTimes(1)
  })
})
