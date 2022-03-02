import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Separator,
  Text,
  useToasts,
} from "@artsy/palette"
import { isEmpty, camelCase, snakeCase } from "lodash"
import { FC } from "react"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import {
  PreferencesApp_viewer,
  SubGroupStatus,
} from "v2/__generated__/PreferencesApp_viewer.graphql"
import { useEditNotificationPreferences } from "./useEditNotificationPreferences"

const NOTIFICATION_FIELDS = {
  recommendedByArtsy: false,
  artWorldInsights: false,
  productUpdates: false,
  guidanceOnCollecting: false,
  customAlerts: false,
}

interface PreferencesAppProps {
  viewer?: PreferencesApp_viewer
}

interface FormValuesForNotificationPreferences {
  recommendedByArtsy: boolean
  artWorldInsights: boolean
  productUpdates: boolean
  guidanceOnCollecting: boolean
  customAlerts: boolean
}

export const PreferencesApp: FC<PreferencesAppProps> = ({ viewer }) => {
  const { sendToast } = useToasts()
  const { submitMutation } = useEditNotificationPreferences()
  let initialValues = getInitialValues(viewer) // Shape the response from Metaphysics for Formik

  return (
    <>
      <Text variant="xl" mt={6} mb={6}>
        Preferences Center
      </Text>
      <Formik<FormValuesForNotificationPreferences>
        // @ts-ignore
        initialValues={{ ...NOTIFICATION_FIELDS, ...initialValues }}
        onSubmit={async (values, actions) => {
          try {
            // TODO: Refactor mutation in Metaphysics so that we don't have to send
            // id, channel, or status (Gravity doesn't care about them)
            const subscriptionGroups = Object.entries(values).map(
              ([key, value]) => {
                return {
                  id: "",
                  name: snakeCase(key),
                  channel: "email",
                  status: (value
                    ? "SUBSCRIBED"
                    : "UNSUBSCRIBED") as SubGroupStatus,
                }
              }
            )

            await submitMutation({
              variables: { input: { subscriptionGroups } },
            })

            actions.resetForm({
              touched: {},
            })

            sendToast({
              variant: "success",
              message: "Preferences updated sucessfully.",
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
                <Text variant="md">Subscribe to all</Text>
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
                <Text variant="md">Recommended By Artsy</Text>
                <Text variant="sm" color="black60">
                  Artworks, shows, fairs, auctions, and collections we think
                  you'll love
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
                <Text variant="md">Art World Insights</Text>
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
                <Text variant="md">Product Updates</Text>
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

              <Column span={10}>
                <Text variant="md">Guidance on Collecting</Text>
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
                <Text variant="md">Custom Alerts</Text>
                <Text variant="sm" color="black60">
                  A round up of updates on your favorite artists, chosen by you
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

              <Column span={12}>
                <Separator my={2} />
              </Column>

              <Column span={10}>
                <Text variant="md">Unsubscribe from all</Text>
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

const getInitialValues = viewer => {
  return viewer?.notificationPreferences
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
      fragment PreferencesApp_viewer on Viewer {
        notificationPreferences {
          id
          name
          channel
          status
        }
      }
    `,
  }
)
