const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4"
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const BRANCH_NAME = process.env.CIRCLE_BRANCH

async function addCnameRecord() {
  const dnsSubdomain = BRANCH_NAME.replace("review-app-", "")

  const response = await fetch(
    `${CLOUDFLARE_API_URL}/zones/${CLOUDFLARE_ZONE_ID}/dns_records`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "CNAME",
        name: dnsSubdomain,
        content: "nginx-staging-2025.artsy.net",
        ttl: 1, // Corresponds to "Auto" in CloudFlare UI
        proxied: true,
        tags: ["source:review-app"],
      }),
    }
  )
  const data = await response.json()

  if (data.success) {
    console.log("CNAME record created:", data.result)
  } else {
    throw new Error(
      `Error creating CNAME record: ${JSON.stringify(data.errors)}`
    )
  }
}
;(async () => {
  try {
    await addCnameRecord()
  } catch (error) {
    console.error(error)
  }
})()
