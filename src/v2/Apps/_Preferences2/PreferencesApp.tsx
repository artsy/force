import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Separator,
  Text,
} from "@artsy/palette"
import { Formik } from "formik"

export const PreferencesApp: React.FC = () => {
  return (
    <>
      <Text variant="xl" mt={6} mb={6}>
        Preferences Center
      </Text>

      <Formik
        initialValues={{
          first: false,
          second: false,
          third: false,
          fourth: false,
          fifth: false,
        }}
        onSubmit={values => {
          console.log(values)
        }}
      >
        {({ values, setFieldValue }) => {
          return (
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
                  selected={values.first}
                  onSelect={value => {
                    setFieldValue("first", value)
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
                  selected={values.second}
                  onSelect={value => {
                    setFieldValue("second", value)
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
                  selected={values.third}
                  onSelect={value => {
                    setFieldValue("third", value)
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
                  selected={values.fourth}
                  onSelect={value => {
                    setFieldValue("fourth", value)
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
                  selected={values.fifth}
                  onSelect={value => {
                    setFieldValue("fifth", value)
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
                  selected={Object.values(values).every(v => !v)}
                  onSelect={value => {
                    Object.keys(values).forEach(field => {
                      setFieldValue(field, !value)
                    })
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
                <Button width="100%">Save</Button>
              </Column>
            </GridColumns>
          )
        }}
      </Formik>
    </>
  )
}
