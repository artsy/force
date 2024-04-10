import { Flex, Join, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleAgreementsFilter_viewer$data } from "__generated__/SaleAgreementsFilter_viewer.graphql"
import { extractNodes } from "Utils/extractNodes"
import { SaleAgreementsList } from "Apps/SaleAgreements/Components/SaleAgreementsList"
import { saleAgreementSorter } from "Apps/SaleAgreements/Utils/SaleAgreementSorter"

interface SaleAgreementsFilterProps {
  viewer: SaleAgreementsFilter_viewer$data
}

const SaleAgreementsFilter: FC<SaleAgreementsFilterProps> = ({ viewer }) => {
  const saleAgreements = extractNodes(viewer.saleAgreementsConnection)
  const {
    activeAuctions,
    pastBenefitsAuctions,
    pastArtsyAuctions,
    pastCommercialAuctions,
  } = saleAgreementSorter(saleAgreements)

  return (
    <Tabs fill>
      <Tab name="Current">
        <Join separator={<Spacer y={4} />}>
          {!!activeAuctions.length ? (
            <SaleAgreementsList saleAgreements={activeAuctions} />
          ) : (
            <Flex justifyContent="center" my={4}>
              There are currently no active auctions with conditions of sale
            </Flex>
          )}
        </Join>
      </Tab>
      <Tab name="Past">
        {!!pastArtsyAuctions.length && (
          <Join separator={<Spacer y={2} />}>
            <Text variant="lg">Artsy Auctions</Text>
            <SaleAgreementsList saleAgreements={pastArtsyAuctions} />
          </Join>
        )}
        {!!pastBenefitsAuctions.length && (
          <Join separator={<Spacer y={2} />}>
            <Text variant="lg">Partner Auctions: Benefit</Text>
            <SaleAgreementsList saleAgreements={pastBenefitsAuctions} />
          </Join>
        )}
        {!!pastCommercialAuctions.length && (
          <Join separator={<Spacer y={2} />}>
            <Text variant="lg">Partner Auctions: Commercial</Text>
            <SaleAgreementsList saleAgreements={pastCommercialAuctions} />
          </Join>
        )}
      </Tab>
    </Tabs>
  )
}

export const SaleAgreementsFilterFragmentContainer = createFragmentContainer(
  SaleAgreementsFilter,
  {
    viewer: graphql`
      fragment SaleAgreementsFilter_viewer on Viewer {
        saleAgreementsConnection(first: 100) {
          edges {
            node {
              internalID
              content
              displayStartAt(format: "MMM Do, YYYY")
              displayEndAt(format: "MMM Do, YYYY")
              published
              status
              sale {
                internalID
                name
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
