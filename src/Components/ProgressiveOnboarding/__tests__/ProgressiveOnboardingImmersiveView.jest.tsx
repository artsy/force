import { DismissibleProvider } from "@artsy/dismissible"
import { render, screen } from "@testing-library/react"
import { ProgressiveOnboardingImmersiveView } from "Components/ProgressiveOnboarding/ProgressiveOnboardingImmersiveView"
import { PROGRESSIVE_ONBOARDING_KEYS } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import type { FC } from "react"

const Example: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <DismissibleProvider keys={PROGRESSIVE_ONBOARDING_KEYS}>
      <ProgressiveOnboardingImmersiveView>
        <button type="button">Immersive View</button>
      </ProgressiveOnboardingImmersiveView>
    </DismissibleProvider>
  )
}

describe("ProgressiveOnboardingImmersiveView", () => {
  const immersiveViewText =
    "A new way to experience art without distractions, like you're walking through a gallery."

  const reset = () => {
    localStorage.clear()
  }

  beforeEach(() => {
    reset()
  })

  it("renders the popover on initial load", () => {
    render(<Example />)

    expect(screen.getByText(immersiveViewText)).toBeInTheDocument()
    expect(screen.getByText("Immersive View")).toBeInTheDocument()
  })

  it("dismisses the popover when closed", async () => {
    render(<Example />)

    expect(screen.getByText(immersiveViewText)).toBeInTheDocument()

    // Click the close button
    screen.getByLabelText("Close").click()
    await flushPromiseQueue()

    expect(screen.queryByText(immersiveViewText)).not.toBeInTheDocument()
    expect(screen.getByText("Immersive View")).toBeInTheDocument()
  })

  it("does not render the popover if previously dismissed", () => {
    const { rerender } = render(<Example />)

    // Initially see the popover
    expect(screen.getByText(immersiveViewText)).toBeInTheDocument()

    // Dismiss it
    screen.getByLabelText("Close").click()

    // Rerender the component
    rerender(<Example />)

    // Should not see the popover anymore
    expect(screen.queryByText(immersiveViewText)).not.toBeInTheDocument()
    expect(screen.getByText("Immersive View")).toBeInTheDocument()
  })
})
