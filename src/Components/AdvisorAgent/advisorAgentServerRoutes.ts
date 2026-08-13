import { AGENTIC_SEARCH_FEATURE_FLAG } from "Components/AdvisorAgent/AdvisorAgent"
import {
  type AdvisorArtwork,
  searchAdvisorArtworks,
} from "Components/AdvisorAgent/advisorArtworkCatalog"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { getOrInitUnleashServer } from "System/FeatureFlags/unleashServer"
import { type NextFunction, Router } from "express"

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
const MODEL = "claude-opus-4-8"
const MAX_TOKENS = 16000

// Each step is a separate, non-streaming Anthropic call, and the app times out
// requests after 29s in production (see initializeMiddleware). Keep the loop
// short and the thinking budget moderate so a search-and-recommend turn fits.
const MAX_TOOL_STEPS = 4
const EFFORT = "medium"

// This endpoint spends against Artsy's Anthropic account and the transcript is
// supplied by the client, so bound what a single request can carry.
const MAX_INCOMING_MESSAGES = 40
const MAX_INCOMING_CHARS = 60_000

const SYSTEM_PROMPT = `You are an art advisor for Artsy. You help collectors discover artworks through conversation.

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

const toDisplayArtwork = (artwork: AdvisorArtwork) => {
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
    const results = searchAdvisorArtworks().map(toDisplayArtwork)

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
      max_tokens: MAX_TOKENS,
      thinking: { type: "adaptive" },
      output_config: { effort: EFFORT },
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

const advisorAgentChatPost = async (req: ArtsyRequest, res: ArtsyResponse) => {
  if (!req.user) {
    res.status(403).send({ error: "You must be signed in to use the advisor" })
    return
  }

  const incomingMessages = req.body?.messages

  if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
    res.status(400).send({ error: "messages is required" })
    return
  }

  if (
    incomingMessages.length > MAX_INCOMING_MESSAGES ||
    JSON.stringify(incomingMessages).length > MAX_INCOMING_CHARS
  ) {
    res.status(413).send({ error: "This conversation is too long to continue" })
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).send({ error: "ANTHROPIC_API_KEY is not configured" })
    return
  }

  const messages: AgentMessage[] = [...incomingMessages]

  try {
    // Agentic loop: resolve tool calls until the model produces a final answer.
    // The last assistant message is tracked separately because the loop can end
    // on a `tool_use` turn once it runs out of steps, leaving a tool result as
    // the final entry.
    let lastAssistantMessage: AgentMessage | null = null
    let stopReason: string | null = null

    let step = 0
    while (step < MAX_TOOL_STEPS) {
      step += 1
      const response = await callAnthropic({ messages })
      const assistantMessage: AgentMessage = {
        role: "assistant",
        content: response.content,
      }

      messages.push(assistantMessage)
      lastAssistantMessage = assistantMessage
      stopReason = response.stop_reason ?? null

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

    res.send({
      messages,
      reply: lastAssistantMessage ? extractReply(lastAssistantMessage) : "",
      // `max_tokens` (truncated), `refusal` (declined), or `tool_use` (ran out
      // of steps) all mean the reply is incomplete; the UI says so.
      stopReason,
    })
  } catch (error) {
    console.error("[advisorAgent] request failed:", error)
    res.status(500).send({
      error: error instanceof Error ? error.message : "Advisor request failed",
    })
  }
}

// Falls through to the app's catch-all 404 while the feature is off, so the
// endpoint behaves as though it were never mounted. The flag is read per request
// rather than at mount time because Unleash fetches asynchronously and isn't
// ready yet when this router is registered at boot.
const featureEnabled = (
  req: ArtsyRequest,
  _res: ArtsyResponse,
  next: NextFunction,
) => {
  const isEnabled = getOrInitUnleashServer().isEnabled(
    AGENTIC_SEARCH_FEATURE_FLAG,
    {
      userId: req.user?.id,
      sessionId: req.session?.id,
    },
  )

  if (!isEnabled) {
    // Skips advisorAgentChatPost; nothing else matches, so the request lands on
    // the app's 404 handler.
    next("route")
    return
  }

  next()
}

const advisorAgentServerRoutes = Router()

advisorAgentServerRoutes.post(
  "/api/advisor-agent/chat",
  featureEnabled,
  advisorAgentChatPost,
)

export { advisorAgentServerRoutes }
