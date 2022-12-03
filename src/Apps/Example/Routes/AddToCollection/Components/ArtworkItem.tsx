import { Box, Image, Text, Spacer, Button } from "@artsy/palette"

interface ArtworkItemProps {
  artwork: any
  mode: "add" | "remove"
  onClick: (artwork: any) => void
}

export const ArtworkItem: React.FC<ArtworkItemProps> = ({
  artwork,
  mode = "add",
  onClick,
}) => {
  return (
    <Box m={2} mb={4} maxWidth={200}>
      {artwork.image?.cropped && (
        <Image
          src={artwork.image.cropped.src}
          srcSet={artwork.image.cropped.srcSet}
          width={artwork.image.cropped.width}
          height={artwork.image.cropped.height}
          lazyLoad
        />
      )}

      <Text variant="xs">{artwork.artistNames}</Text>
      <Text variant="xs" color="black60" lineClamp={1}>
        {[artwork.title, artwork.date].filter(Boolean).join(", ")}
      </Text>

      <Spacer y={1} />

      <Button
        size="small"
        variant="secondaryBlack"
        width="100%"
        onClick={() => onClick(artwork)}
      >
        {mode === "add" ? "Add To Collection" : "Remove"}
      </Button>
    </Box>
  )
}
