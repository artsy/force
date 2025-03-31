import { ExpressCheckoutQueryRenderer } from "Apps/Order/Components/ExpressCheckout"

export const ApplePay = props => {
  console.log("ApplePay.tsx", props)
  // const { match } = useRouter()

  // console.log("ApplePay.tsx", match.params.orderID)

  // return null

  return <ExpressCheckoutQueryRenderer orderID={props.match.params.orderID} />
}
