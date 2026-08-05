import {
  type AgentArtwork,
  searchAgentArtworks,
} from "Apps/Collect/Server/agentArtworkCatalog"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { Router } from "express"

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
const MODEL = "claude-opus-4-8"
const MAX_TOOL_STEPS = 8

const SYSTEM_PROMPT = `You are an art advisor for Artsy. You help collectors discover artworks through conversation on the /collect page.

Tools:
- search_artworks: find available works matching a collector's taste and budget. Always search before recommending — never invent artists, titles, or prices.

Rules:
- State the exact title, artist, and price for every work you recommend. Prices are in USD.
- You cannot place orders. If a collector asks to buy a work, point them to its page on Artsy to complete the purchase there.
- Be warm, knowledgeable, and concise — an advisor, not a catalog dump.
- When you recommend a work, refer to it by its exact title so the interface can show its image preview and a link automatically. Do not paste image URLs or artwork links into your reply.
- Reply in plain text. Do not use Markdown — no asterisks for bold, no "#" headings, no backticks, and no "-" or "*" bullet characters. Separate points with line breaks and blank lines instead.`

const TOOLS = [
  {
    name: "search_artworks",
    description:
      "Search Artsy's available artworks. Call this whenever the collector wants to find a work, before recommending anything. Only use what this returns.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "What the collector is looking for (style, medium, subject, or artist)",
        },
        max_price_usd: {
          type: "number",
          description: "Optional budget ceiling in US dollars",
        },
      },
      required: ["query"],
    },
  },
]

interface RunToolParams {
  name: string
}

const toDisplayArtwork = (artwork: AgentArtwork) => {
  return {
    id: artwork.id,
    title: artwork.title,
    artist: artwork.artist,
    medium: artwork.medium,
    price_usd: artwork.priceCents / 100,
    image_url: artwork.imageUrl,
    link: artwork.link,
  }
}

const runTool = async ({ name }: RunToolParams): Promise<string> => {
  if (name === "search_artworks") {
    const results = searchAgentArtworks().map(toDisplayArtwork)

    return JSON.stringify(results)
  }

  return JSON.stringify({ status: "error", message: `Unknown tool ${name}` })
}

interface AgentMessage {
  role: "user" | "assistant"
  content: any
}

const callAnthropic = async ({ messages }: { messages: AgentMessage[] }) => {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Anthropic API error ${response.status}: ${detail}`)
  }

  return response.json()
}

const extractReply = (message: AgentMessage): string => {
  if (!Array.isArray(message.content)) {
    return ""
  }

  return message.content
    .filter((block: any) => block.type === "text")
    .map((block: any) => block.text)
    .join("")
}

const collectAgentChatPost = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const incomingMessages = req.body?.messages

  if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
    res.status(400).send({ error: "messages is required" })
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).send({ error: "ANTHROPIC_API_KEY is not configured" })
    return
  }

  const messages: AgentMessage[] = [...incomingMessages]

  try {
    // Agentic loop: resolve tool calls until the model produces a final answer.
    let step = 0
    while (step < MAX_TOOL_STEPS) {
      step += 1
      const response = await callAnthropic({ messages })
      messages.push({ role: "assistant", content: response.content })

      if (response.stop_reason !== "tool_use") {
        break
      }

      const toolResults = await Promise.all(
        response.content
          .filter((block: any) => block.type === "tool_use")
          .map(async (block: any) => {
            const output = await runTool({ name: block.name })

            return {
              type: "tool_result",
              tool_use_id: block.id,
              content: output,
            }
          }),
      )

      messages.push({ role: "user", content: toolResults })
    }

    res.send({ messages, reply: extractReply(messages[messages.length - 1]) })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "Agent request failed" })
  }
}

const collectAgentServerRoutes = Router()

collectAgentServerRoutes.post("/api/collect-agent/chat", collectAgentChatPost)

export { collectAgentServerRoutes }
