import { RouterLink } from "System/Components/RouterLink"
import React from "react"

const SUPPORT_EMAIL = "orders@artsy.net"

export enum ErrorDialogs {
  DestinationCouldNotBeGeocoded = "destination_could_not_be_geocoded",
  CurrencyNotSupported = "currency_not_supported",
}

interface ErrorDialogCopy {
  title: string
  message: string
  formattedMessage: React.ReactNode
}

export const getErrorDialogCopy = (dialog?: ErrorDialogs): ErrorDialogCopy => {
  switch (dialog) {
    case ErrorDialogs.DestinationCouldNotBeGeocoded:
      return destinationCouldNotBeGeocodedErrorDialogCopy()
    case ErrorDialogs.CurrencyNotSupported:
      return currencyNotSupportedErrorDialogCopy()
    default:
      return defaultErrorDialogCopy()
  }
}

const destinationCouldNotBeGeocodedErrorDialogCopy = () => {
  const title = "Cannot calculate shipping"
  const message = `Please confirm that your address details are correct and try again. If the issue continues contact ${SUPPORT_EMAIL}.`

  return errorDialogCopy(title, message)
}

const currencyNotSupportedErrorDialogCopy = () => {
  const title = "Payment declined"
  const message = `This card is not compatible with the currency for this artwork. Please confirm with your card issuer if this currency can be supported, try a different payment method or contact ${SUPPORT_EMAIL}.`

  return errorDialogCopy(title, message)
}

const defaultErrorDialogCopy = () => {
  const title = "An error occurred"
  const message = `Something went wrong. Please try again or contact ${SUPPORT_EMAIL}.`

  return errorDialogCopy(title, message)
}

const errorDialogCopy = (title: string, message: string): ErrorDialogCopy => {
  return {
    title,
    message,
    formattedMessage: <ErrorDialogMessage message={message} />,
  }
}

interface ErrorDialogMessageProps {
  message: string
}

export const ErrorDialogMessage = (props: ErrorDialogMessageProps) => {
  const { message } = props
  const substrings = message.split(SUPPORT_EMAIL)

  // replaces all support emails with mailto links
  const formattedMessage = substrings.map((substring, index) => {
    // prevents a mailto link being added after the last substring
    const isLastSubstring = index === substrings.length - 1

    // prevents an index being added to the link if there is only one instance
    const testidSuffix = substrings.length > 2 ? `-${index}` : ""

    return (
      <React.Fragment key={`msg-${index}`}>
        {substring}
        {!isLastSubstring && (
          <RouterLink
            data-testid={`support-email-link${testidSuffix}`}
            inline
            to={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </RouterLink>
        )}
      </React.Fragment>
    )
  })

  return <div data-testid="formatted-message">{formattedMessage}</div>
}

export const ArtaErrorDialogMessage = () => (
  <>
    There was a problem getting shipping quotes. <br />
    Please contact{" "}
    <RouterLink inline to={`mailto:orders@artsy.net`}>
      orders@artsy.net
    </RouterLink>
    .
  </>
)
