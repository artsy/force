import { renderHook } from "@testing-library/react-hooks"
import { getENV } from "Utils/getENV"
import { mulberry32, useStableShuffle, xmur3 } from "../useStableShuffle"

jest.mock("Utils/getENV")

describe("xmur3", () => {
  it("returns a deterministic, hashed sequence", () => {
    const hashA = xmur3("hello world")

    expect(hashA()).toEqual(2225606010)
    expect(hashA()).toEqual(2106958649)

    const hashB = xmur3("goodbye world")

    expect(hashB()).toEqual(534649177)
    expect(hashB()).toEqual(1317567859)
  })
})

describe("mulberry32", () => {
  it("returns a deterministic number sequence between 0 and 1", () => {
    const randomA = mulberry32(1)

    expect(randomA()).toEqual(0.6270739405881613)
    expect(randomA()).toEqual(0.002735721180215478)

    const randomB = mulberry32(99)

    expect(randomB()).toEqual(0.2604658124037087)
    expect(randomB()).toEqual(0.8048227655235678)
  })
})

describe("useStableShuffle", () => {
  const mockGetEnv = getENV as jest.Mock

  it("shuffles the array ('seed')", () => {
    mockGetEnv.mockImplementation(() => "seed")

    const {
      result: {
        current: { shuffled, seed },
      },
    } = renderHook(() => useStableShuffle({ items: ["a", "b", "c", "d", "e"] }))

    expect(seed).toEqual("seed")
    expect(shuffled).toEqual(["e", "a", "d", "b", "c"])
  })

  it("shuffles the array ('example')", () => {
    mockGetEnv.mockImplementation(() => "example")

    const {
      result: {
        current: { shuffled, seed },
      },
    } = renderHook(() => useStableShuffle({ items: ["a", "b", "c", "d", "e"] }))

    expect(seed).toEqual("example")
    expect(shuffled).toEqual(["b", "e", "c", "d", "a"])
  })

  it("shuffles the array given an example request ID ('fbc4f9f0-9065-4bc4-8476-ad21636794b5')", () => {
    mockGetEnv.mockImplementation(() => "fbc4f9f0-9065-4bc4-8476-ad21636794b5")

    const {
      result: {
        current: { shuffled, seed },
      },
    } = renderHook(() => useStableShuffle({ items: ["a", "b", "c", "d", "e"] }))

    expect(seed).toEqual("fbc4f9f0-9065-4bc4-8476-ad21636794b5")
    expect(shuffled).toEqual(["c", "e", "a", "b", "d"])
  })
})
