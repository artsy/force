const fetch = require("node-fetch")

const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4"
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const ZONE_NAME = "artsy.net"

async function getZoneId(zoneName) {
  const response = await fetch(`${CLOUDFLARE_API_URL}/zones?name=${zoneName}`, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  if (data.success) {
    return data.result[0].id
  }
  throw new Error(`Error fetching zone ID: ${JSON.stringify(data.errors)}`)
}

async function addCnameRecord(zoneId, subdomain, target) {
  const response = await fetch(
    `${CLOUDFLARE_API_URL}/zones/${zoneId}/dns_records`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "CNAME",
        name: subdomain,
        content: target,
        ttl: 3600,
        proxied: true,
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
    const zoneId = await getZoneId(ZONE_NAME)
    await addCnameRecord(
      zoneId,
      "subdomain.yourdomain.com",
      "target.domain.com"
    )
  } catch (error) {
    console.error(error)
  }
})()
