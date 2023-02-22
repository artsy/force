import { AuthIntent, ContextModule, Intent } from "@artsy/cohesion"
import {
  Button,
  Checkbox,
  Input,
  Join,
  Select,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  AuthDialogMode,
  AUTH_DIALOG_MODES,
} from "Components/AuthDialog/AuthDialogContext"
import { useAuthDialog } from "Components/AuthDialog"
import { FC, useState } from "react"
import { Title } from "react-head"
import { merge } from "lodash"

export const DebugAuth: FC = () => {
  const { showAuthDialog } = useAuthDialog()

  const [state, setState] = useState<
    Required<Parameters<typeof showAuthDialog>[0]>
  >({
    mode: "Login",
    options: {},
    analytics: {
      contextModule: ContextModule.header,
    },
  })

  return (
    <>
      <Title>AuthDialog</Title>

      <Spacer y={4} />

      <Join separator={<Spacer y={4} />}>
        <Button
          variant="primaryBlue"
          onClick={() => {
            showAuthDialog(state)
          }}
        >
          Open AuthDialog with options
        </Button>

        <Text as="pre" variant="xs" bg="black5" py={0.5} px={1}>
          {JSON.stringify(state, null, 2)}
        </Text>

        <Select
          title="View"
          selected={state.mode}
          options={AUTH_DIALOG_MODES.map(mode => ({
            value: mode,
            text: mode,
          }))}
          onSelect={(mode: AuthDialogMode) => {
            setState(prevState => ({ ...prevState, mode }))
          }}
        />

        <Input
          title="Title"
          value={
            typeof state.options.title === "function"
              ? state.options.title(state.mode)
              : state.options.title
          }
          placeholder="Copy to display as title"
          onChange={({ target: { value: title } }) => {
            setState(prevState => ({
              ...prevState,
              options: { ...prevState.options, title },
            }))
          }}
        />

        <Input
          title="Redirect to"
          value={state.options.redirectTo}
          placeholder="Pathname to redirect to after authentication"
          onChange={({ target: { value: redirectTo } }) => {
            setState(prevState => ({
              ...prevState,
              options: { ...prevState.options, redirectTo },
            }))
          }}
        />

        <Select
          title="Intent"
          value={state.analytics.intent}
          options={AUTH_INTENTS.map(intent => ({
            value: intent,
            text: intent,
          }))}
          onSelect={(intent: AuthIntent) => {
            setState(prevState =>
              merge({}, prevState, { analytics: { intent } })
            )
          }}
        />

        <Checkbox
          selected={state.options.image}
          onSelect={image =>
            setState(prevState => ({
              ...prevState,
              options: { ...prevState.options, image },
            }))
          }
        >
          Display image panel?
        </Checkbox>
      </Join>
    </>
  )
}

const AUTH_INTENTS: AuthIntent[] = [
  Intent.bid,
  Intent.buyNow,
  Intent.consign,
  Intent.createAlert,
  Intent.followArtist,
  Intent.followGene,
  Intent.followPartner,
  Intent.forgot,
  Intent.inquire,
  Intent.login,
  Intent.seeEstimateAuctionRecords,
  Intent.seePriceAuctionRecords,
  Intent.seeRealizedPriceAuctionRecords,
  Intent.makeOffer,
  Intent.registerToBid,
  Intent.requestConditionReport,
  Intent.saveArtwork,
  Intent.signup,
  Intent.viewAuctionResults,
  Intent.viewArtist,
  Intent.viewEditorial,
  Intent.viewFair,
  Intent.viewViewingRoom,
]
