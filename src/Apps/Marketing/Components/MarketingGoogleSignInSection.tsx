import { Column, GridColumns, Link, Spacer, Stack, Text } from "@artsy/palette"
import type { FC } from "react"

const PRIVACY_POLICY_SECTIONS = [
  {
    label: "How we use the information we collect",
    href: "/privacy#how-we-use-the-information-we-collect-and-the-reasons-for-doing-so",
  },
  {
    label: "With whom we share personal information",
    href: "/privacy#with-whom-do-we-share-personal-information",
  },
  { label: "Security", href: "/privacy#security" },
  {
    label: "Accounts and user profiles (including deleting your data)",
    href: "/privacy#accounts-and-user-profiles",
  },
  { label: "Google user data", href: "/privacy#google-user-data" },
]

export const MarketingGoogleSignInSection: FC = () => {
  return (
    <GridColumns px={[2, 4]}>
      <Column span={8} start={3}>
        <Text as="h2" variant="lg-display">
          Sign in with Google
        </Text>

        <Spacer y={2} />

        <Text variant="sm">
          You can sign up for or sign in to the Artsy app with your Google
          account. If you do, Google shares your name, email address and profile
          picture with us, with your permission, so we can create your account
          and sign you in. We do not request access to any other Google account
          data.
        </Text>

        <Spacer y={2} />

        <Text variant="sm">
          To learn how we use, share, protect and delete this information, see
          these sections of our <Link href="/privacy">Privacy Policy</Link>:
        </Text>

        <Spacer y={1} />

        <Stack gap={0.5}>
          {PRIVACY_POLICY_SECTIONS.map(({ label, href }) => {
            return (
              <Text key={href} variant="sm">
                <Link href={href}>{label}</Link>
              </Text>
            )
          })}
        </Stack>
      </Column>
    </GridColumns>
  )
}
