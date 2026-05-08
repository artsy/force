import { ContextModule, Intent } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import { useAuthDialog } from "Components/AuthDialog"
import { NavBarLoggedOutActions } from "Components/NavBar/NavBarLoggedOutActions"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { location: { pathname: "/collect" } },
  })),
}))

jest.mock("System/Components/RouterLink", () => ({
  RouterLink: ({ to, children, ...rest }: any) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}))

jest.mock("Components/AuthDialog/useAuthDialog", () => ({
  useAuthDialog: jest.fn().mockReturnValue({ showAuthDialog: jest.fn() }),
}))

describe("NavBarLoggedOutActions", () => {
  const mockUseAuthDialog = useAuthDialog as jest.Mock

  it("renders Log In and Sign Up buttons", () => {
    render(<NavBarLoggedOutActions />)
    expect(screen.getByText("Log In")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })

  it("Sign Up button links to /signup with encoded current path", () => {
    render(<NavBarLoggedOutActions />)
    expect(screen.getByText("Sign Up").closest("a")).toHaveAttribute(
      "href",
      "/signup?redirectTo=%2Fcollect",
    )
  })

  it("opens auth dialog with correct analytics when Log In is clicked", () => {
    const showAuthDialog = jest.fn()
    mockUseAuthDialog.mockReturnValue({ showAuthDialog })

    render(<NavBarLoggedOutActions />)
    fireEvent.click(screen.getByText("Log In"))

    expect(showAuthDialog).toHaveBeenCalledWith({
      analytics: {
        contextModule: ContextModule.header,
        intent: Intent.login,
      },
    })
  })
})
