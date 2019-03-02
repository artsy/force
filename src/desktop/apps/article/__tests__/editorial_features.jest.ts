import { isCustomEditorial } from "../editorial_features"

describe("Editorial Features", () => {
  it("returns nothing if article ID does not match existing features", () => {
    const customEditorial = isCustomEditorial("123")
    expect(customEditorial).toBeFalsy()
  })

  it("Can identify EOY_2018_ARTISTS", () => {
    const customEditorial = isCustomEditorial("5bf30690d8b9430baaf6c6de")
    expect(customEditorial).toBe("EOY_2018_ARTISTS")
  })

  it("Can identify EOY_2018_CULTURE", () => {
    const customEditorial = isCustomEditorial("5bf306aad8b9430baaf6c6df")
    expect(customEditorial).toBe("EOY_2018_CULTURE")
  })
})
