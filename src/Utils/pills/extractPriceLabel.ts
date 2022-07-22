export const extractPriceLabel = (range: string) => {
  const [min, max] = range.split("-").map(value => {
    return value === "*" ? value : (+value).toLocaleString()
  })

  let label

  if (min === "*") {
    label = `$0-$${max}`
  } else if (max === "*") {
    label = `$${min}+`
  } else {
    label = `$${min}-$${max}`
  }

  return label
}
