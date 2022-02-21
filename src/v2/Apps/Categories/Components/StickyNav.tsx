import { Pill, Spacer, Flex, HorizontalOverflow } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { extractNodes } from "v2/Utils/extractNodes"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { StickyNav_geneFamiliesConnection$data } from "v2/__generated__/StickyNav_geneFamiliesConnection.graphql"
interface StickyNavProps {
  geneFamiliesConnection: StickyNav_geneFamiliesConnection$data
  navBarHeight: number
}

const StickyNav: React.FC<StickyNavProps> = props => {
  const { geneFamiliesConnection, navBarHeight } = props

  const geneFamilies = extractNodes(geneFamiliesConnection)

  const stickyNavHeight = 50
  const scrollOffset = navBarHeight + stickyNavHeight + 20

  const handleClick = e => {
    e.preventDefault()
    const id = e.currentTarget.hash

    scrollIntoView({ selector: id, offset: scrollOffset, behavior: "smooth" })
  }

  return (
    <HorizontalOverflow my={-1} py={1}>
      {/* This AppContainer looks weird considering we wrap StickyNav in an
      AppConainer in the parent. It's necessary to get the rail to align with 
      the rest of the content on the page on first load, but then go all the 
      way to the edge of the screen as the user swipes/scrolls */}
      <AppContainer display="flex">
        <Spacer pr={[2, 4]} />
        {geneFamilies.map((geneFamily, i) => {
          return (
            <Flex key={geneFamily.slug} flexDirection="row">
              <a href={`#jump--${geneFamily.slug}`} onClick={handleClick}>
                <Pill variant="filter">{geneFamily.name}</Pill>
              </a>
              {i !== geneFamilies.length - 1 ? <Spacer pr={1} /> : null}
            </Flex>
          )
        })}
        <Spacer pr={[2, 4]} />
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
