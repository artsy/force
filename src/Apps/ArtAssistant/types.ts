import type { ArtAssistantErrorKind } from "Apps/ArtAssistant/utils/artAssistantErrors"

export type ArtAssistantSection =
  | { type: "artworks"; ids: string[] }
  | { type: "artists"; ids: string[] }

export type ArtAssistantMessage =
  | { id: string; role: "user"; text: string }
  | {
      id: string
      role: "assistant"
      text: string
      phase: "responding" | "complete" | "error"
      activity?: string
      error?: ArtAssistantErrorKind
      sections?: ArtAssistantSection[]
      suggestedReplies?: string[]
    }

export const ART_ASSISTANT_SUPPORTED_SECTIONS = ["ARTWORKS", "ARTISTS"] as const
