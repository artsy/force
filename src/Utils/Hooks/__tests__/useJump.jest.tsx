import { getOffsetTopForSticky, useSticky } from "Components/Sticky"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { scrollToAwaitable } from "Utils/scrollToAwaitable"
import { act, renderHook } from "@testing-library/react-hooks"
import { useJump } from "../useJump"

jest.mock("Components/NavBar/useNavBarHeight", () => ({
  useNavBarHeight: jest.fn(),
}))

jest.mock("Components/Sticky", () => ({
  getOffsetTopForSticky: jest.fn(),
  useSticky: jest.fn(),
}))

jest.mock("Utils/scrollToAwaitable", () => ({
  scrollToAwaitable: jest.fn(),
}))

const mockedGetOffsetTopForSticky =
  getOffsetTopForSticky as jest.MockedFunction<typeof getOffsetTopForSticky>
const mockedScrollToAwaitable = scrollToAwaitable as jest.MockedFunction<
  typeof scrollToAwaitable
>
const mockedUseNavBarHeight = useNavBarHeight as jest.MockedFunction<
  typeof useNavBarHeight
>
const mockedUseSticky = useSticky as jest.MockedFunction<typeof useSticky>

const createTarget = (id: string, top: number): HTMLElement => {
  const target = document.createElement("div")
  target.id = `JUMP--${id}`
  Object.defineProperty(target, "getBoundingClientRect", {
    value: () => ({ top }),
  })

  document.body.appendChild(target)

  return target
}

const setStickyMock = (
  overrides: Partial<ReturnType<typeof useSticky>> = {},
): void => {
  mockedUseSticky.mockReturnValue({
    id: "mock-sticky",
    deregisterSticky: jest.fn(),
    offsetTop: 0,
    registerSticky: jest.fn(),
    stickies: [],
    updateSticky: jest.fn(),
    isGlobalNavRetracted: false,
    hasRetractGlobalNavStickies: false,
    setGlobalNavRetraction: jest.fn(),
    scrollDirection: "down",
    ...overrides,
  })
}

describe("useJump", () => {
  beforeEach(() => {
    mockedUseNavBarHeight.mockReturnValue({
      mobile: 100,
      desktop: 100,
      height: [100, 100],
      computedHeight: 100,
    })

    setStickyMock()
    mockedGetOffsetTopForSticky.mockReturnValue(30)
  })

  afterEach(() => {
    document.body.innerHTML = ""
    jest.clearAllMocks()
  })

  it("scrolls to an element id using sticky-aware offset calculations", () => {
    const target = createTarget("example", 200)
    const { result } = renderHook(() =>
      useJump({ behavior: "instant", offset: 20 }),
    )

    act(() => {
      result.current.jumpTo("example")
    })

    expect(mockedGetOffsetTopForSticky).toHaveBeenCalledWith({
      id: "example",
      stickies: [],
      targetEl: target,
    })

    expect(mockedScrollToAwaitable).toHaveBeenCalledWith({
      target,
      offset: -150,
      behavior: "instant",
      onComplete: undefined,
    })
  })

  it("accounts for nav retraction compensation when scrolling up to an id", () => {
    const target = createTarget("example", -20)
    setStickyMock({ isGlobalNavRetracted: true })

    const { result } = renderHook(() =>
      useJump({ behavior: "instant", offset: 20 }),
    )

    act(() => {
      result.current.jumpTo("example")
    })

    expect(mockedScrollToAwaitable).toHaveBeenCalledWith({
      target,
      offset: -250,
      behavior: "instant",
      onComplete: undefined,
    })
  })
})
