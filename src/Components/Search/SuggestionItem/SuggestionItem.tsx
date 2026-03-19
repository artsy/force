import { Box, Pill } from "@artsy/palette"
import { QuickNavigationItem } from "Components/Search/SuggestionItem/QuickNavigationItem"
import type { FC } from "react"
import { useRef, useState } from "react"
import { DefaultSuggestion } from "./DefaultSuggestion"
import { SearchHoverPreview } from "./SearchHoverPreview"
import { SuggestionItemLink } from "./SuggestionItemLink"

export interface SuggestionItemOptionProps {
  text: string
  value: string
  subtitle: string
  imageUrl: string
  showAuctionResultsButton: boolean
  href: string
  typename: string
  item_id?: string
  item_number?: number
  item_type?: string
}

interface SuggestionItemProps {
  query: string
  option: SuggestionItemOptionProps
  onClick: (option?: SuggestionItemOptionProps) => void
}

export const SuggestionItem: FC<
  React.PropsWithChildren<SuggestionItemProps>
> = props => {
  const { option, onClick } = props
  const [isHovering, setIsHovering] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    onClick(option)
  }

  const shouldShowHoverPreview = () => {
    return (
      option.typename === "Artist" ||
      option.typename === "Gallery" ||
      option.typename === "Artwork"
    )
  }

  return (
    <Box
      ref={triggerRef}
      position="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      display="flex"
      width="100%"
      minHeight={shouldShowHoverPreview() && isHovering ? "140px" : "auto"}
    >
      {/* Left Column - Search Result */}
      <Box
        width={shouldShowHoverPreview() && isHovering ? "50%" : "100%"}
        position="relative"
        style={{
          transition: "width 0.2s ease",
        }}
      >
        <SuggestionItemLink onClick={handleClick} to={option.href}>
          <DefaultSuggestion {...props} />

          {/* We size out a placeholder here so that we can avoid nesting the anchor tags */}
          {option.showAuctionResultsButton && (
            <Box pt={1}>
              <Pill
                disabled
                aria-hidden
                style={{ pointerEvents: "none", visibility: "hidden" }}
              >
                Placeholder
              </Pill>
            </Box>
          )}
        </SuggestionItemLink>

        {/* Positioned where this would naturally fall given the above placeholder */}
        {option.showAuctionResultsButton && (
          <Box py={1} px={2} position="absolute" bottom={0} left={0}>
            <QuickNavigationItem
              onClick={handleClick}
              label="Auction Results"
              to={`${option.href}/auction-results`}
            />
          </Box>
        )}
      </Box>

      {/* Right Column - Preview */}
      {shouldShowHoverPreview() && isHovering && (
        <Box width="50%" borderLeft="1px solid #e5e5e5" pl={2}>
          <SearchHoverPreview option={option} onHover={setIsHovering} />
        </Box>
      )}
    </Box>
  )
}
