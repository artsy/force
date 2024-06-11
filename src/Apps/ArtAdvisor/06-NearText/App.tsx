import { FC, useEffect, useState } from "react"
import { Box, Image, Text, Flex, Skeleton } from "@artsy/palette"
import { Rail } from "Components/Rail/Rail"
import { crop } from "Utils/resizer"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"

export const App: FC = () => {
  const [artworks, setArtworks] = useState<any[]>([])

  useEffect(() => {
    async function fetchArtworks() {
      const res = await fetch("/api/advisor/6/artworks")
      const data = await res.json()
      return data
    }

    fetchArtworks().then(setArtworks)
  }, [])

  return (
    <Box py={4}>
      {artworks.length > 0 ? (
        <Rail
          title="Recommended Works"
          getItems={() => {
            return artworks.map(artwork => (
              <ArtworkCard key={artwork.internalID} artwork={artwork} />
            ))
          }}
        />
      ) : (
        RAIL_PLACEHOLDER
      )}

      {/* <hr />
        <pre>{JSON.stringify(artworks, null, 2)}</pre> */}
    </Box>
  )
}

const ArtworkCard: React.FC<{ artwork: any }> = ({ artwork }) => {
  const { title, date } = artwork

  const cropped = crop(artwork.imageUrl, { width: 200, height: 200 })

  return (
    <Box maxWidth={200}>
      <Image
        src={cropped}
        width={200}
        height={200}
        lazyLoad
        style={{ display: "block", objectFit: "cover" }}
        placeHolderURL={undefined}
      />
      <Text py={1} variant="sm-display" color="black60" overflowEllipsis>
        <i>{title}</i>
        {date && `, ${date}`}
      </Text>
      <Flex py={1} gap={1} justifyContent={"center"}>
        <div style={{ cursor: "not-allowed" }}>
          <CheckmarkFillIcon fill={"black60"} size={30} />
        </div>
        <div style={{ cursor: "not-allowed" }}>
          <CloseFillIcon fill={"black60"} size={30} />
        </div>
      </Flex>
    </Box>
  )
}

const RAIL_PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Recommended Works"
      getItems={() => {
        return [...new Array(20)].map((_, i) => {
          return <ArtworkCard key={i} artwork={{ title: " " }} />
        })
      }}
    />
  </Skeleton>
)
