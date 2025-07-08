import { Box, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

interface ArtworkData {
  title: string
  href: string
  artistNames: string
  saleMessage?: string
  image: {
    src: string
    width: number
    height: number
  }
}

interface SimpleArtworkCardProps {
  artwork: ArtworkData
}

export const SimpleArtworkCard: React.FC<SimpleArtworkCardProps> = ({
  artwork,
}) => {
  const label = `${artwork.title} by ${artwork.artistNames}`

  return (
    <RouterLink
      to={artwork.href}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      textDecoration="none"
      width={275}
      maxWidth={500}
      overflow="hidden"
      aria-label={label}
    >
      <Box
        height={250}
        display="flex"
        alignItems="flex-end"
        position="relative"
      >
        <Box
          width="100%"
          style={{
            aspectRatio: `${artwork.image.width} / ${artwork.image.height}`,
          }}
          bg="mono10"
        >
          <Image
            src={artwork.image.src}
            width="100%"
            height="100%"
            style={{ display: "block", objectFit: "cover" }}
            alt=""
          />
        </Box>
      </Box>

      <Box mt={1}>
        <Text variant="sm" fontWeight="bold" lineClamp={2}>
          {artwork.title}
        </Text>
        <Text variant="sm" color="mono60" lineClamp={1}>
          {artwork.artistNames}
        </Text>
        {artwork.saleMessage && (
          <Text variant="sm" color="mono100" fontWeight="bold" lineClamp={1}>
            {artwork.saleMessage}
          </Text>
        )}
      </Box>
    </RouterLink>
  )
}
