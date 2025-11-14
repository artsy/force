/** biome-ignore-all lint/a11y/useButtonType: ugh */
import {
  Mode,
  useInquiryAffiliated,
} from "Components/Inquiry/Hooks/useInquiryAffiliated"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { useUpdateCollectorProfile } from "Components/Inquiry/Hooks/useUpdateCollectorProfile"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("../../Hooks/useUpdateCollectorProfile")
jest.mock("../../Hooks/useInquiryContext")

describe("useInquiryAffiliated", () => {
  const Wrapper = () => {
    const { handleSelect, handleRemove, handleSave, selection, mode } =
      useInquiryAffiliated()

    const { submitUpdateCollectorProfile } = useUpdateCollectorProfile()

    const options = [
      { text: "example 1", value: "one" },
      { text: "example 2", value: "two" },
      { text: "example 3", value: "three" },
    ]

    return (
      <>
        <div id="options">
          {options.map(option => {
            return (
              <div id={option.value} key={option.value}>
                <button onClick={() => handleSelect(option)}>select</button>

                <button onClick={() => handleRemove(option)}>select</button>
              </div>
            )
          })}
        </div>

        <button
          id="save"
          onClick={() =>
            handleSave(affiliatedGalleryIds => {
              return submitUpdateCollectorProfile({ affiliatedGalleryIds })
            })
          }
        >
          save
        </button>

        <pre data-testid="state">{JSON.stringify({ selection, mode })}</pre>
      </>
    )
  }

  const renderComponent = () => {
    return render(<Wrapper />)
  }

  const mockSubmitUpdateCollectorProfile = jest
    .fn()
    .mockReturnValue(Promise.resolve())

  const mockNext = jest.fn()

  beforeAll(() => {
    ;(useUpdateCollectorProfile as jest.Mock).mockImplementation(() => ({
      submitUpdateCollectorProfile: mockSubmitUpdateCollectorProfile,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
    }))
  })

  afterEach(() => {
    mockSubmitUpdateCollectorProfile.mockReset()
    mockNext.mockReset()
  })

  it("manages the selection", () => {
    const { container } = renderComponent()

    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [],
      mode: Mode.Pending,
    })

    // Adds first option
    const oneButtons = container
      .querySelector("#one")!
      .querySelectorAll("button")
    fireEvent.click(oneButtons[0])
    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [{ text: "example 1", value: "one" }],
      mode: Mode.Pending,
    })

    // De-duplicates any repeats
    fireEvent.click(oneButtons[0])
    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [{ text: "example 1", value: "one" }],
      mode: Mode.Pending,
    })

    // Adds third option
    const threeButtons = container
      .querySelector("#three")!
      .querySelectorAll("button")
    fireEvent.click(threeButtons[0])
    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [
        { text: "example 1", value: "one" },
        { text: "example 3", value: "three" },
      ],
      mode: Mode.Pending,
    })

    // Removes first option
    fireEvent.click(oneButtons[1])
    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [{ text: "example 3", value: "three" }],
      mode: Mode.Pending,
    })
  })

  it("saves correctly", async () => {
    const { container } = renderComponent()

    const oneButtons = container
      .querySelector("#one")!
      .querySelectorAll("button")
    const threeButtons = container
      .querySelector("#three")!
      .querySelectorAll("button")

    fireEvent.click(oneButtons[0])
    fireEvent.click(threeButtons[0])

    fireEvent.click(screen.getByRole("button", { name: "save" }))

    // Saving
    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [
        { text: "example 1", value: "one" },
        { text: "example 3", value: "three" },
      ],
      mode: Mode.Loading,
    })

    await flushPromiseQueue()
    await flushPromiseQueue() // Wait for state update after promise resolution

    // Saved
    expect(JSON.parse(screen.getByTestId("state").textContent!)).toEqual({
      selection: [
        { text: "example 1", value: "one" },
        { text: "example 3", value: "three" },
      ],
      mode: Mode.Success,
    })

    expect(mockSubmitUpdateCollectorProfile).toBeCalledWith({
      affiliatedGalleryIds: ["one", "three"],
    })

    expect(mockNext).toBeCalled()
  })
})
