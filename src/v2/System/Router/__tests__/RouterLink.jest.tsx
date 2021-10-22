import { MockRouter } from "v2/DevTools"
import { mount } from "enzyme"
import { Link } from "found"
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
        return enzyme.html().length > 0
      } catch {
        // Guard against enzyme == null, which is the first render pass
        return false
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
})
