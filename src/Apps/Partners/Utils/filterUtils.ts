export const filterCities = (cities, value: string) => {
  return cities.filter(({ text }) => {
    const lowercased = text.toLowerCase()
    const unaccented = lowercased
      .normalize("NFD")
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, "")

    return (
      lowercased.includes(value.toLowerCase()) ||
      unaccented.includes(value.toLowerCase())
    )
  })
}
