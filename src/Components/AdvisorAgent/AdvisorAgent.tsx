import { Box, Button, Flex, Input, Spacer, Text } from "@artsy/palette"
import type * as React from "react"
import { useEffect, useRef, useState } from "react"

interface TranscriptEntry {
  role: "you" | "advisor"
  text: string
}

// The full message list the server round-trips (opaque to the UI — it carries
// tool calls, tool results, and thinking blocks). We keep it to send back each
// turn, and render from `transcript` instead.
interface WireMessage {
  role: "user" | "assistant"
  content: unknown
}

// An artwork the advisor surfaced via search_artworks, pulled back out of the
// wire transcript so the UI can show a preview when the advisor recommends it.
interface AdvisorArtworkPreview {
  id: string
  title: string
  artist?: string
  priceUsd?: number
  imageUrl?: string
  link?: string
}

// Collect every artwork the advisor has searched this session. search_artworks
// tool results ride back in the wire transcript as JSON arrays inside
// `tool_result` blocks; we parse those and dedupe by id.
const collectSearchedArtworks = (
  wireMessages: WireMessage[],
): AdvisorArtworkPreview[] => {
  const byId = new Map<string, AdvisorArtworkPreview>()

  wireMessages.forEach(message => {
    if (!Array.isArray(message.content)) {
      return
    }

    message.content.forEach((block: any) => {
      if (block?.type !== "tool_result" || typeof block.content !== "string") {
        return
      }

      const parsed = safeParse(block.content)

      if (!Array.isArray(parsed)) {
        return
      }

      parsed.forEach((item: any) => {
        if (item?.id && item?.title) {
          byId.set(item.id, {
            id: item.id,
            title: item.title,
            artist: item.artist,
            priceUsd: item.price_usd,
            imageUrl: item.image_url,
            link: item.link,
          })
        }
      })
    })
  })

  return Array.from(byId.values())
}

const safeParse = (value: string): unknown => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

const formatPriceUsd = (priceUsd: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceUsd)
}

// Loose match so punctuation/casing don't matter (e.g. curly apostrophes in
// "Cat's Head", the colon in "4:04").
const normalize = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

// Which searched works this advisor message actually names — those get a preview.
const findRecommendedArtworks = (
  text: string,
  artworks: AdvisorArtworkPreview[],
): AdvisorArtworkPreview[] => {
  const normalizedText = normalize(text)

  return artworks.filter(artwork => {
    const normalizedTitle = normalize(artwork.title)

    return (
      normalizedTitle.length >= 3 && normalizedText.includes(normalizedTitle)
    )
  })
}

interface ArtworkPreviewCardProps {
  artwork: AdvisorArtworkPreview
}

const ArtworkPreviewCard: React.FC<ArtworkPreviewCardProps> = ({ artwork }) => {
  const [isCopied, setIsCopied] = useState(false)

  // Copy "Title by Artist" so it can be pasted straight into the chat to
  // reference this work without retyping it.
  const handleCopy = () => {
    const label = [artwork.title, artwork.artist].filter(Boolean).join(" by ")

    navigator.clipboard
      ?.writeText(label)
      .then(() => {
        setIsCopied(true)
        window.setTimeout(() => setIsCopied(false), 1500)
      })
      .catch(() => {})
  }

  return (
    <Flex
      alignItems="center"
      bg="mono0"
      border="1px solid"
      borderColor="mono10"
      borderRadius={8}
      p={0.5}
      onClick={handleCopy}
      title="Click to copy title & artist"
      style={{ cursor: "pointer" }}
    >
      {artwork.imageUrl ? (
        <Box
          width={56}
          height={56}
          flexShrink={0}
          mr={1}
          borderRadius={4}
          overflow="hidden"
          bg="mono5"
        >
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      ) : null}

      <Box overflow="hidden">
        <Text variant="xs" color="mono100">
          {artwork.title}
        </Text>
        {artwork.artist ? (
          <Text variant="xs" color="mono60">
            {artwork.artist}
          </Text>
        ) : null}
        {typeof artwork.priceUsd === "number" ? (
          <Text variant="xs" color="mono100">
            {formatPriceUsd(artwork.priceUsd)}
          </Text>
        ) : null}
        {isCopied ? (
          <Text variant="xs" color="green100">
            Copied ✓
          </Text>
        ) : artwork.link ? (
          <a
            href={artwork.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={event => event.stopPropagation()}
            style={{ textDecoration: "none" }}
          >
            <Text variant="xs" color="blue100">
              View on Artsy →
            </Text>
          </a>
        ) : null}
      </Box>
    </Flex>
  )
}

export const AdvisorAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [draft, setDraft] = useState("")
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [wireMessages, setWireMessages] = useState<WireMessage[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // Bring the newest message into view as the transcript grows or the advisor
  // starts/stops "Thinking…". Align the top of the last message with the top of
  // the scroll area (rather than scrolling all the way to the bottom) so a long
  // reply is read from its beginning.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run to re-scroll whenever a message is added or the loading state toggles, even though the effect body only reads refs
  useEffect(() => {
    const container = scrollRef.current
    const lastMessage = lastMessageRef.current

    if (!container || !lastMessage) {
      return
    }

    const delta =
      lastMessage.getBoundingClientRect().top -
      container.getBoundingClientRect().top

    container.scrollTop += delta
  }, [transcript, isLoading])

  const searchedArtworks = collectSearchedArtworks(wireMessages)

  const handleSend = async () => {
    const text = draft.trim()

    if (!text || isLoading) {
      return
    }

    setDraft("")
    setTranscript(prev => [...prev, { role: "you", text }])
    setIsLoading(true)

    const nextWire: WireMessage[] = [
      ...wireMessages,
      { role: "user", content: text },
    ]

    try {
      const response = await fetch("/api/advisor-agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextWire }),
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const payload = await response.json()

      setWireMessages(payload.messages)
      setTranscript(prev => [
        ...prev,
        { role: "advisor", text: payload.reply || "…" },
      ])
    } catch (error) {
      console.error(error)
      setTranscript(prev => [
        ...prev,
        {
          role: "advisor",
          text: "Sorry — something went wrong reaching the advisor.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Box position="fixed" bottom={20} right={20} zIndex={100}>
        <Button onClick={() => setIsOpen(true)}>Ask an art advisor</Button>
      </Box>
    )
  }

  return (
    <Box
      position="fixed"
      bottom={20}
      right={20}
      zIndex={100}
      width={460}
      maxWidth="calc(100vw - 40px)"
      bg="mono0"
      border="1px solid"
      borderColor="mono10"
      borderRadius={8}
      boxShadow="0 12px 40px rgba(0, 0, 0, 0.18)"
      p={2}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="sm-display">Art advisor</Text>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </Flex>

      <Box ref={scrollRef as any} my={1} height={460} overflowY="auto">
        {transcript.length === 0 ? (
          <Text variant="sm" color="mono60">
            Try: “Find me a colorful abstract painting under $5,000.”
          </Text>
        ) : (
          transcript.map((entry, index) => {
            const isLast = index === transcript.length - 1
            const isYou = entry.role === "you"
            const recommended = isYou
              ? []
              : findRecommendedArtworks(entry.text, searchedArtworks)

            return (
              <Flex
                key={index}
                ref={isLast ? (lastMessageRef as any) : undefined}
                flexDirection="column"
                alignItems={isYou ? "flex-end" : "flex-start"}
                mb={1}
              >
                <Text variant="xs" color="mono60" mb={0.3}>
                  {isYou ? "You" : "Advisor"}
                </Text>
                <Box
                  maxWidth="85%"
                  bg={isYou ? "blue100" : "mono5"}
                  color={isYou ? "mono0" : "mono100"}
                  border="1px solid"
                  borderColor={isYou ? "blue100" : "mono10"}
                  borderRadius={12}
                  px={1}
                  py={0.5}
                >
                  <Text variant="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {entry.text}
                  </Text>
                </Box>

                {recommended.length > 0 ? (
                  <Box width="85%" mt={0.5}>
                    {recommended.map(artwork => {
                      return (
                        <Box key={artwork.id} mb={0.5}>
                          <ArtworkPreviewCard artwork={artwork} />
                        </Box>
                      )
                    })}
                  </Box>
                ) : null}
              </Flex>
            )
          })
        )}

        {isLoading ? (
          <Flex flexDirection="column" alignItems="flex-start" mb={1}>
            <Text variant="xs" color="mono60" mb={0.3}>
              Advisor
            </Text>
            <Box
              bg="mono5"
              border="1px solid"
              borderColor="mono10"
              borderRadius={12}
              px={1}
              py={0.5}
            >
              <Text variant="sm" color="mono60">
                Thinking…
              </Text>
            </Box>
          </Flex>
        ) : null}
      </Box>

      <Flex alignItems="center">
        <Box flex={1}>
          <Input
            value={draft}
            placeholder="Describe what you’re looking for"
            onChange={event => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </Box>

        <Spacer x={1} />

        <Button onClick={handleSend} loading={isLoading}>
          Send
        </Button>
      </Flex>
    </Box>
  )
}
