import { filterCities } from "../filterUtils"

describe("filterCities", () => {
  const cities = [{ text: "Bogotá" }, { text: "Périgueux" }]

  it("normalizes cities and search term by lowercasing characeters", () => {
    expect(filterCities(cities, "bogota")).toEqual([cities[0]])
    expect(filterCities(cities, "PERIGUEUX")).toEqual([cities[1]])
  })
  it("returns correct results without accented search terms", () => {
    expect(filterCities(cities, "Bogota")).toEqual([cities[0]])
    expect(filterCities(cities, "Perigueux")).toEqual([cities[1]])
  })
})
