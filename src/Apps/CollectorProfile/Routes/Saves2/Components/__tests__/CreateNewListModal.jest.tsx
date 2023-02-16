import { render, screen, fireEvent } from "@testing-library/react"
import { CreateNewListModalContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal"

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

interface Props {
  visible?: boolean
}

describe("CreateNewListModal", () => {
  const TestComponent = (props: Props) => {
    return (
      <CreateNewListModalContainer
        visible={props.visible ?? true}
        onClose={onCloseMock}
        onComplete={onCompleteMock}
      />
    )
  }

  it("is not rendered when visible=false", () => {
    render(<TestComponent visible={false} />)
    expect(screen.queryByTestId("CreateNewList")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    render(<TestComponent />)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
    expect(screen.getByText("Create a new list")).toBeInTheDocument()
    expect(screen.getByText("Name your list")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "E.g. Photography, Warhol, etc."
    )
    expect(screen.getByText("40 characters remaining")).toBeInTheDocument()
  })

  it("create button is disabled when name is empty", () => {
    render(<TestComponent />)
    const createButton = screen.getAllByRole("button", {
      name: "Create List",
    })[0]

    expect(createButton).toBeDisabled()
  })

  it("create button is enabled when name is not empty / counter works", () => {
    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "B&W photography",
      },
    })

    expect(screen.getByText("25 characters remaining")).toBeInTheDocument()

    const createButton = screen.getAllByRole("button", {
      name: "Create List",
    })[0]
    expect(createButton).toBeEnabled()
  })

  it("clears entered data when modal is closed", () => {
    const { rerender } = render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "B&W photography",
      },
    })

    rerender(<TestComponent visible={false} />)
    rerender(<TestComponent visible={true} />)

    expect(screen.getByRole("textbox")).toHaveValue("")
  })
})
