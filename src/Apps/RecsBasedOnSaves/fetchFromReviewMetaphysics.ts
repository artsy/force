export async function fetchFromReviewMetaphysics(query: string, user?: User) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (user?.accessToken) {
    headers["X-ACCESS-TOKEN"] = user.accessToken
    headers["X-USER-ID"] = user.id || ""
  }

  const response = await fetch(
    "https://metaphysics-staging-recs-based-on-saves-rail.artsy.net/v2",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    },
  )

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  const data = await response.json()
  if (data.errors) throw new Error(data.errors[0]?.message || "GraphQL error")
  return data.data
}
