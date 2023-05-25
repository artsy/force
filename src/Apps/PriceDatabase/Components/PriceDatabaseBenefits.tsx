import {
  Column,
  GridColumns,
  Text,
  Image,
  Separator,
  Flex,
  ResponsiveBox,
  Box,
  Spacer,
} from "@artsy/palette"
import { ReactElement } from "react"
import * as React from "react"
import { Media } from "Utils/Responsive"

export const PriceDatabaseBenefits: React.FC = () => {
  return (
    <Flex flexDirection="column">
      <GridColumns gridRowGap={[2, 0]}>
        <Column span={12}>
          <Text as="h1" variant={["xl", "xxl"]}>
            Auction records from 300,000
            <br />
            artists—and counting
          </Text>
        </Column>
      </GridColumns>

      <Section
        title="Get in-depth art market data"
        text="Browse millions of current and historical results from leading auction houses across the globe."
        jsx={<PopularArtistsList />}
      />

      <Separator />

      <Section
        title="Research and validate prices"
        text="Access the data you need to make the right decisions for your collection, whether you’re researching, buying, or selling."
        jsx={
          <SectionImage
            src="https://d7hftxdivxxvm.cloudfront.net?height=660&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fkehinde_wiley_portrait_of_nelly_moudime_ii.png&width=800"
            srcSet="https://d7hftxdivxxvm.cloudfront.net?height=660&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fkehinde_wiley_portrait_of_nelly_moudime_ii.png&width=800 1x, https://d7hftxdivxxvm.cloudfront.net?height=1320&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fkehinde_wiley_portrait_of_nelly_moudime_ii.png&width=1600 2x"
            alt="Kehinde Wiley, ‘Portrait of Nelly Moudime II’, 2020"
            artistName="Kehinde Wiley"
            artworkName="Portrait of Nelly Moudime II, 2020"
            artworkCopyright="Courtesy of Stephen Friedman Gallery."
          />
        }
        jsxPosition="right"
      />

      <Separator />

      <Section
        title="Search for free"
        text="The Artsy Price Database is for every collector—with no search limits, no subscriptions, and no obligations. A more open art world starts here."
        jsx={
          <SectionImage
            src="https://d7hftxdivxxvm.cloudfront.net?height=660&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fdamien_hirst_kindness.jpg&width=800"
            srcSet="https://d7hftxdivxxvm.cloudfront.net?height=660&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fdamien_hirst_kindness.jpg&width=800 1x, https://d7hftxdivxxvm.cloudfront.net?height=1320&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fdamien_hirst_kindness.jpg&width=1600 2x"
            alt="Damien Hirst, ‘Kindness’, 2011"
            artistName="Damien Hirst"
            artworkName="Kindness, 2011"
            artworkCopyright="© Damien Hirst and Science Ltd. All rights reserved/DACS, London/ARS, NY."
          />
        }
      />

      <Separator />

      <Section
        title="Track artists and their markets"
        text={`Get insight into artists you follow with a personalized feed in the Artsy app, powered by the Artsy Price Database. \n Available now on iOS and Android.`}
        jsx={
          <SectionImage
            src="https://d7hftxdivxxvm.cloudfront.net?height=660&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fmatthew_wong_morning.jpg&width=800"
            srcSet="https://d7hftxdivxxvm.cloudfront.net?height=660&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fmatthew_wong_morning.jpg&width=800 1x, https://d7hftxdivxxvm.cloudfront.net?height=1320&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fmatthew_wong_morning.jpg&width=1600 2x"
            alt="Matthew Wong, ‘Morning Landscape’, 2017"
            artistName="Matthew Wong"
            artworkName="Morning Landscape, 2017"
            artworkCopyright="© Artist Rights Society (ARS), New York."
          />
        }
        jsxPosition="right"
      />
    </Flex>
  )
}

const Section: React.FC<{
  title: string
  text: string
  jsx: ReactElement
  jsxPosition?: "left" | "right"
}> = ({ title, text, jsx, jsxPosition = "left" }) => {
  return (
    <>
      <Media lessThan="md">
        {jsxPosition === "left" && (
          <>
            <Spacer y={4} />
            {jsx}
          </>
        )}
        <Spacer y={2} />
        <Text as="h1" variant="lg-display" mt={2}>
          {title}
        </Text>
        <Flex mb={1} />
        <Text variant="sm">{text}</Text>
        {jsxPosition === "right" && (
          <>
            <Spacer y={2} />
            {jsx}
          </>
        )}
        <Spacer y={4} />
      </Media>
      <Media greaterThanOrEqual="md">
        <GridColumns my={4} gridRowGap={[2, 0]}>
          {jsxPosition === "left" && <Column span={6}>{jsx}</Column>}
          <Column span={6}>
            <Text as="h2" variant="xl">
              {title}
            </Text>
            <Text variant="sm" mt={1}>
              {text}
            </Text>
          </Column>
          {jsxPosition === "right" && <Column span={6}>{jsx}</Column>}
        </GridColumns>
      </Media>
    </>
  )
}

const SectionImage: React.FC<{
  src: string
  srcSet: string
  alt: string
  artistName?: string
  artworkName?: string
  artworkCopyright?: string
}> = ({ src, srcSet, alt, artistName, artworkName, artworkCopyright }) => {
  return (
    <ResponsiveBox
      aspectWidth={800}
      aspectHeight={660}
      maxWidth={800}
      maxHeight={660}
      mb={artistName ? 2 : 0}
    >
      <Image
        width="100%"
        height="100%"
        src={src}
        srcSet={srcSet}
        alt={alt}
        style={{ objectFit: "cover", alignSelf: "center" }}
      />
      {!!artistName && (
        <Text variant="xs" color="black60">
          {artistName}, <i>{artworkName}</i>. {artworkCopyright}
        </Text>
      )}
    </ResponsiveBox>
  )
}

const PopularArtistsList = () => (
  <GridColumns>
    {POPULAR_ARTISTS.map((popularArtist, index) => (
      <Column span={[6, 6, 4]} key={`popular-artist-${index}`}>
        <PopularArtistTile {...popularArtist} />
      </Column>
    ))}
  </GridColumns>
)

type PopularArtist = {
  artistBirthday: string
  artistName: string
  artistNationality: string
  artistThumbnail: string
}

const PopularArtistTile = ({
  artistBirthday,
  artistName,
  artistNationality,
  artistThumbnail,
}: PopularArtist) => (
  <Flex minHeight={70}>
    <Flex height={60} width={64} alignItems="flex-start" mr={1}>
      <Image
        maxHeight="100%"
        width={64}
        src={artistThumbnail}
        alt={artistName}
        style={{ objectFit: "contain" }}
      />
    </Flex>
    <Box>
      <Text variant="xs">{artistName}</Text>
      <Text variant="xs" color="black60">
        {artistNationality}, {artistBirthday}
      </Text>
    </Box>
  </Flex>
)

const POPULAR_ARTISTS: PopularArtist[] = [
  {
    artistName: "Banksy",
    artistNationality: "British",
    artistBirthday: "b. 1973",
    artistThumbnail: "https://files.artsy.net/images/banksy.png",
  },
  {
    artistName: "David Shrigley",
    artistNationality: "British",
    artistBirthday: "b. 1968",
    artistThumbnail: "https://files.artsy.net/images/david_shrigley.png",
  },
  {
    artistName: "KAWS",
    artistNationality: "American",
    artistBirthday: "b. 1974",
    artistThumbnail: "https://files.artsy.net/images/kaws.png",
  },
  {
    artistName: "Eddie Martinez",
    artistNationality: "American",
    artistBirthday: "b. 1977",
    artistThumbnail: "https://files.artsy.net/images/eddie_martinez.png",
  },
  {
    artistName: "Salman Toor",
    artistNationality: "Pakistani",
    artistBirthday: "b. 1983",
    artistThumbnail: "https://files.artsy.net/images/salman_toor.png",
  },
  {
    artistName: "Wolfgang Tillmans",
    artistNationality: "German",
    artistBirthday: "b. 1968",
    artistThumbnail: "https://files.artsy.net/images/wolfgang_tillmans.png",
  },
  {
    artistName: "David Hockney",
    artistNationality: "British",
    artistBirthday: "b. 1968",
    artistThumbnail: "https://files.artsy.net/images/david_hockney.png",
  },
  {
    artistName: "Cindy Sherman",
    artistNationality: "American",
    artistBirthday: "b. 1968",
    artistThumbnail: "https://files.artsy.net/images/cindy_sherman.png",
  },
  {
    artistName: "Sterling Ruby",
    artistNationality: "American",
    artistBirthday: "b. 1968",
    artistThumbnail: "https://files.artsy.net/images/sterling_ruby.png",
  },
  {
    artistName: "Kehinde Wiley",
    artistNationality: "American",
    artistBirthday: "b. 1977",
    artistThumbnail: "https://files.artsy.net/images/kehinde_wiley.png",
  },
  {
    artistName: "Takashi Murakami",
    artistNationality: "Japanese",
    artistBirthday: "b. 1962",
    artistThumbnail: "https://files.artsy.net/images/takashi_murakami.png",
  },
  {
    artistName: "Erik Parker",
    artistNationality: "German",
    artistBirthday: "b. 1968",
    artistThumbnail: "https://files.artsy.net/images/erik_parker.png",
  },
  {
    artistName: "Joan Miró",
    artistNationality: "Spanish",
    artistBirthday: "1893-1983",
    artistThumbnail: "https://files.artsy.net/images/joan_miro.png",
  },
  {
    artistName: "Oh de Laval",
    artistNationality: "Polish",
    artistBirthday: "b. 1990",
    artistThumbnail: "https://files.artsy.net/images/oh_de_laval.png",
  },
  {
    artistName: "Ghada Amer",
    artistNationality: "Egyptian",
    artistBirthday: "b. 1963",
    artistThumbnail: "https://files.artsy.net/images/ghada_amer.png",
  },
]
