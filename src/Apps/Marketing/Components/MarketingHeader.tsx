import {
  Column,
  FullBleed,
  GridColumns,
  Image,
  Spacer,
  Text,
} from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useFullBleedHeaderHeight } from "Components/FullBleedHeader/FullBleedHeader"
import { Media } from "Utils/Responsive"
import { cropped } from "Utils/resized"
import { FC } from "react"

interface MarketingHeaderProps {
  title: string
  subtitle: string
  src: string
  accentColor: string
}

export const MarketingHeader: FC<MarketingHeaderProps> = ({
  title,
  subtitle,
  src,
  accentColor,
}) => {
  const height = useFullBleedHeaderHeight()

  const images = {
    desktop: cropped(src, { width: 1000, height: 1000 }),
    mobile: cropped(src, { width: 400, height: 400 }),
  }

  return (
    <>
      <Media greaterThan="xs">
        <FullBleed>
          <GridColumns
            // Matches homepage hero units
            height={[300, 400, 500]}
            overflow="hidden"
            bg="black5"
          >
            <Column
              span={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              px={4}
              py={[2, 2, 4]}
            >
              <Text variant={["xl", "xl", "xxl", "xxl"]}>{title}</Text>

              <Spacer y={[1, 2, 2, 4]} />

              <Text variant="lg">{subtitle}</Text>
            </Column>

            <Column span={7} bg={accentColor} overflow="hidden">
              <Image
                {...images.desktop}
                width="100%"
                height="100%"
                style={{ display: "block", objectFit: "cover" }}
                alt=""
              />
            </Column>
          </GridColumns>
        </FullBleed>
      </Media>

      <Media at="xs">
        <FullBleed height={height} bg={accentColor}>
          <Image
            {...images.mobile}
            width="100%"
            height="100%"
            style={{ display: "block", objectFit: "cover" }}
            alt=""
          />
        </FullBleed>

        <FullBleed bg="black10">
          <HorizontalPadding py={6}>
            <Text variant="xl">{title}</Text>

            <Spacer y={0.5} />

            <Text variant="sm">{subtitle}</Text>
          </HorizontalPadding>
        </FullBleed>
      </Media>
    </>
  )
}
