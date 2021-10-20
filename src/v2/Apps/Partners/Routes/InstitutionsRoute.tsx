import {
  AutocompleteInput,
  Button,
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { compact } from "lodash"
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { InstitutionsRoute_viewer } from "v2/__generated__/InstitutionsRoute_viewer.graphql"
import { PartnersRailFragmentContainer } from "../Components/PartnersRail"

interface InstitutionsRouteProps {
  viewer: InstitutionsRoute_viewer
}

const InstitutionsRoute: React.FC<InstitutionsRouteProps> = ({ viewer }) => {
  // TODO: In the original implementation these categories are shuffled.
  // We need a way to do SSR-stable shuffle.
  const categories = compact(viewer.partnerCategories)

  return (
    <>
      <MetaTags
        title="Institutions | Artsy"
        description="Artsy promotes the collections, shows, and programs of the Louvre, Getty Museum, Robert Rauschenberg Foundation, and 600+ other museums and institutions worldwide."
      />

      <Join separator={<Spacer mt={4} />}>
        <Text variant="xl" mt={4}>
          Browse Institutions
        </Text>

        <GridColumns>
          <Column span={4}>
            <AutocompleteInput
              options={[]}
              placeholder="All Locations"
              mb={2}
              onChange={() => {
                // TODO
              }}
              value=""
            />
          </Column>

          <Column span={4}>
            <AutocompleteInput
              options={[]}
              placeholder="All Specialties"
              mb={2}
              onChange={() => {
                // TODO
              }}
              value=""
            />
          </Column>

          <Column span={4}>
            <AutocompleteInput
              options={[]}
              placeholder="All Institutions"
              mb={2}
              onChange={() => {
                // TODO
              }}
              value=""
            />
          </Column>
        </GridColumns>

        {categories.map((partnerCategory, i) => {
          return (
            <PartnersRailFragmentContainer
              key={i}
              partnerCategory={partnerCategory}
            />
          )
        })}

        <Separator />

        <GridColumns>
          <Column span={6} start={4} textAlign="center">
            <Text variant="lg" mb={2}>
              Interested in Listing Your Museum on Artsy?
            </Text>

            <Button
              variant="secondaryOutline"
              // @ts-ignore
              as="a"
              href="https://partners.artsy.net/"
            >
              Learn more
            </Button>
          </Column>
        </GridColumns>
      </Join>
    </>
  )
}

export const InstitutionsRouteFragmentContainer = createFragmentContainer(
  InstitutionsRoute,
  {
    viewer: graphql`
      fragment InstitutionsRoute_viewer on Viewer {
        partnerCategories(
          categoryType: INSTITUTION
          size: 50
          internal: false
        ) {
          name
          slug
          ...PartnersRail_partnerCategory @arguments(type: INSTITUTION)
        }
      }
    `,
  }
)
