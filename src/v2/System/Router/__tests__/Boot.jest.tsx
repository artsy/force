import { SystemContextConsumer } from "v2/Artsy"
import { Boot } from "v2/Artsy/Router"
import { mount } from "enzyme"
import React from "react"

describe("Boot", () => {
  const bootProps: any = {
    system: {
      relayEnvironment: false,
    },
  }

  const getWrapper = () => mount(<Boot {...bootProps} />)

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

    expect(mount(<App />).html()).toContain("Found global state")
  })

  it("injects ContextProvider", () => {
    expect(getWrapper().find("SystemContextProvider").length).toEqual(1)
  })

  it("injects ResponsiveProvider", () => {
    // TODO: Because of our backwards compatible wrapper, there are now 2 nested
    //       components in the tree by the same name.
    expect(getWrapper().find("ResponsiveProvider").length).not.toEqual(0)
  })

  it("injects GlobalStyles", () => {
    expect(getWrapper().find("GlobalStyles").length).toEqual(1)
  })

  it("injects Theme", () => {
    expect(getWrapper().find("Theme").length).toEqual(1)
  })

  it("injects Grid", () => {
    expect(mount(<Boot {...bootProps} />).find("Grid").length).toEqual(1)
  })
})
