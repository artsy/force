import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { Join, Link, Spacer, Text } from "@artsy/palette"
import { SaleAgreementsApp_viewer$key } from "__generated__/SaleAgreementsApp_viewer.graphql"
import { SaleAgreementsFilter } from "Apps/SaleAgreements/Components/SaleAgreementsFilter"
import { getENV } from "Utils/getENV"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { HttpError } from "found"

interface SaleAgreementsAppProps {
  viewer: SaleAgreementsApp_viewer$key
}

export const SaleAgreementsApp: FC<SaleAgreementsAppProps> = ({ viewer }) => {
  const showSupplementalCosPage = useFeatureFlag("sapphire_supplemental-cos")
  const data = useFragment(saleAgreementsAppFragment, viewer)

  if (!showSupplementalCosPage) {
    throw new HttpError(404)
  }

  return (
    <Join separator={<Spacer y={6} />}>
      <Text variant="xl" my={4}>
        Supplemental Conditions of Sale
      </Text>
      <Text>
        Please note that an auction's supplemental conditions of sale listed
        below should be read in conjunction with{" "}
        <Link href={`${getENV("APP_URL")}/terms`}>
          Artsy’s General Terms and Conditions of Sale
        </Link>
        . To view an auction’s supplemental conditions of sale, please click on
        the auction name.
      </Text>
      <SaleAgreementsFilter viewer={data} />
    </Join>
  )
}

const saleAgreementsAppFragment = graphql`
  fragment SaleAgreementsApp_viewer on Viewer {
    ...SaleAgreementsFilter_viewer
  }
`
