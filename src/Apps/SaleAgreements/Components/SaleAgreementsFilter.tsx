import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleAgreementsFilter_viewer$data } from "__generated__/SaleAgreementsFilter_viewer.graphql"
import { extractNodes } from "Utils/extractNodes"
import { SaleAgreementsListItem } from "Apps/SaleAgreements/Components/SaleAgreementsListItem"

interface SaleAgreementsFilterProps {
  viewer: SaleAgreementsFilter_viewer$data
}

const SaleAgreementsFilter: FC<SaleAgreementsFilterProps> = ({ viewer }) => {
  const terms = extractNodes(viewer.saleAgreementsConnection)
  const activeTerms: JSX.Element[] = []
  const inactiveBenefits: JSX.Element[] = []
  const inactiveArtsy: JSX.Element[] = []
  const inactiveCommercial: JSX.Element[] = []

  for (const term of terms) {
    if (term.status === "active") {
      activeTerms.push(
        <SaleAgreementsListItem key={term.internalID} term={term} />
      )
    } else if (term.status === "inactive" && term.sale?.isBenefit == true) {
      inactiveBenefits.push(
        <SaleAgreementsListItem key={term.internalID} term={term} />
      )
    } else if (
      term.status === "inactive" &&
      term.sale?.isArtsyLicensed == true
    ) {
      inactiveArtsy.push(
        <SaleAgreementsListItem key={term.internalID} term={term} />
      )
    } else {
      inactiveCommercial.push(
        <SaleAgreementsListItem key={term.internalID} term={term} />
      )
    }
  }

  return (
    <Tabs fill>
      <Tab name="Active">{activeTerms}</Tab>
      <Tab name="Inactive">
        <Text variant="lg">Artsy Auctions</Text>

        <Spacer y={2} />
        {inactiveArtsy}

        <Spacer y={2} />
        <Text variant="lg">Partner Auctions: Benefit</Text>

        <Spacer y={2} />
        {inactiveBenefits}

        <Spacer y={2} />
        <Text variant="lg">Partner Auctions: Commercial</Text>
        {inactiveCommercial}
      </Tab>
    </Tabs>
  )
}

export const SaleAgreementsFilterFragmentContainer = createFragmentContainer(
  SaleAgreementsFilter,
  {
    viewer: graphql`
      fragment SaleAgreementsFilter_viewer on Viewer {
        saleAgreementsConnection(first: 10) {
          edges {
            node {
              internalID
              body
              published
              status
              sale {
                internalID
                name
                startAt(format: "MMM Do, YYYY")
                endedAt(format: "MMM Do, YYYY")
                isArtsyLicensed
                isBenefit
                isAuction
              }
            }
          }
        }
      }
    `,
  }
)
