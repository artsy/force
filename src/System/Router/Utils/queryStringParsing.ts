import qs from "qs"

const parseValue = value => {
  let parsedValue = value

  // If this is a string that can be coerced into a number, do it.
  if (
    !Number.isNaN(Number(value)) &&
    typeof value === "string" &&
    value.trim() !== ""
  ) {
    parsedValue = Number(value)
  } else if (
    // If this is the case-insensitive string 'true' or 'false'
    value !== null &&
    typeof value === "string" &&
    (value.toLowerCase() === "true" || value.toLowerCase() === "false")
  ) {
    parsedValue = value.toLowerCase() === "true"
  }

  return parsedValue
}

export const queryStringParsing = (urlStr: string) => {
  const parsedArgs = qs.parse(urlStr)
  return Object.entries(parsedArgs).reduce((acc, [field, value]) => {
    return { ...acc, [field]: parseValue(value) }
  }, {})
}
