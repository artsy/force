import type * as React from "react"
import { Meta, Title } from "react-head"
import { data as sd } from "sharify"

export const Order3AppMeta: React.FC = () => {
  return (
    <>
      <Title>Order Confirmation | Artsy</Title>
      <Meta property="og:title" content="Order Confirmation" />
      <Meta
        name="description"
        content="Your order has been received and is being processed."
      />
      <Meta
        property="og:description"
        content="Your order has been received and is being processed."
      />
      <Meta
        property="twitter:description"
        content="Your order has been received and is being processed."
      />
      <Meta property="og:url" href={`${sd.APP_URL}/order3`} />
      <Meta property="og:type" href={`${sd.FACEBOOK_APP_NAMESPACE}:order`} />
    </>
  )
}
