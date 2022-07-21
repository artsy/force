export type Result = {
  name: string
  value: string
}

export const sortResults = (
  selectedValues: Array<string>,
  allResults: Array<Result>
) => {
  const selectedFacets = allResults.filter(({ value }) => {
    return selectedValues.includes(value)
  })

  return selectedFacets.concat(
    allResults.filter(({ value }) => {
      return !selectedValues.includes(value)
    })
  )
}
