import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join, Link, Spacer, Text } from "@artsy/palette"
import { SaleAgreementsApp_viewer$data } from "__generated__/SaleAgreementsApp_viewer.graphql"
import { SaleAgreementsFilterFragmentContainer } from "Apps/SaleAgreements/Components/SaleAgreementsFilter"
import { getENV } from "Utils/getENV"

interface SaleAgreementsAppProps {
  viewer: SaleAgreementsApp_viewer$data
}

const SaleAgreementsApp: FC<SaleAgreementsAppProps> = ({ viewer }) => {
  return (
    <Join separator={<Spacer y={6} />}>
      <Text variant="xl">Supplemental Conditions of Sale</Text>
      <Text>
        Please note that any supplemental conditions of sale that are listed
        below should be read in conjunction with{" "}
        <Link href={`${getENV("APP_URL")}/terms`}>
          Artsy’s General Terms and Conditions of Sale
        </Link>
        . To view an auction’s supplemental conditions of sale, please click on
        the auction name.
      </Text>
      <SaleAgreementsFilterFragmentContainer viewer={viewer} />
    </Join>
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
