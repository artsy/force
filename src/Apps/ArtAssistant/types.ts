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
      sections?: ArtAssistantSection[]
      suggestedReplies?: string[]
    }

export const ART_ASSISTANT_SUPPORTED_SECTIONS = ["ARTWORKS", "ARTISTS"] as const
export const ART_ASSISTANT_ERROR = "Something went wrong. Please try again."
