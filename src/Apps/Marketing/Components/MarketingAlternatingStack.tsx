import {
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { FC, Fragment } from "react"
import { cropped } from "Utils/resized"

interface Card {
  title: string
  subtitle: string
  src: string
  cta?: {
    label: string
    href: string
  }
}

interface MarketingAlternatingStackProps {
  cards: Card[]
}

export const MarketingAlternatingStack: FC<MarketingAlternatingStackProps> = ({
  cards,
}) => {
  return (
    <>
      <GridColumns gridRowGap={6}>
        {cards.map((card, index) => {
          const order = {
            // Mobile: [[image], [info], [image], [info]]
            // Desktop: [[info, image], [image, info]]
            info: [2 * index + 2, 2 * index + (index % 2 === 0 ? 1 : 2)],
            image: [2 * index + 1, 2 * index + (index % 2 === 0 ? 2 : 1)],
          }

          const image = cropped(card.src, { width: 1000, height: 1000 })

          return (
            <Fragment key={index}>
              <Column
                span={5}
                order={order.info}
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Text variant={["xl", "xl", "xxl", "xxl"]}>{card.title}</Text>

                <Spacer y={[1, 2, 2, 4]} />

                <Text variant={["sm", "sm", "sm", "lg"]}>{card.subtitle}</Text>

                {card.cta && (
                  <>
                    <Spacer y={[1, 2, 2, 4]} />

                    <Box>
                      <Button>{card.cta.label}</Button>
                    </Box>
                  </>
                )}
              </Column>

              <Column span={7} order={order.image}>
                <ResponsiveBox
                  aspectWidth={1}
                  aspectHeight={1}
                  maxWidth="100%"
                  bg="black60"
                >
                  <Image
                    {...image}
                    width="100%"
                    height="100%"
                    style={{ display: "block" }}
                    alt=""
                    lazyLoad
                  />
                </ResponsiveBox>
              </Column>
            </Fragment>
          )
        })}
      </GridColumns>
    </>
  )
}
