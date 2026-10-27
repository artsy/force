import type { ArtAssistantErrorKind } from "Apps/ArtAssistant/utils/artAssistantErrors"

export type ArtAssistantSection =
  | { type: "artworks"; ids: string[] }
  | { type: "artists"; ids: string[] }

export interface ArtAssistantImage {
  s3Key: string
  s3Bucket: string
  // Local data URL so the attachment survives reloads; never sent to Metaphysics.
  thumbnailURL?: string
}

export type ArtAssistantMessage =
  | { id: string; role: "user"; text: string; image?: ArtAssistantImage }
  | {
      id: string
      role: "assistant"
      text: string
      phase: "responding" | "complete" | "error"
      activity?: string
      error?: ArtAssistantErrorKind
      debug?: ArtAssistantDebug
      sections?: ArtAssistantSection[]
      suggestedReplies?: string[]
    }

export const ART_ASSISTANT_SUPPORTED_SECTIONS = ["ARTWORKS", "ARTISTS"] as const

export interface ArtAssistantDebug {
  hasRequestedDetails?: boolean
  events: {
    type: "call" | "result"
    toolName: string
    summary?: string | null
    detail?: string | null
    ok?: boolean
    elapsedMs: number
  }[]
  durationMs?: number
  stopReason?: string
  toolCallCount?: number
}
