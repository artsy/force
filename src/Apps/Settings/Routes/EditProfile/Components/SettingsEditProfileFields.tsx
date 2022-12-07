import {
  Box,
  Button,
  CheckCircleFillIcon,
  CheckCircleIcon,
  Clickable,
  Flex,
  Input,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import { LocationAutocompleteInput } from "Components/LocationAutocompleteInput"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditProfileFields_me$data } from "__generated__/SettingsEditProfileFields_me.graphql"

interface SettingsEditProfileFieldsProps {
  me: SettingsEditProfileFields_me$data
}

const SettingsEditProfileFields: React.FC<SettingsEditProfileFieldsProps> = ({
  me,
}) => {
  return (
    <>
      <Join separator={<Spacer y={4} />}>
        <Flex alignItems="center">
          <CollectorProfileHeaderAvatarFragmentContainer me={me} />

          <Text>Choose Image</Text>
        </Flex>

        <Input
          title="Full name"
          placeholder="Full name"
          name="full-name"
          required
          maxLength={256}
          // onBlur={handleBlur}
          // onChange={handleChange}
          // value={values.title}
          // data-testid="edit-profile-full-name-input"
        />

        <LocationAutocompleteInput
          name="location"
          title="Primary Location"
          placeholder="City name"
          maxLength={256}
          spellCheck={false}
          // defaultValue={defaultLocation}
          // error={touched.location && errors.location?.city}
          // onClose={handleLocationClose}
          // onSelect={handleLocationSelect}
          // onChange={handleLocationChange}
          // onClick={handleLocationClick}
        />

        <Input
          title="Profession"
          placeholder="Profession or job title"
          name="profession"
          // required
          maxLength={256}
          // onBlur={handleBlur}
          // onChange={handleChange}
          // value={values.title}
          // data-testid="edit-profile-profession-input"
        />

        <Input
          title="Other relevant positions"
          placeholder="Other relevant positions"
          name="other-relevant-positions"
          // required
          maxLength={256}
          // onBlur={handleBlur}
          // onChange={handleChange}
          // value={values.title}
          // data-testid="edit-profile-other-relevant-positions-input"
        />

        <Input
          title="About"
          placeholder="Add a brief bio, so galleries know which artists or genres you collect."
          name="about"
          // multi
          // required
          // maxLength={256}
          // onBlur={handleBlur}
          // onChange={handleChange}
          // value={values.title}
          // data-testid="edit-profile-about-input"
        />
      </Join>

      <Spacer y={[4, 6]} />

      <Box>
        <Flex alignItems="center">
          <CheckCircleIcon fill="black60" mr={0.5} />
          <Text variant="sm-display">Verify Your ID</Text>
        </Flex>

        <Text variant="sm" mt={1} color="black60">
          For details, see FAQs or contact verification@artsy.net
        </Text>
      </Box>

      <Spacer y={[4, 6]} />

      <Box>
        <Flex alignItems="center">
          <CheckCircleFillIcon fill="green100" mr={0.5} />
          <Text variant="sm-display">Email Address Verified</Text>
        </Flex>

        <Text variant="sm" mt={1} color="black60">
          For details, see FAQs or contact verification@artsy.net
        </Text>
      </Box>

      <Button
        mt={6}
        px={4}
        width={["100%", "auto"]}
        data-testid="edit-profile-save-button"
        type="submit"
        size="large"
        variant="primaryBlack"
        // loading={isSubmitting}
        // disabled={!isValid}
      >
        Save
      </Button>
    </>
  )
}

export const SettingsEditProfileFieldsFragmentContainer = createFragmentContainer(
  SettingsEditProfileFields,
  {
    me: graphql`
      fragment SettingsEditProfileFields_me on Me {
        ...CollectorProfileHeaderAvatar_me
      }
    `,
  }
)
