import { Box } from "@artsy/palette"
import { Carousel } from "Components/Carousel"
import { mount } from "enzyme"
import React from "react"

jest.mock("../paginate", () => ({
  paginateCarousel: () => [0, 100],
}))

const tick = () => new Promise(resolve => setTimeout(resolve, 0))

describe("Carousel", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <Carousel>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Carousel>
    )

    // Renders navigation
    expect(wrapper.find("button").length).toBe(4)

    const previous = wrapper.find("button").at(1)

    expect(previous.props()["aria-label"]).toEqual("Previous page")
    expect(previous.props().disabled).toBe(true)

    const next = wrapper.find("button").at(2)

    expect(next.props()["aria-label"]).toEqual("Next page")
    expect(next.props().disabled).toBe(false)

    // Renders all cells
    expect(wrapper.find(Box).length).toBe(3)

    // Renders screen reader text
    expect(wrapper.html()).toContain("Page 1 of 2")
  })

  it("updates correctly", async () => {
    const onChange = jest.fn()
    const onPageCountChange = jest.fn()

    const wrapper = mount(
      <Carousel onChange={onChange} onPageCountChange={onPageCountChange}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Carousel>
    )

    // Does not call `onChange` on initial mount
    expect(onChange).not.toBeCalled()

    // Calls onPageCountChange with the correct page count
    expect(onPageCountChange).lastCalledWith(2)

    // Click next
    const next = wrapper.find("button").at(2)
    next.simulate("click")

    // Updates screen reader text
    expect(wrapper.html()).toContain("Page 2 of 2")

    // Calls onChange with the updated page index
    await tick()
    expect(onChange).lastCalledWith(1)

    // Click previous
    const previous = wrapper.find("button").at(1)
    previous.simulate("click")

    // Updates screen reader text
    expect(wrapper.html()).toContain("Page 1 of 2")

    // Calls onChange with the updated page index
    await tick()
    expect(onChange).lastCalledWith(0)
  })

  it("accepts a customizable Rail", () => {
    const wrapper = mount(
      <Carousel
        Rail={({ children, ...rest }) => {
          return (
            <Box {...rest}>
              <div>
                I have {React.Children.toArray(children).length} beautiful
                children
              </div>

              {children}
            </Box>
          )
        }}
      >
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Carousel>
    )

    const html = wrapper.html()

    expect(html).toContain("I have 3 beautiful children")
    // @ts-expect-error  MIGRATE_STRICT_MODE
    expect(html.match(/\<li\s/g).length).toBe(3)
  })

  it("accepts a customizable Cell", () => {
    const wrapper = mount(
      <Carousel
        Cell={React.forwardRef(({ children, ...rest }, ref) => {
          return (
            <Box ref={ref as any} {...rest}>
              beautiful number {children}
            </Box>
          )
        })}
      >
        <>1</>
        <>2</>
        <>3</>
      </Carousel>
    )

    const html = wrapper.html()

    expect(html).toContain("beautiful number 1")
    expect(html).toContain("beautiful number 2")
    expect(html).toContain("beautiful number 3")
  })
})
