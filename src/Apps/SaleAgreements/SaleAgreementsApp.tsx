import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { SaleAgreementsApp_viewer$data } from "__generated__/SaleAgreementsApp_viewer.graphql"
import { SaleAgreementsFilterFragmentContainer } from "Apps/SaleAgreements/Components/SaleAgreementsFilter"
import { TopContextBar } from "Components/TopContextBar"

interface SaleAgreementsAppProps {
  viewer: SaleAgreementsApp_viewer$data
}

const SaleAgreementsApp: FC<SaleAgreementsAppProps> = ({ viewer }) => {
  return (
    <>
      <TopContextBar displayBackArrow href="/conditions-of-sale">
        Artsy's Conditions of Sale
      </TopContextBar>
      <Spacer y={4} />
      <Text variant="xl">Supplemental Conditions of Sale</Text>
      <Spacer y={2} />
      <Text>
        Please note that the any seller’s supplemental conditions of sale that
        are listed below should be read in conjunction to Artsy’s Conditions of
        Sale. To view a seller’s supplemental conditions of sale, please click
        on the arrow next to the name of the sale.
      </Text>
      <Spacer y={4} />
      <SaleAgreementsFilterFragmentContainer viewer={viewer} />
    </>
  )
}

export const SaleAgreementsAppFragmentContainer = createFragmentContainer(
  SaleAgreementsApp,
  {
    viewer: graphql`
      fragment SaleAgreementsApp_viewer on Viewer {
        ...SaleAgreementsFilter_viewer
      }
    `,
  }
)
