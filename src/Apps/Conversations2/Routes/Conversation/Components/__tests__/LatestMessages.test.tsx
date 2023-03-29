import { fireEvent, screen, render } from "@testing-library/react"
import { LatestMessages } from "../LatestMessages"

describe("LatestMessages", () => {
  it("renders", () => {
    render(<LatestMessages visible={true} onClick={() => null} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("Latest Messages")
  })

  it("calls onClick if it is visible", () => {
    const onClick = jest.fn()
    render(<LatestMessages visible={true} onClick={onClick} />)

    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick if it is not visible", () => {
    const onClick = jest.fn()
    render(<LatestMessages visible={false} onClick={onClick} />)

    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
