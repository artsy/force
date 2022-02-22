import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Separator,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { PreferencesApp_viewer } from "v2/__generated__/PreferencesApp_viewer.graphql"

interface FormValuesForNotificationPreferences {
  recommended_by_artsy: boolean
  art_world_insights: boolean
  product_updates: boolean
  guidance_on_collecting: boolean
  custom_alerts: boolean
}

interface PreferencesAppProps {
  viewer?: PreferencesApp_viewer
}

const NOTIFICATION_FIELDS = {
  recommended_by_artsy: false,
  art_world_insights: false,
  product_updates: false,
  guidance_on_collecting: false,
  custom_alerts: false,
}

export const PreferencesApp: FC<PreferencesAppProps> = ({ viewer }) => {
  let initialValues = viewer?.notificationPreferences
    .filter(preference =>
      Object.keys(NOTIFICATION_FIELDS).includes(preference.name)
    )
    .map(preference => {
      return {
        [preference.name]: preference.status === "SUBSCRIBED" ? true : false,
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
        onSubmit={async values => {
          // TODO: Write new values
        }}
      >
        {({ values, setFieldValue }) => (
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
                  selected={values.recommended_by_artsy}
                  onSelect={value => {
                    setFieldValue("recommended_by_artsy", value)
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
                  selected={values.art_world_insights}
                  onSelect={value => {
                    setFieldValue("art_world_insights", value)
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
                  selected={values.product_updates}
                  onSelect={value => {
                    setFieldValue("product_updates", value)
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
                  selected={values.guidance_on_collecting}
                  onSelect={value => {
                    setFieldValue("guidance_on_collecting", value)
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
                  selected={values.custom_alerts}
                  onSelect={value => {
                    setFieldValue("custom_alerts", value)
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
                      })
                    }
                  }}
                >
                  Email
                </Checkbox>
              </Column>

              <Column span={2} start={9} mt={2}>
                <Button width="100%" variant="secondaryOutline">
                  Cancel
                </Button>
              </Column>

              <Column span={2} mt={2}>
                <Button width="100%" type="submit">
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
