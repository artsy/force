import { hasCurrentCounterofferDraft } from "Apps/Order2/Routes/Respond/Utils/counterofferDraft"

describe("hasCurrentCounterofferDraft", () => {
  it("returns false when there is no pending offer", () => {
    expect(
      hasCurrentCounterofferDraft({
        pendingOffer: null,
        galleryOffer: { createdAt: "2024-01-01T00:00:00Z" },
      }),
    ).toBe(false)
  })

  it("returns false when the pending offer has no timestamp", () => {
    expect(
      hasCurrentCounterofferDraft({
        pendingOffer: { createdAt: null },
        galleryOffer: { createdAt: "2024-01-01T00:00:00Z" },
      }),
    ).toBe(false)
  })

  it("treats the draft as current when there is no gallery offer to compare", () => {
    expect(
      hasCurrentCounterofferDraft({
        pendingOffer: { createdAt: "2024-01-01T00:00:00Z" },
        galleryOffer: null,
      }),
    ).toBe(true)
  })

  it("returns true when the pending offer is newer than the gallery offer", () => {
    expect(
      hasCurrentCounterofferDraft({
        pendingOffer: { createdAt: "2024-01-02T00:00:00Z" },
        galleryOffer: { createdAt: "2024-01-01T00:00:00Z" },
      }),
    ).toBe(true)
  })

  it("returns false for a stale draft that predates the gallery offer", () => {
    expect(
      hasCurrentCounterofferDraft({
        pendingOffer: { createdAt: "2024-01-01T00:00:00Z" },
        galleryOffer: { createdAt: "2024-01-02T00:00:00Z" },
      }),
    ).toBe(false)
  })
})
