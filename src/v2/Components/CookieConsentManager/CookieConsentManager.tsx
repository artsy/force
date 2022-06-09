import React, { useEffect, useState } from "react"
import ConsentManagerBuilder from "@segment/consent-manager/commonjs/consent-manager-builder"
// import inRegions from "@segment/in-regions"
import { getENV } from "v2/Utils/getENV"
import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Column,
  DROP_SHADOW,
  Flex,
  GridColumns,
  ModalDialog,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { isEmpty } from "lodash"

export const CookieConsentManager: React.FC = () => {
  return (
    <ConsentManagerBuilder writeKey={getENV("SEGMENT_WRITE_KEY")}>
      {props => {
        return <ConsentManagerModal {...props} />
      }}
    </ConsentManagerBuilder>
  )
}

const ConsentManagerModal = ({
  destinations,
  preferences,
  destinationPreferences,
  setPreferences,
  saveConsent,
}) => {
  const [showPreferences, setShowPreferences] = useState(false)
  const categoryTable = getCategoryTable(destinations)

  const handleSaveConsent = (...args) => {
    saveConsent(...args)
  }

  useEffect(() => {
    if (isEmpty(preferences)) {
      return
    }

    const cookie = encodeURIComponent(
      JSON.stringify({
        version: 1,
        destinations: destinationPreferences,
        artsy: true,
      })
    )

    fetch(`/set-tracking-preferences?trackingPreferences=${cookie}`)
  }, [preferences, destinationPreferences])

  return (
    <>
      <Box
        position="fixed"
        top={0}
        px={4}
        pt={1}
        pb={2}
        width="100%"
        zIndex={1000}
        bg="white"
        style={{
          boxShadow: DROP_SHADOW,
        }}
      >
        <GridColumns alignItems="center">
          <Column span={7}>
            <Text variant={["xs", "lg"]} fontWeight={["bold", "inherit"]}>
              Cookie Consent
            </Text>
            <Text variant={["xs", "sm"]}>
              We use cookies to improve your experience and personalize
              marketing. By clicking “Accept all,” you agree to our{" "}
              <a
                href="https://www.artsy.net/privacy#cookie-policy"
                target="_blank"
              >
                cookie policy
              </a>
              .
            </Text>
          </Column>
          <Column span={5}>
            <Flex justifyContent={["center", "right"]}>
              <Clickable
                textDecoration="underline"
                mx={4}
                onClick={() => setShowPreferences(true)}
              >
                <Text variant={["xs", "sm"]}>Manage Cookies</Text>
              </Clickable>
              <Button onClick={() => handleSaveConsent(true, false)}>
                Accept All
              </Button>
            </Flex>
          </Column>
        </GridColumns>
      </Box>

      {showPreferences && (
        <ModalDialog
          title="Cookie Preference Center"
          onClose={() => setShowPreferences(false)}
          hasLogo
          zIndex={1000}
          width={["100%", 600]}
        >
          <Box overflowY="scroll" flex={1}>
            <Text variant="sm">
              When you visit any website, it may store or retrieve information
              on your browser, mostly in the form of cookies. This information
              might be about you, your preferences or your device and is mostly
              used to make the site work as you expect it to. The information
              does not usually directly identify you, but it can give you a more
              personalized web experience. Because we respect your right to
              privacy, you can choose not to allow some types of cookies. Click
              on the different category headings to find out more and change our
              default settings. However, blocking some types of cookies may
              impact your experience of the site and the services we are able to
              offer.
            </Text>

            <Spacer my={1} />

            <Text
              variant="sm"
              as="a"
              // @ts-ignore
              href="https://www.artsy.net/privacy#cookie-policy"
              target="_blank"
            >
              For details, please see our Cookie Policy.
            </Text>

            <Spacer my={2} />

            <Button
              onClick={() => handleSaveConsent(true, false)}
              display="block"
            >
              Allow All
            </Button>

            <Spacer my={2} />

            <Text variant="lg">Manage Consent Preferences</Text>

            <Spacer my={2} />

            {categoryTable.map((category, index) => {
              return (
                <StackableBorderBox flexDirection="column" key={index}>
                  <Text variant="md">{category.name}</Text>

                  {category.destinations.map((destination, key) => {
                    return (
                      <Box key={key}>
                        <Checkbox
                          selected={Boolean(preferences[destination.id])}
                          onSelect={() =>
                            setPreferences({
                              [destination.id]: !preferences[destination.id],
                            })
                          }
                        >
                          {destination.name}
                        </Checkbox>
                      </Box>
                    )
                  })}
                </StackableBorderBox>
              )
            })}

            <Spacer my={4} />

            <GridColumns>
              <Column span={6}>
                <Button
                  variant="secondaryBlack"
                  onClick={() => handleSaveConsent(false, false)}
                  width="100%"
                  px={1}
                >
                  Reject All
                </Button>
              </Column>
              <Column span={6}>
                <Button
                  onClick={() => {
                    handleSaveConsent(preferences, false)
                    setShowPreferences(false)
                  }}
                  width="100%"
                  px={1}
                >
                  Confirm My Choices
                </Button>
              </Column>
            </GridColumns>
          </Box>
        </ModalDialog>
      )}
    </>
  )
}

export const MARKETING_AND_ANALYTICS_CATEGORIES = [
  "A/B Testing",
  "Analytics",
  "Attribution",
  "Email",
  "Enrichment",
  "Heatmaps & Recordings",
  "Raw Data",
  "Realtime Dashboards",
  "Referrals",
  "Surveys",
  "Video",
]

export const ADVERTISING_CATEGORIES = ["Advertising", "Tag Managers"]

export const FUNCTIONAL_CATEGORIES = [
  "CRM",
  "Customer Success",
  "Deep Linking",
  "Helpdesk",
  "Livechat",
  "Performance Monitoring",
  "Personalization",
  "SMS & Push Notifications",
  "Security & Fraud",
]

const CATEGORIES = [
  {
    name: "Functional",
    description:
      "To monitor the performance of our site and to enhance your browsing experience.",
    example:
      "For example, these tools enable you to communicate with us via live chat.",
  },
  {
    name: "Marketing and Analytics",
    description:
      "To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site.",
    example:
      "For example, we collect information about which pages you visit to help us present more relevant information.",
  },
  {
    name: "Advertising",
    description:
      "To personalize and measure the effectiveness of advertising on our site and other websites.",
    example:
      "For example, we may serve you a personalized ad based on the pages you visit on our site.",
  },
  {
    name: "Essential",
    description:
      "We use browser cookies that are necessary for the site to work as intended.",
    example:
      "For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.",
  },
  {
    name: "Analytics",
    description: "",
    example: "",
  },
  {
    name: "SMS & Push Notifications",
    description: "",
    example: "",
  },
]

const getCategoryTable = destinations => {
  const categoryTable = CATEGORIES.map(category => {
    const relatedDestinations = destinations.filter(
      destination => destination.category === category.name
    )
    return {
      ...category,
      destinations: relatedDestinations,
    }
  }).filter(category => category.destinations.length > 0)

  return categoryTable
}
