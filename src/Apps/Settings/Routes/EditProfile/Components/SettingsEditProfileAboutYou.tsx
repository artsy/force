import {
  Button,
  Checkbox,
  Input,
  Join,
  Select,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import {
  LocationAutocompleteInput,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import { Formik } from "formik"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileAboutYou_me$data } from "__generated__/SettingsEditProfileAboutYou_me.graphql"

interface SettingsEditProfileAboutYouProps {
  me: SettingsEditProfileAboutYou_me$data
}

const SettingsEditProfileAboutYou: FC<SettingsEditProfileAboutYouProps> = ({
  me,
}) => {
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()
  const { sendToast } = useToasts()

  const [loading, setLoading] = useState(false)

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        About You
      </Text>

      <Formik
        onSubmit={async ({
          location,
          profession,
          shareFollows,
          priceRangeMin,
          priceRangeMax,
        }) => {
          setLoading(true)

          try {
            const payload = {
              ...(location ? { location } : {}),
              profession,
              shareFollows,
              priceRangeMin,
              priceRangeMax,
            }

            await submitUpdateMyUserProfile(payload)

            setLoading(false)

            sendToast({
              variant: "success",
              message: "Profile updated successfully",
            })
          } catch (err) {
            console.error(err)

            setLoading(false)

            sendToast({
              variant: "error",
              message: "There was a problem",
              description: err.message,
            })
          }
        }}
        initialValues={{
          displayLocation: me.location ?? { display: "" },
          location: null,
          priceRange: me.priceRange ?? "",
          priceRangeMax: me.priceRangeMax,
          priceRangeMin: me.priceRangeMin,
          profession: me.profession ?? "",
          shareFollows: !!me.shareFollows,
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Join separator={<Spacer y={2} />}>
              <LocationAutocompleteInput
                name="location"
                title="Primary Location"
                placeholder="Enter your city"
                maxLength={256}
                spellCheck={false}
                defaultValue={formik.values.displayLocation?.display!}
                onChange={place => {
                  formik.setFieldValue("location", normalizePlace(place))
                }}
              />

              <Input
                name="profession"
                title="Profession"
                placeholder="Profession"
                value={formik.values.profession}
                onChange={formik.handleChange}
              />

              <Select
                title="Price Range"
                options={PRICE_BUCKETS}
                selected={formik.values.priceRange}
                onSelect={value => {
                  formik.setFieldValue("priceRange", value)

                  // We don't actually accept a priceRange,
                  // so have to split it into min/max
                  const [priceRangeMin, priceRangeMax] = value
                    .split(":")
                    .map(n => parseInt(n, 10))

                  formik.setFieldValue("priceRangeMin", priceRangeMin)
                  formik.setFieldValue("priceRangeMax", priceRangeMax)
                }}
              />

              <Checkbox
                selected={formik.values.shareFollows}
                onSelect={selected => {
                  formik.setFieldValue("shareFollows", selected)
                }}
              >
                Share followed artists, categories, and galleries with your
                inquiries
              </Checkbox>

              <Button mt={2} type="submit" loading={loading}>
                Save Changes
              </Button>
            </Join>
          </form>
        )}
      </Formik>
    </>
  )
}

export const SettingsEditProfileAboutYouFragmentContainer = createFragmentContainer(
  SettingsEditProfileAboutYou,
  {
    me: graphql`
      fragment SettingsEditProfileAboutYou_me on Me {
        location {
          display
        }
        profession
        shareFollows
        priceRange
        priceRangeMin
        priceRangeMax
      }
    `,
  }
)

export const PRICE_BUCKETS = [
  { text: "Select a price range", value: "" },
  { text: "Under $500", value: "-1:500" },
  { text: "Under $2,500", value: "-1:2500" },
  { text: "Under $5,000", value: "-1:5000" },
  { text: "Under $10,000", value: "-1:10000" },
  { text: "Under $25,000", value: "-1:25000" },
  { text: "Under $50,000", value: "-1:50000" },
  { text: "Under $100,000", value: "-1:100000" },
  { text: "No budget in mind", value: "-1:1000000000000" },
]
