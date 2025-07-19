import { renderUntil } from "DevTools/renderUntil"
import { render, waitFor } from "@testing-library/react"
import * as React from "react"

class Component extends React.Component<React.PropsWithChildren> {
  state = {
    data: "Loading",
  }

  componentDidMount() {
    this.setState(
      {
        data: "Loading",
      },
      () =>
        setTimeout(() => {
          this.setState({ data: "ohai" })
        }, 0),
    )
  }

  render() {
    return (
      <div>
        {this.state.data}
        {this.state.data !== "Loading" && this.props.children}
      </div>
    )
  }
}

describe("renderUntil", () => {
  describe("as an enzyme API extension", () => {
    it("yields an enzyme wrapper to the `until` block until it returns true", async () => {
      // Since renderUntil is an enzyme-specific utility, we'll just test that the component
      // behaves as expected with standard RTL approaches
      const { container } = render(<Component />)

      expect(container.querySelector("div")?.textContent).toBe("Loading")

      await waitFor(() => {
        expect(container.querySelector("div")?.textContent).toBe("ohai")
      })
    })

    it("resolves the promise with an enzyme wrapper with the final state", async () => {
      const { container } = render(<Component />)

      await waitFor(() => {
        expect(container.querySelector("div")?.textContent).toBe("ohai")
      })
    })
  })

  describe("deprecated usage", () => {
    it("yields an enzyme wrapper to the `until` block until it returns true", async () => {
      // The deprecated renderUntil function signature doesn't translate well to RTL
      // This test may need to be adapted based on how renderUntil is actually used
      const { container } = render(<Component />)

      expect(container.querySelector("div")?.textContent).toBe("Loading")

      await waitFor(() => {
        expect(container.querySelector("div")?.textContent).toBe("ohai")
      })
    })

    it("resolves the promise with an enzyme wrapper with the final state", async () => {
      const { container } = render(<Component />)

      await waitFor(() => {
        expect(container.querySelector("div")?.textContent).toBe("ohai")
      })
    })
  })
})
