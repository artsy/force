import { Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { FullBleedHeaderOverlay } from "Components/FullBleedHeader/FullBleedHeader"
import { FullBleedHeaderFader } from "Components/FullBleedHeader/FullBleedHeaderFader"
import type { FC } from "react"

export const InstitutionPartnershipsHero: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <FullBleedHeaderFader figures={FIGURES}>
      <FullBleedHeaderOverlay zIndex={1}>
        <AppContainer height="100%">
          <HorizontalPadding
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <GridColumns>
              <Column span={[12, 8, 6, 5]}>
                <Text variant={["xl", "xxl"]} as="h1" color="mono0">
                  Artsy for Museums
                </Text>

                <Spacer y={2} />

                <Text variant="sm" color="mono0">
                  Promoting the collections and exhibitions of the Musée du
                  Louvre, J. Paul Getty Museum, Robert Rauschenberg Foundation,
                  and over 700 major museums and institutions worldwide.
                </Text>

                <Spacer y={4} />

                <Button
                  size={["small", "large"]}
                  variant="primaryWhite"
                  // @ts-ignore
                  as="a"
                  target="_blank"
                  href="https://partners.artsy.net/gallery-partnerships"
                >
                  Apply to Join
                </Button>
              </Column>
            </GridColumns>
          </HorizontalPadding>
        </AppContainer>
      </FullBleedHeaderOverlay>
    </FullBleedHeaderFader>
  )
}

const FIGURES = [
  {
    caption:
      "Cour Napoléon et pyramide © 2013 Musée du Louvre / Olivier Ouadah",
    src: "https://files.artsy.net/images/institution-partnerships.jpg",
  },
  {
    caption:
      "Jacques-Louis David: The Farewell of Telemachus and Eucharis, 1818. Getty Trust Content Program",
    src: "https://files.artsy.net/images/institutions-banner-2.jpeg",
  },
  {
    caption:
      "Untitled [Cunningham dancers], 1961 © Robert Rauschenberg Foundation",
    src: "https://files.artsy.net/images/institutions-banner-3.jpeg",
  },
]
