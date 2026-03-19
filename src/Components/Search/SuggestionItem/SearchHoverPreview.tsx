import type { FC } from "react"
import { getENV } from "Utils/getENV"
import type { SuggestionItemOptionProps } from "./SuggestionItem"
import { SearchHoverArtistPreview } from "./SearchHoverArtistPreview"
import { SearchHoverArtworkPreview } from "./SearchHoverArtworkPreview"
import { SearchHoverGalleryPreview } from "./SearchHoverGalleryPreview"

interface SearchHoverPreviewProps {
  option: SuggestionItemOptionProps
  onHover: (isHovering: boolean) => void
  triggerRef?: React.RefObject<HTMLElement>
}

export const SearchHoverPreview: FC<SearchHoverPreviewProps> = ({
  option,
  onHover,
}) => {
  const isMobile = getENV("IS_MOBILE")

  if (isMobile) {
    return null
  }

  const handleMouseEnter = () => {
    onHover(true)
  }

  const handleMouseLeave = () => {
    onHover(false)
  }

  const renderPreview = () => {
    switch (option.typename) {
      case "Artist":
        return <SearchHoverArtistPreview option={option} />
      case "Gallery":
        return <SearchHoverGalleryPreview option={option} />
      case "Artwork":
        return <SearchHoverArtworkPreview option={option} />
      default:
        return (
          <div style={{ fontSize: "12px", color: "#999" }}>
            Preview not available for {option.typename}
          </div>
        )
    }
  }

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Only stop propagation if this was not a link click
    const target = e.target as HTMLElement
    const isLinkClick = target.closest("a") || target.closest('[role="link"]')

    if (!isLinkClick) {
      e.stopPropagation()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      {renderPreview()}
    </div>
  )
}
