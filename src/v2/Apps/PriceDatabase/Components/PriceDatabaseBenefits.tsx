import {
  Column,
  GridColumns,
  Text,
  Image,
  Separator,
  Flex,
  ResponsiveBox,
} from "@artsy/palette"
import React, { ReactElement } from "react"
import { Media } from "v2/Utils/Responsive"

export const PriceDatabaseBenefits: React.FC = () => {
  return (
    <Flex py={[1, 4]} flexDirection="column">
      <GridColumns mt={4} gridRowGap={[2, 0]}>
        <Column span={12}>
          <Text as="h1" variant="xl">
            The Benefits of the
            <br />
            Artsy Price Database
          </Text>
        </Column>
      </GridColumns>

      <Section
        title="340,000 Artists"
        text="From well-known to niche auction houses, find sale results from your favourite artists."
        Image={<SectionImage src="" srcSet="" alt="" />} // TODO: replace with image
      />

      <Separator />

      <Section
        title="1 Database"
        text="Quickly and easily find Design, Fine and Decorative Art results all in one place."
        Image={<SectionImage src="" srcSet="" alt="" />} // TODO: replace with image
        imagePosition="right"
      />

      <Separator />

      <Section
        title="Search for Free"
        text="No search limits, no results limits, no subscriptions, and no obligations."
        Image={<SectionImage src="" srcSet="" alt="" />} // TODO: replace with image
      />
    </Flex>
  )
}

const Section: React.FC<{
  title: string
  text: string
  Image: ReactElement
  imagePosition?: "left" | "right"
}> = ({ title, text, Image, imagePosition = "left" }) => {
  return (
    <>
      <Media lessThan="sm">
        <GridColumns my={4} gridRowGap={[2, 0]}>
          <Column span={6}>{Image}</Column>
          <Column span={6}>
            <Text as="h1" variant="xl">
              {title}
            </Text>
            <Text variant="sm">{text}</Text>
          </Column>
        </GridColumns>
      </Media>
      <Media greaterThan="sm">
        <GridColumns my={4} gridRowGap={[2, 0]}>
          {imagePosition === "left" && <Column span={6}>{Image}</Column>}
          <Column span={6}>
            <Text as="h1" variant="xl">
              {title}
            </Text>
            <Text variant="sm">{text}</Text>
          </Column>
          {imagePosition === "right" && <Column span={6}>{Image}</Column>}
        </GridColumns>
      </Media>
    </>
  )
}

const SectionImage: React.FC<{ src: string; srcSet: string; alt: string }> = ({
  src,
  srcSet,
  alt,
}) => {
  return (
    <ResponsiveBox
      aspectWidth={800}
      aspectHeight={660}
      maxWidth={800}
      maxHeight={660}
    >
      <Image width="100%" height="100%" src={src} srcSet={srcSet} alt={alt} />
    </ResponsiveBox>
  )
}
