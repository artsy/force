import { render, screen } from "@testing-library/react"
import { CollectorProfileArtistsRoute } from "Apps/CollectorProfile/Routes/Artists/CollectorProfileArtistsRoute"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useLazyLoadQuery: jest.fn().mockReturnValue({ me: {} }),
  useFragment: jest.fn().mockReturnValue({}),
}))

jest.mock("Components/Pagination", () => ({
  PaginationFragmentContainer: () => <div />,
}))

describe("CollectorProfileArtistsRoute", () => {
  it("renders correctly", () => {
    render(
      <MockBoot>
        <CollectorProfileArtistsRoute />
      </MockBoot>
    )

    expect(screen.getByText("Add Artist")).toBeInTheDocument()
  })
})
