export async function metaphysics(args: {
  query: string
  variables: Record<string, unknown>
  headers: Record<string, string>
}) {
  const { query, variables, headers } = args

  const url = `${process.env.METAPHYSICS_ENDPOINT}/v2`

  const body = JSON.stringify({ query, variables })
  const options = { method: "POST", headers, body }

  const response = await fetch(url, options)
  const json = await response.json()
  return json
}
