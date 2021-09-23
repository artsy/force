import {
  Pill,
  Spacer,
  Swiper,
  SwiperCell,
  SwiperRail,
  SwiperCellProps,
  SwiperRailProps,
  Flex,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { extractNodes } from "v2/Utils/extractNodes"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { StickyNav_geneFamiliesConnection } from "v2/__generated__/StickyNav_geneFamiliesConnection.graphql"
interface StickyNavProps {
  geneFamiliesConnection: StickyNav_geneFamiliesConnection
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
    <Swiper Cell={Cell} Rail={Rail}>
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
    </Swiper>
  )
}

const Cell: React.ForwardRefExoticComponent<SwiperCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        verticalAlign="top"
        pr={0}
      />
    )
  }
)

const Rail: React.FC<SwiperRailProps> = props => {
  return (
    // This looks weird considering we wrap this whole component in AppContainer
    // in the parent. It's necessary to get the rail to align with the rest of
    // the content on the page on first load, but then go all the way to
    // the edge of the screen as the user swipes/scrolls
    <AppContainer>
      <SwiperRail {...props} display="block" />
    </AppContainer>
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
