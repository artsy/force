import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Column, GridColumns, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { FC } from "react"
import styled from "styled-components"

export const BuyerGuaranteeTableDesktop: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Row>
        <Td span={2}></Td>

        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Vetted Sellers
          </Text>
        </Td>

        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Dedicated Support
          </Text>
        </Td>

        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Authenticity Guarantee
          </Text>
        </Td>

        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Money-Back Guarantee
          </Text>
        </Td>

        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Secure Payment
          </Text>
        </Td>
      </Row>

      <Row>
        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Making an Inquiry
          </Text>
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={2}></Td>

        <Td span={2}></Td>

        <Td span={2}></Td>
      </Row>

      <Row bg="mono0">
        <Td span={2}>
          <Text variant="sm-display" fontWeight="bold">
            Purchasing with Artsy’s Secure Checkout
          </Text>
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={2}>
          <CheckmarkIcon width={40} height={40} />
        </Td>
      </Row>
    </>
  )
}

export const BuyerGuaranteeTableMobile: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Row>
        <Td span={[4]}></Td>

        <Td span={[4]}>
          <Text variant="sm-display" fontWeight="bold">
            Making an Inquiry
          </Text>
        </Td>

        <Td span={[4]} bg="mono0">
          <Text variant="sm-display" fontWeight="bold">
            Purchasing with Artsy’s Secure Checkout
          </Text>
        </Td>
      </Row>

      <Row>
        <Td span={[4]}>
          <Text variant="sm-display" fontWeight="bold">
            Vetted Sellers
          </Text>
        </Td>

        <Td span={[4]}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={[4]} bg="mono0">
          <CheckmarkIcon width={40} height={40} />
        </Td>
      </Row>

      <Row>
        <Td span={[4]}>
          <Text variant="sm-display" fontWeight="bold">
            Dedicated Support
          </Text>
        </Td>

        <Td span={[4]}>
          <CheckmarkIcon width={40} height={40} />
        </Td>

        <Td span={[4]} bg="mono0">
          <CheckmarkIcon width={40} height={40} />
        </Td>
      </Row>

      <Row>
        <Td span={[4]}>
          <Text variant="sm-display" fontWeight="bold">
            Authenticity Guarantee
          </Text>
        </Td>

        <Td span={[4]}></Td>

        <Td span={[4]} bg="mono0">
          <CheckmarkIcon width={40} height={40} />
        </Td>
      </Row>

      <Row>
        <Td span={[4]}>
          <Text variant="sm-display" fontWeight="bold">
            Money-Back Guarantee
          </Text>
        </Td>

        <Td span={[4]}></Td>

        <Td span={[4]} bg="mono0">
          <CheckmarkIcon width={40} height={40} />
        </Td>
      </Row>

      <Row>
        <Td span={[4]}>
          <Text variant="sm-display" fontWeight="bold">
            Secure Payment
          </Text>
        </Td>

        <Td span={[4]}></Td>

        <Td span={[4]} bg="mono0">
          <CheckmarkIcon width={40} height={40} />
        </Td>
      </Row>
    </>
  )
}

const Td = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${themeGet("space.2")} ${themeGet("space.1")};
  border-right: 1px solid ${themeGet("colors.mono100")};

  &:last-of-type {
    border-right: 0;
  }
`

const Row = styled(GridColumns)`
  border-bottom: 1px solid ${themeGet("colors.mono100")};

  &:last-of-type {
    border-bottom: 0;
  }
`

Row.defaultProps = {
  gridRowGap: 0,
  gridColumnGap: 0,
}
