import { mount } from "enzyme"
import * as React from "react"
import { renderUntil } from "DevTools/renderUntil"

class Component extends React.Component {
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
        }, 0)
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
      const states = []
      await mount(<Component />).renderUntil(tree => {
        const text = tree.find("div").text()
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        states.push(text)
        return text !== "Loading"
      })
      expect(states).toEqual(["Loading", "ohai"])
    })

    it("resolves the promise with an enzyme wrapper with the final state", async () => {
      const wrapper = await mount(<Component />).renderUntil(
        tree => tree.find("div").text() !== "Loading"
      )
      expect(wrapper.find("div").text()).toEqual("ohai")
    })
  })

  describe("deprecated usage", () => {
    it("yields an enzyme wrapper to the `until` block until it returns true", async () => {
      const states = []
      await renderUntil(wrapper => {
        const text = wrapper.find("div").text()
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        states.push(text)
        return text !== "Loading"
      }, <Component />)
      expect(states).toEqual(["Loading", "ohai"])
    })

    it("resolves the promise with an enzyme wrapper with the final state", async () => {
      const tree = await renderUntil(
        wrapper => wrapper.find("div").text() !== "Loading",
        <Component />
      )
      expect(tree.find("div").text()).toEqual("ohai")
    })
  })
})
