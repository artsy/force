import React, { Component } from "react"
import { slugify } from "underscore.string"
import { crop } from "v2/Utils/resizer"
import { Media } from "v2/Utils/Responsive"

import {
  Box,
  EntityHeader,
  Flex,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { Router } from "found"

import styled from "styled-components"

export interface CollectionEntity {
  title: string
  headerImage?: string
  slug: string
}

interface CollectionsGridProps {
  collections: CollectionEntity[]
  name?: string
  router: Router
}

export class CollectionsGrid extends Component<CollectionsGridProps> {
  render() {
    const { collections, name, router } = this.props
    const hasShortRow = collections.length % 3 !== 0 // Preserve left align

    return (
      <Box pb={80}>
        <CollectionsGridAnchor id={name && slugify(name)} />
        <Text variant="mediumText" pb={15}>
          {name}
        </Text>

        <Flex flexWrap="wrap" justifyContent="space-between">
          {[...collections] // needs to create a new array since the sort function modifies the array.
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((collection, index) => {
              const imageUrl =
                collection.headerImage &&
                crop(collection.headerImage, {
                  width: 50,
                  height: 50,
                })

              return (
                <Flex
                  width={["100%", "30%"]}
                  flexDirection="column"
                  key={collection.slug + index}
                >
                  <Media at="xs">{index === 0 && <Separator />}</Media>
                  <Media greaterThan="xs">{index < 3 && <Separator />}</Media>

                  {/* An empty space in initials to generate a blank avatar when there's no imageUrl */}
                  <EntityHeader
                    initials=" "
                    py={2}
                    href={`/collection/${collection.slug}`}
                    imageUrl={imageUrl || undefined}
                    name={collection.title}
                    onClick={event => {
                      event.preventDefault()
                      router.push(`/collection/${collection.slug}`)
                    }}
                  />
                  <Separator />
                </Flex>
              )
            })}

          {hasShortRow && (
            <Media greaterThan="xs">
              {(_, renderChildren) =>
                renderChildren && <Spacer width={["100%", "30%"]} />
              }
            </Media>
          )}
        </Flex>
      </Box>
    )
  }
}

const CollectionsGridAnchor = styled.a`
  display: block;
  position: relative;
  top: -90px;
  visibility: hidden;
`
