import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Separator,
  Text,
  useToasts,
} from "@artsy/palette"
import { isEmpty, camelCase } from "lodash"
import { FC } from "react"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { PreferencesApp_viewer } from "v2/__generated__/PreferencesApp_viewer.graphql"

interface FormValuesForNotificationPreferences {
  recommendedByArtsy: boolean
  artWorldInsights: boolean
  productUpdates: boolean
  guidanceOnCollecting: boolean
  customAlerts: boolean
}

interface PreferencesAppProps {
  viewer?: PreferencesApp_viewer
}

const NOTIFICATION_FIELDS = {
  recommendedByArtsy: false,
  artWorldInsights: false,
  productUpdates: false,
  guidanceOnCollecting: false,
  customAlerts: false,
}

export const PreferencesApp: FC<PreferencesAppProps> = ({ viewer }) => {
  const { sendToast } = useToasts()
  let initialValues = viewer?.notificationPreferences
    .filter(preference =>
      Object.keys(NOTIFICATION_FIELDS).includes(camelCase(preference.name))
    )
    .map(preference => {
      return {
        [camelCase(preference.name)]:
          preference.status === "SUBSCRIBED" ? true : false,
      }
    })

  return (
    <>
      <Text variant="xl" mt={6} mb={6}>
        Preferences Center
      </Text>
      <Formik<FormValuesForNotificationPreferences>
        // @ts-ignore
        initialValues={{ ...NOTIFICATION_FIELDS, ...initialValues }}
        onSubmit={async () => {
          try {
            // Do mutation stuff
            sendToast({
              variant: "success",
              message: "Preferences updated sucessfully.",
            })
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {({ values, setFieldValue, setFieldTouched, touched }) => (
          <Form>
            <GridColumns gridRowGap={4}>
              <Column span={10}>
                <Text variant="md">Subscribe to all</Text>
              </Column>

              <Column span={2}>
                <Checkbox
                  selected={Object.values(values).every(Boolean)}
                  onSelect={value => {
                    if (value) {
                      Object.keys(values).forEach(field => {
                        setFieldValue(field, true)
                        setFieldTouched(field, true)
                      })
                    }
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
                    if (value) {
                      Object.keys(values).forEach(field => {
                        setFieldValue(field, false)
                        setFieldTouched(field, true)
                      })
                    }
                  }}
                >
                  Email
                </Checkbox>
              </Column>

              <Column span={2} start={9} mt={2}>
                <Button
                  width="100%"
                  variant="secondaryOutline"
                  disabled={isEmpty(touched)}
                >
                  Cancel
                </Button>
              </Column>

              <Column span={2} mt={2}>
                <Button width="100%" type="submit" disabled={isEmpty(touched)}>
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
