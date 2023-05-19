import { render, screen, fireEvent } from "@testing-library/react"

import { ContextualMenu, ContextualMenuItem } from "Components/ContextualMenu"

describe("ContextualMenu", () => {
  it("initially renders the trigger but not the menu", () => {
    render(
      <ContextualMenu>
        <ContextualMenuItem>Do the first thing</ContextualMenuItem>
        <ContextualMenuItem>Do the second thing</ContextualMenuItem>
      </ContextualMenu>
    )

    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.queryByText("Do the first thing")).not.toBeInTheDocument()
    expect(screen.queryByText("Do the second thing")).not.toBeInTheDocument()
  })

  it("reveals the menu when the trigger is clicked", async () => {
    render(
      <ContextualMenu>
        <ContextualMenuItem>Do the first thing</ContextualMenuItem>
        <ContextualMenuItem>Do the second thing</ContextualMenuItem>
      </ContextualMenu>
    )

    fireEvent.click(screen.getByRole("button"))

    expect(await screen.findByText("Do the first thing")).toBeInTheDocument()
    expect(await screen.findByText("Do the second thing")).toBeInTheDocument()
  })

  it("invokes the onClick handler when a menu item is clicked", async () => {
    const firstHandler = jest.fn()
    const secondHandler = jest.fn()

    render(
      <ContextualMenu>
        <ContextualMenuItem onClick={firstHandler}>
          Do the first thing
        </ContextualMenuItem>

        <ContextualMenuItem onClick={secondHandler}>
          Do the second thing
        </ContextualMenuItem>
      </ContextualMenu>
    )

    fireEvent.click(screen.getByRole("button"))

    const firstItem = await screen.findByText("Do the first thing")
    const secondItem = await screen.findByText("Do the second thing")

    fireEvent.click(firstItem)
    fireEvent.click(secondItem)

    expect(firstHandler).toHaveBeenCalledTimes(1)
    expect(secondHandler).toHaveBeenCalledTimes(1)
  })

  it("only accepts permitted children", () => {
    expect(() => {
      render(
        <ContextualMenu>
          <ContextualMenuItem>Do the first thing</ContextualMenuItem>
          <ContextualMenuItem>Do the second thing</ContextualMenuItem>
          <div>Do the third thing</div>
        </ContextualMenu>
      )
    }).toThrowError(
      /ContextualMenu accepts only ContextualMenuItem and ContextualMenuDivider/
    )
  })
})
