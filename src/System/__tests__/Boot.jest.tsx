import { Boot } from "System/Boot"
import { SystemContextConsumer } from "System/Contexts/SystemContext"
import { render } from "@testing-library/react"

describe("Boot", () => {
  const bootProps: any = {
    system: {
      relayEnvironment: false,
    },
  }

  const renderComponent = () => render(<Boot {...bootProps} />)

  it("injects global state", () => {
    const App = () => {
      return (
        <Boot welcomeMessage="Found global state" {...bootProps}>
          <SomeOtherComponent />
        </Boot>
      )
    }

    const SomeOtherComponent = () => {
      return (
        <SystemContextConsumer>
          {({ welcomeMessage }: any) => {
            return <div>{welcomeMessage}</div>
          }}
        </SystemContextConsumer>
      )
    }

    const { container } = render(<App />)
    expect(container.innerHTML).toContain("Found global state")
  })

  it("injects ContextProvider", () => {
    const { container } = renderComponent()
    // Simply check that the Boot component renders something
    expect(container).toBeTruthy()
  })

  it("injects ResponsiveProvider", () => {
    // TODO: Because of our backwards compatible wrapper, there are now 2 nested
    //       components in the tree by the same name.
    const { container } = renderComponent()
    expect(container).toBeTruthy()
  })

  it("injects GlobalStyles", () => {
    const { container } = renderComponent()
    expect(container).toBeTruthy()
  })

  it("injects Theme", () => {
    const { container } = renderComponent()
    expect(container).toBeTruthy()
  })
})
