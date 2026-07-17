import { deriveGameStatus } from "Apps/Games/Routes/HammerPrice/Utils/deriveGameStatus"

const TARGET = "00985000"

describe("deriveGameStatus", () => {
  it("is notStarted with no guesses", () => {
    expect(deriveGameStatus({ targetDigits: TARGET, guesses: [] })).toBe(
      "notStarted",
    )
  })

  it("is inProgress with unsuccessful guesses remaining", () => {
    expect(
      deriveGameStatus({ targetDigits: TARGET, guesses: ["11111111"] }),
    ).toBe("inProgress")
  })

  it("is won when any guess matches exactly", () => {
    expect(
      deriveGameStatus({
        targetDigits: TARGET,
        guesses: ["11111111", "00985000"],
      }),
    ).toBe("won")
  })

  it("is lost after six unsuccessful guesses", () => {
    expect(
      deriveGameStatus({
        targetDigits: TARGET,
        guesses: Array.from({ length: 6 }, () => "11111111"),
      }),
    ).toBe("lost")
  })

  it("ignores stored guesses whose width no longer matches the target", () => {
    // A stale guess from before the target width changed must not throw or win
    expect(
      deriveGameStatus({ targetDigits: TARGET, guesses: ["0985000"] }),
    ).toBe("inProgress")
  })
})
