import { FC } from "react"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleAgreementApp_saleAgreement$data } from "__generated__/SaleAgreementApp_saleAgreement.graphql"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { TopContextBar } from "Components/TopContextBar"

interface SaleAgreementAppProps {
  saleAgreement: SaleAgreementApp_saleAgreement$data
}

const SaleAgreementApp: FC<SaleAgreementAppProps> = ({ saleAgreement }) => {
  return (
    <>
      <TopContextBar displayBackArrow href="/conditions-of-sale/supplemental">
        All Supplemental Conditions of Sale
      </TopContextBar>

      <Spacer y={4} />
      <Text variant="xl" as="h1">
        {saleAgreement.sale?.name}
      </Text>

      <Text variant="lg" color="black60">
        {saleAgreement.sale?.startAt}
      </Text>

      <Spacer y={4} />

      <GridColumns>
        <Column span={8} start={3}>
          <PageHTML dangerouslySetInnerHTML={{ __html: saleAgreement.body! }} />
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
        body(format: HTML)
        sale {
          internalID
          name
          startAt(format: "MMM Do, YYYY")
          endedAt(format: "MMM Do, YYYY")
        }
      }
    `,
  }
)
