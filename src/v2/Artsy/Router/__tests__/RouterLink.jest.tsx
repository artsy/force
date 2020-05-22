import { MockRouter } from "v2/DevTools"
import { mount } from "enzyme"
import { Link } from "found"
import React from "react"
import { RouterLink } from "../RouterLink"

describe("RouterLink", () => {
  const getWrapper = async (props: any = {}) => {
    return await mount(
      <MockRouter
        initialRoute={props.initialRoute}
        routes={[
          {
            path: "/*",
            Component: () => {
              return (
                <RouterLink to="/foo" {...props}>
                  Foo
                </RouterLink>
              )
            },
          },
        ]}
      />
    ).renderUntil(enzyme => {
      try {
        return enzyme.find(Link).length > 0
      } catch {
        // Guard against enzyme == null, which is the first render pass
      }
    })
  }

  it("uses the <Link> component if within a router context", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(Link).length).toEqual(1)
  })

  it("uses falls back to an <a> tag if missing a router context", () => {
    const wrapper = mount(<RouterLink to="/foo">Foo</RouterLink>)
    expect(wrapper.find(Link).length).toEqual(0)
    expect(wrapper.find("a").length).toEqual(1)
  })

  it("prunes invalid props from being passed to dom", async () => {
    const wrapper = await getWrapper({ hey: true, you: true })
    expect(Object.keys(wrapper.find("a").props())).not.toContain(["hey", "you"])
  })
})
