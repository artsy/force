import { fireEvent, render, screen } from "@testing-library/react"
import { Order2EditButton } from "Apps/Order2/Components/Order2EditButton"

describe("Order2EditButton", () => {
  it("renders a default Edit label", () => {
    render(<Order2EditButton aria-label="Edit offer" onClick={jest.fn()} />)

    expect(
      screen.getByRole("button", { name: "Edit offer" }),
    ).toHaveTextContent("Edit")
  })

  it("renders a custom label when provided", () => {
    render(
      <Order2EditButton
        aria-label="Edit offer"
        label="Change"
        onClick={jest.fn()}
      />,
    )

    expect(
      screen.getByRole("button", { name: "Edit offer" }),
    ).toHaveTextContent("Change")
  })

  it("invokes onClick when pressed", () => {
    const onClick = jest.fn()
    render(<Order2EditButton aria-label="Edit offer" onClick={onClick} />)

    fireEvent.click(screen.getByRole("button", { name: "Edit offer" }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
