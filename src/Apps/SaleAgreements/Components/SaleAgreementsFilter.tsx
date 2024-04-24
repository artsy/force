import { Flex, Join, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { SaleAgreementsFilter_viewer$key } from "__generated__/SaleAgreementsFilter_viewer.graphql"
import { extractNodes } from "Utils/extractNodes"
import { SaleAgreementsList } from "Apps/SaleAgreements/Components/SaleAgreementsList"

interface SaleAgreementsFilterProps {
  viewer: SaleAgreementsFilter_viewer$key
}

export const SaleAgreementsFilter: FC<SaleAgreementsFilterProps> = ({
  viewer,
}) => {
  const data = useFragment(saleAgreementsFilterFragment, viewer)
  const saleAgreements = extractNodes(data.saleAgreementsConnection)

  const activeAuctions: typeof saleAgreements = []
  const pastBenefitsAuctions: typeof saleAgreements = []
  const pastArtsyAuctions: typeof saleAgreements = []
  const pastCommercialAuctions: typeof saleAgreements = []

  for (const saleAgreement of saleAgreements) {
    const sale = saleAgreement.sale

    if (saleAgreement.status === "CURRENT") {
      activeAuctions.push(saleAgreement)
    } else if (saleAgreement.status === "PAST" && sale.isBenefit) {
      pastBenefitsAuctions.push(saleAgreement)
    } else if (saleAgreement.status === "PAST" && sale.isArtsyLicensed) {
      pastArtsyAuctions.push(saleAgreement)
    } else if (saleAgreement.status === "PAST" && sale.isAuction) {
      pastCommercialAuctions.push(saleAgreement)
    }
  }

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

const saleAgreementsFilterFragment = graphql`
  fragment SaleAgreementsFilter_viewer on Viewer {
    saleAgreementsConnection(first: 100) {
      edges {
        node {
          internalID
          content
          displayStartAt(format: "MMM Do, YYYY", timezone: "UTC")
          displayEndAt(format: "MMM Do, YYYY", timezone: "UTC")
          published
          status
          sale @required(action: NONE) {
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
`
