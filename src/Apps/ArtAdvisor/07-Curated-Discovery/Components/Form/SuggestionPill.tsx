import { Button } from "@artsy/palette"

interface SuggestionPillProps {
  suggestion: string
  selected: boolean
  onClick: () => void
}

export const SuggestionPill: React.FC<SuggestionPillProps> = props => {
  const { suggestion, selected, onClick } = props

  return (
    <Button
      variant={selected ? "primaryBlack" : "primaryGray"}
      size="small"
      onClick={onClick}
    >
      {suggestion}
    </Button>
  )
}
