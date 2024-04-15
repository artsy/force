import { FC } from "react"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleAgreementApp_saleAgreement$data } from "__generated__/SaleAgreementApp_saleAgreement.graphql"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { TopContextBar } from "Components/TopContextBar"
import { HttpError } from "found"
import { useFeatureFlag } from "System/useFeatureFlag"

interface SaleAgreementAppProps {
  saleAgreement: SaleAgreementApp_saleAgreement$data
}

const SaleAgreementApp: FC<SaleAgreementAppProps> = ({ saleAgreement }) => {
  const showSupplementalCosPage = useFeatureFlag("sapphire_supplemental-cos")

  if (!showSupplementalCosPage) {
    throw new HttpError(404)
  }

  return (
    <>
      <TopContextBar displayBackArrow href="/supplemental-cos">
        All Supplemental Conditions of Sale
      </TopContextBar>

      <Spacer y={4} />
      <Text variant="xl" as="h1">
        {saleAgreement.sale?.name}
      </Text>

      <Text variant="lg" color="black60">
        {saleAgreement.displayStartAt} - {saleAgreement.displayEndAt}
      </Text>

      <Spacer y={4} />

      <GridColumns>
        <Column span={8} start={3}>
          <PageHTML
            dangerouslySetInnerHTML={{
              // TODO: FIX THIS BEFORE PUSHING TO PROD
              __html: saleAgreement.content || "",
            }}
          />
        </Column>
      </GridColumns>
    </>
  )
}

export const SaleAgreementAppFragmentContainer = createFragmentContainer(
  SaleAgreementApp,
  {
    saleAgreement: graphql`
      fragment SaleAgreementApp_saleAgreement on SaleAgreement {
        internalID
        content(format: HTML)
        displayStartAt(format: "MMM Do, YYYY")
        displayEndAt(format: "MMM Do, YYYY")
        sale {
          internalID
          name
        }
      }
    `,
  }
)
