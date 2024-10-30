import { mount } from "enzyme"
import { useInquiryAffiliated, Mode } from "Components/Inquiry/Hooks/useInquiryAffiliated"
import { useUpdateCollectorProfile } from "Components/Inquiry/Hooks/useUpdateCollectorProfile"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.mock("../../Hooks/useUpdateCollectorProfile")
jest.mock("../../Hooks/useInquiryContext")

describe("useInquiryAffiliated", () => {
  const Wrapper = () => {
    const {
      handleSelect,
      handleRemove,
      handleSave,
      selection,
      mode,
    } = useInquiryAffiliated()

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

        <pre>{JSON.stringify({ selection, mode })}</pre>
      </>
    )
  }

  const getWrapper = () => {
    return mount(<Wrapper />)
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
    const wrapper = getWrapper()

    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
      selection: [],
      mode: Mode.Pending,
    })

    // Adds first option
    wrapper.find("#one").find("button").first().simulate("click")
    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
      selection: [{ text: "example 1", value: "one" }],
      mode: Mode.Pending,
    })

    // De-duplicates any repeats
    wrapper.find("#one").find("button").first().simulate("click")
    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
      selection: [{ text: "example 1", value: "one" }],
      mode: Mode.Pending,
    })

    // Adds third option
    wrapper.find("#three").find("button").first().simulate("click")
    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
      selection: [
        { text: "example 1", value: "one" },
        { text: "example 3", value: "three" },
      ],
      mode: Mode.Pending,
    })

    // Removes first option
    wrapper.find("#one").find("button").last().simulate("click")
    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
      selection: [{ text: "example 3", value: "three" }],
      mode: Mode.Pending,
    })
  })

  it("saves correctly", async () => {
    const wrapper = getWrapper()

    wrapper.find("#one").find("button").first().simulate("click")
    wrapper.find("#three").find("button").first().simulate("click")

    wrapper.find("#save").simulate("click")

    // Saving
    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
      selection: [
        { text: "example 1", value: "one" },
        { text: "example 3", value: "three" },
      ],
      mode: Mode.Loading,
    })

    await flushPromiseQueue()

    // Saved
    expect(JSON.parse(wrapper.find("pre").text())).toEqual({
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
