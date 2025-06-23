import type {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"

export const getInitialPaymentMethodValue = ({
  paymentSet,
  paymentMethod,
}: Payment_order$data): CommercePaymentMethodEnum | undefined =>
  paymentSet ? paymentMethod! : undefined
