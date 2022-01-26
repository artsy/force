import {
  Box,
  Button,
  Checkbox,
  Column,
  Flex,
  GridColumns,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { Formik } from "formik"

export const PreferencesApp: React.FC = () => {
  return (
    <>
      <Text variant="xl" mt={4} mb={12}>
        Preferences Center
      </Text>

      <Separator mt={2} />

      <GridColumns>
          <Column
            span={10}
            mt={2}
          >
            <Flex p={2}>
              <Box>
                <Text variant="md">Recommended By Artsy</Text>
                <Text variant="sm" color="black60">
                  Artworks, shows, fairs, auctions, and collections we think you'll
                  love
                </Text>
              </Box>
            </Flex>

            <Flex p={2}>
              <Box>
                <Text variant="md">Art World Insights</Text>
                <Text variant="sm" color="black60">
                  Market stories, artist profiles, exhibition reviews, and more art
                  world insights
                </Text>
              </Box>
            </Flex>

            <Flex p={2}>
              <Box>
                <Text variant="md">Product Updates</Text>
                <Text variant="sm" color="black60">
                  Announcements of new features on Artsy.net and the mobile app
                </Text>
              </Box>
            </Flex>

            <Flex p={2}>
              <Box>
                <Text variant="md">Guidance on Collecting</Text>
                <Text variant="sm" color="black60">
                  Expert advice on buying and selling art, directly from an Artsy
                  specialist
                </Text>
              </Box>
            </Flex>

            <Flex p={2}>
              <Box>
                <Text variant="md">Custom Alerts</Text>
                <Text variant="sm" color="black60">
                  A round up of updates on your favorite artists, chosen by you
                </Text>
              </Box>
            </Flex>

            <Separator mt={2}/>

            <Flex pt={6} pl={2}>
              <Text variant="md">Unsubscribe from all</Text>
            </Flex>
          </Column>

          <Column
            span={2}
            mt={4}
          >
            <Formik
              initialValues={{
                first: false,
                second: false,
                third: false,
                fourth: false,
                fifth: false
              }}
              onSubmit={values => {
                console.log(values)
              }}
            >
              {({ values, setFieldValue }) => {
                return (
                  <>
                    <Flex 
                      pl={2}
                      pt={2}
                    >
                      <Checkbox
                        selected={values.first}
                        onSelect={value => {
                          setFieldValue("first", value)
                        }}
                      >
                        Email
                      </Checkbox>
                    </Flex>
                    
                    <Flex
                      pl={2}
                      pt={6}
                    >
                      <Checkbox
                        selected={values.second}
                        onSelect={value => {
                          setFieldValue("second", value)
                        }}
                      >
                        Email
                      </Checkbox>
                    </Flex>

                    <Flex
                      pl={2}
                      pt={6}
                    >
                      <Checkbox
                        selected={values.third}
                        onSelect={value => {
                          setFieldValue("third", value)
                        }}
                      >
                        Email
                      </Checkbox>
                    </Flex>
                    
                    <Flex
                      pl={2}
                      pt={6}
                    >
                      <Checkbox
                        selected={values.fourth}
                        onSelect={value => {
                          setFieldValue("fourth", value)
                        }}
                      >
                        Email
                      </Checkbox>
                    </Flex>
                    
                    <Flex
                      pl={2}
                      pt={6}
                    >
                      <Checkbox
                        selected={values.fifth}
                        onSelect={value => {
                          setFieldValue("fifth", value)
                        }}
                      >
                        Email
                      </Checkbox>
                    </Flex>

                    <Separator mt={6}/>

                    <Flex
                      pl={2}
                      pt={2}
                      mt={2}
                    >
                      <Checkbox
                        selected={Object.values(values).every(v => !v)}
                        onSelect={value => {
                          ;Object.keys(values).forEach(field => {
                            setFieldValue(field, !value)
                          })
                        }}
                      >
                        Unselect all
                      </Checkbox>
                    </Flex>
                  </>
                )
              }}
            </Formik>
          </Column>
      </GridColumns>

      <Flex
        justifyContent="flex-end"
        pt={4}
        pr={4}
      >
        <Button width={["100%", "auto"]}>Cancel</Button>
        <Spacer ml={1} />
        <Button width={["100%", "auto"]}>Save</Button>
      </Flex>
    </>
  )
}
