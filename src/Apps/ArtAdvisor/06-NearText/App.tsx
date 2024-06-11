import { FC, useEffect, useState } from "react"
import {
  Box,
  Image,
  Text,
  Flex,
  Skeleton,
  TextArea,
  Button,
  Spacer,
  Radio,
  RadioGroup,
  Clickable,
} from "@artsy/palette"
import { Rail } from "Components/Rail/Rail"
import { crop } from "Utils/resizer"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import { WeaviateArtworkClass } from "Apps/ArtAdvisor/06-NearText/lib/weaviate"

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [artworkClass, setArtworkClass] = useState<WeaviateArtworkClass>(
    "DiscoveryArtworks"
  )
  const [artworks, setArtworks] = useState<any[]>([])
  const [concepts, setConcepts] = useState<string>("")
  const [conceptList, setConceptList] = useState<string[]>([])

  useEffect(() => {
    async function fetchArtworks(concepts: string[]) {
      setIsLoading(true)
      const params = new URLSearchParams()
      concepts.forEach(concept => {
        params.append("concepts", concept)
      })
      params.append("artworkClass", artworkClass)

      const url = `/api/advisor/6/artworks?${params.toString()}`
      const res = await fetch(url)
      const data = await res.json()
      setIsLoading(false)
      return data
    }

    fetchArtworks(conceptList).then(setArtworks)
  }, [conceptList, artworkClass])

  return (
    <Box py={4}>
      {artworks.length > 0 ? (
        <Rail
          title="Recommended Works"
          getItems={() => {
            return artworks.map(artwork => (
              <Box key={artwork.internalID} opacity={isLoading ? 0.1 : 1}>
                <ArtworkCard artwork={artwork} />
              </Box>
            ))
          }}
        />
      ) : (
        RAIL_PLACEHOLDER
      )}

      <Box py={2}>
        <Text variant={"lg-display"}>Concepts</Text>
        <Spacer y={1} />

        <Text>Enter one or more "user concepts", one concept per line:</Text>
        <Spacer y={1} />

        <TextArea
          placeholder="street art, e.g."
          value={concepts}
          rows={5}
          onChange={({ value }) => setConcepts(value)}
        ></TextArea>
        <Spacer y={1} />

        <Button
          onClick={e => {
            setConceptList((concepts || "").split("\n"))
            console.log("ROOP", concepts, conceptList)
          }}
        >
          Update
        </Button>
      </Box>

      <Spacer y={2} />

      <Box>
        <Text variant={"lg-display"}>Artwork collection</Text>
        <Spacer y={1} />

        <RadioGroup
          defaultValue={"DiscoveryArtworks"}
          onSelect={value => setArtworkClass(value as WeaviateArtworkClass)}
          flexDirection="column"
          gap={1}
        >
          <Radio value="DiscoveryArtworks" label="DiscoveryArtworks" />
          <Radio value="DiscoveryArtworksCV" label="DiscoveryArtworksCV" />
        </RadioGroup>
      </Box>

      {/* <hr />
        <pre>{JSON.stringify(artworks, null, 2)}</pre> */}
    </Box>
  )
}

const ArtworkCard: React.FC<{ artwork: any }> = ({ artwork }) => {
  const { internalID, title, date } = artwork

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
        <Clickable onClick={e => alert(`aye ${internalID}`)}>
          <CheckmarkFillIcon fill={"black60"} size={30} />
        </Clickable>
        <Clickable onClick={e => alert(`nay ${internalID}`)}>
          <CloseFillIcon fill={"black60"} size={30} />
        </Clickable>
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
