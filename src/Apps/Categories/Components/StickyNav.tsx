import { Pill, Spacer, Flex, HorizontalOverflow } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "Apps/Components/AppContainer"
import { extractNodes } from "Utils/extractNodes"
import { StickyNav_geneFamiliesConnection$data } from "__generated__/StickyNav_geneFamiliesConnection.graphql"
import { useJump } from "Utils/Hooks/useJump"

interface StickyNavProps {
  geneFamiliesConnection: StickyNav_geneFamiliesConnection$data
}

const StickyNav: React.FC<StickyNavProps> = ({ geneFamiliesConnection }) => {
  const { jumpTo } = useJump({ offset: 10 })
  const geneFamilies = extractNodes(geneFamiliesConnection)

  const handleClick = (slug: string) => () => {
    jumpTo(slug)
  }

  return (
    // TODO: Simplify layout
    <HorizontalOverflow my={-1} py={1}>
      <AppContainer display="flex">
        <Spacer x={[2, 4]} />

        {geneFamilies.map((geneFamily, i) => {
          return (
            <Flex key={geneFamily.slug} flexDirection="row">
              <Pill onClick={handleClick(geneFamily.slug)}>
                {geneFamily.name}
              </Pill>

              {i !== geneFamilies.length - 1 ? <Spacer x={1} /> : null}
            </Flex>
          )
        })}

        <Spacer x={[2, 4]} />
      </AppContainer>
    </HorizontalOverflow>
  )
}

export const StickyNavFragmentContainer = createFragmentContainer(StickyNav, {
  geneFamiliesConnection: graphql`
    fragment StickyNav_geneFamiliesConnection on GeneFamilyConnection {
      edges {
        node {
          internalID
          slug
          name
        }
      }
    }
  `,
})
