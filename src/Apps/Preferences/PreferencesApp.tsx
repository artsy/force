import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Message,
  Separator,
  Text,
  useToasts,
} from "@artsy/palette"
import { isEmpty, camelCase, snakeCase } from "lodash"
import { FC } from "react"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import {
  PreferencesApp_viewer$data,
  SubGroupStatus,
} from "__generated__/PreferencesApp_viewer.graphql"
import { useEditNotificationPreferences } from "./useEditNotificationPreferences"
import { useRouter } from "System/Hooks/useRouter"
import { MetaTags } from "Components/MetaTags"

export const parseTokenFromRouter = (router): string => {
  const tokenFromQuery =
    router.match?.location?.query?.authentication_token || ""
  return tokenFromQuery.split("?")[0]
}
const NOTIFICATION_FIELDS = {
  recommendedByArtsy: false,
  artWorldInsights: false,
  productUpdates: false,
  guidanceOnCollecting: false,
  customAlerts: false,
  partnerOffersOnSaves: false,
}

interface PreferencesAppProps {
  viewer?: PreferencesApp_viewer$data
}

interface FormValuesForNotificationPreferences {
  recommendedByArtsy: boolean
  artWorldInsights: boolean
  productUpdates: boolean
  guidanceOnCollecting: boolean
  customAlerts: boolean
  partnerOffersOnSaves: boolean
}

export const PreferencesApp: FC<PreferencesAppProps> = ({ viewer }) => {
  const router = useRouter()
  const authenticationToken = parseTokenFromRouter(router)
  const { sendToast } = useToasts()
  const { submitMutation } = useEditNotificationPreferences()
  const initialPreferences = viewer?.notificationPreferences
  const initialValues =
    initialPreferences && getInitialValues(initialPreferences)

  if (!initialPreferences) {
    return (
      <>
        <Text variant={["lg-display", "xl"]} mt={6} mb={6}>
          Email Preference Center
        </Text>

        <Message variant="error" my={4}>
          Please sign in to update your email preferences
        </Message>
      </>
    )
  }

  return (
    <>
      <MetaTags title="Preferences | Artsy" pathname="/unsubscribe" />
      <Text variant={["lg-display", "xl"]} mt={6} mb={6}>
        Email Preference Center
      </Text>
      <Formik<FormValuesForNotificationPreferences>
        initialValues={{ ...NOTIFICATION_FIELDS, ...initialValues }}
        onSubmit={async (values, actions) => {
          try {
            const subscriptionGroups = Object.entries(values).map(
              ([key, value]) => {
                return {
                  name: snakeCase(key),
                  status: (value
                    ? "SUBSCRIBED"
                    : "UNSUBSCRIBED") as SubGroupStatus,
                }
              }
            )

            await submitMutation({
              variables: { input: { authenticationToken, subscriptionGroups } },
            })

            actions.setTouched({})

            sendToast({
              variant: "success",
              message: "Preferences updated successfully.",
            })
          } catch (error) {
            console.error(error)

            sendToast({
              variant: "error",
              message: "Something went wrong.",
              description: (Array.isArray(error) ? error[0] : error).message,
            })
          }
        }}
      >
        {({
          values,
          isSubmitting,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form>
            <GridColumns gridRowGap={4}>
              <Column span={10}>
                <Text variant="sm-display">Subscribe to all</Text>
                <Text variant="sm" color="black60">
                  Get all of Artsy’s emails, including recommendations for you,
                  Artsy Editorial, guidance on collecting, and updates on your
                  favorite artists
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={Object.values(values).every(Boolean)}
                  onSelect={value => {
                    Object.keys(values).forEach(field => {
                      setFieldValue(field, value)
                      setFieldTouched(field, value)
                    })
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={12}>
                <Separator />
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Recommended for You</Text>
                <Text variant="sm" color="black60">
                  Artworks, shows, fairs, auctions, and collections we think
                  you’ll love
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={values.recommendedByArtsy}
                  onSelect={value => {
                    setFieldValue("recommendedByArtsy", value)
                    setFieldTouched("recommendedByArtsy", true)
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Editorial</Text>
                <Text variant="sm" color="black60">
                  Market stories, artist profiles, exhibition reviews, and more
                  art world insights
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={values.artWorldInsights}
                  onSelect={value => {
                    setFieldValue("artWorldInsights", value)
                    setFieldTouched("artWorldInsights", true)
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Guidance on Collecting</Text>
                <Text variant="sm" color="black60">
                  Expert advice on buying and selling art, directly from an
                  Artsy specialist
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={values.guidanceOnCollecting}
                  onSelect={value => {
                    setFieldValue("guidanceOnCollecting", value)
                    setFieldTouched("guidanceOnCollecting", true)
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Custom Alerts</Text>
                <Text variant="sm" color="black60">
                  A roundup of updates on your favorite artists, chosen by you
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={values.customAlerts}
                  onSelect={value => {
                    setFieldValue("customAlerts", value)
                    setFieldTouched("customAlerts", true)
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Offers on Saved Artworks</Text>
                <Text variant="sm" color="black60">
                  Offers from galleries on artworks you saved
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={values.partnerOffersOnSaves}
                  onSelect={value => {
                    setFieldValue("partnerOffersOnSaves", value)
                    setFieldTouched("partnerOffersOnSaves", true)
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Product Updates</Text>
                <Text variant="sm" color="black60">
                  Announcements of new features on Artsy.net and the mobile app
                </Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={values.productUpdates}
                  onSelect={value => {
                    setFieldValue("productUpdates", value)
                    setFieldTouched("productUpdates", true)
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={12}>
                <Separator my={2} />
              </Column>
              <Column span={10}>
                <Text variant="sm-display">Unsubscribe from all</Text>
              </Column>
              <Column span={2}>
                <Checkbox
                  selected={!Object.values(values).some(Boolean)}
                  onSelect={value => {
                    Object.keys(values).forEach(field => {
                      setFieldValue(field, !value)
                      setFieldTouched(field, !value)
                    })
                  }}
                >
                  Email
                </Checkbox>
              </Column>
              <Column span={2} start={10} mt={2}>
                <Button
                  width="100%"
                  type="submit"
                  loading={isSubmitting}
                  disabled={isEmpty(touched) || isSubmitting}
                >
                  Save
                </Button>
              </Column>
            </GridColumns>
          </Form>
        )}
      </Formik>
    </>
  )
}

const getInitialValues = initialPreferences => {
  return initialPreferences
    .filter(preference =>
      Object.keys(NOTIFICATION_FIELDS).includes(camelCase(preference.name))
    )
    .reduce((object, preference) => {
      object[camelCase(preference.name)] =
        preference.status === "SUBSCRIBED" ? true : false
      return object
    }, {})
}

export const PreferencesAppFragmentContainer = createFragmentContainer(
  PreferencesApp,
  {
    viewer: graphql`
      fragment PreferencesApp_viewer on Viewer
        @argumentDefinitions(authenticationToken: { type: "String" }) {
        notificationPreferences(authenticationToken: $authenticationToken) {
          name
          status
        }
      }
    `,
  }
)
