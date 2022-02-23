import { Text } from "@artsy/palette"
import { errorMessageForBidding } from "v2/Apps/Auction2/Components/Form/Utils"
import { useFormContext } from "v2/Apps/Auction2/Hooks/useFormContext"

export const ErrorStatus = () => {
  const { status } = useFormContext()

  if (!status) {
    return null
  }

  const getErrorStatus = (): {
    title: string
    message: string | JSX.Element
  } => {
    const message = errorMessageForBidding(status)

    switch (status) {
      /**
       * In case of bidder not qualified, the user would be redirected back to
       * the sale top page (same behaviour as registration form) and we do not
       * have to display error messages on the form.
       */
      case "BIDDER_NOT_QUALIFIED": {
        return {
          title: "Bidder Not Qualified",
          message,
        }
      }

      case "LIVE_BIDDING_STARTED": {
        return {
          title: "Live Auction in Progress",
          message,
        }
      }
      case "OUTBID": {
        return {
          title: "Outbid",
          message,
        }
      }
      case "RESERVE_NOT_MET": {
        return {
          title: "Reserve Not Met",
          message,
        }
      }
      case "SALE_CLOSED": {
        return {
          title: "Sale Closed",
          message,
        }
      }
      case "ERROR":
      case "SUBMISSION_FAILED":
      default: {
        return {
          title: "Submission Failed",
          message: (
            <>
              Something went wrong. Please try again or contact{" "}
              <a href="mailto:support@artsy.net">support@artsy.net</a>
            </>
          ),
        }
      }
    }
  }

  const { title, message } = getErrorStatus()

  return (
    <>
      {title && <Text variant="md">{title}</Text>}

      <Text variant="xs" color="red100">
        {message}
      </Text>
    </>
  )
}
