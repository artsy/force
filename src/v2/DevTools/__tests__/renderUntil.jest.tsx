import { mount } from "enzyme"
import * as React from "react"
import { Responsive } from "v2/Utils/Responsive"
import { MockBoot } from "../MockBoot"
import { renderUntil } from "../renderUntil"

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
        setImmediate(() => {
          this.setState({ data: "ohai" })
        })
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

    it("plays well with the Responsive component", async () => {
      const tree = await renderUntil(
        wrapper => wrapper.find(Component).text() !== "Loading",
        <MockBoot breakpoint="xs">
          <Component>
            <Responsive>
              {({ xs }) => xs && <span>Such response</span>}
            </Responsive>
          </Component>
        </MockBoot>
      )
      expect(tree.find("span").text()).toEqual("Such response")
    })
  })
})
