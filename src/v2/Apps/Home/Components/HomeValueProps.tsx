import * as React from "react"
import {
  CheckCircleIcon,
  Flex,
  GuaranteeIcon,
  LockIcon,
  Spacer,
  Text,
} from "@artsy/palette"

export const HomeValueProps: React.FC = () => {
  return (
    <Flex
      justifyContent={"center"}
      flexDirection={"column"}
      backgroundColor={"blue10"}
    >
      <Spacer my={[2, 4]} />

      <Flex justifyContent={"center"}>
        <Text variant={"xl"}>Why buy art on Artsy?</Text>
        <Spacer my={[4, 6]} />
      </Flex>
      <Flex flexDirection={["column", "row"]} justifyContent="space-around">
        <Flex flex={1} flexDirection={"column"} alignItems={"center"} mx={4}>
          <Text variant={"lg"}>The Artsy Guarantee</Text>
          <Spacer my={[0.5, 1]} />
          <GuaranteeIcon height={"35px"} width={"35px"} fill="blue100" />
          <Spacer my={[0.5, 1]} />
          <Text variant={"sm"} textAlign="center">
            We cover all transactions up $100,000 USD. If your work is
            inauthentic, does not arrive, or arrives damaged, we'll make things
            right.{" "}
            <a href="https://support.artsy.net/hc/en-us/articles/360048946973-The-Artsy-Guarantee">
              Learn more
            </a>
          </Text>
        </Flex>
        <Flex flex={1} flexDirection={"column"} alignItems={"center"} mx={4}>
          <Text variant={"lg"}>Secure Payments</Text>
          <Spacer my={[0.5, 1]} />
          <LockIcon height={"40px"} width={"40px"} fill="blue100" />
          <Spacer my={[0.5, 1]} />
          <Text variant={"sm"} textAlign="center">
            Artsy partners with Stripe for secure credit card transactions.{" "}
            <a href="https://support.artsy.net/hc/en-us/articles/360047294333-What-is-secure-checkout-">
              Learn more
            </a>
          </Text>
        </Flex>
        <Flex flex={1} flexDirection={"column"} alignItems={"center"} mx={4}>
          <Text variant={"lg"}>Trusted Sellers</Text>
          <Spacer my={[0.5, 1]} />
          <CheckCircleIcon height={"35px"} width={"35px"} fill="blue100" />
          <Spacer my={[0.5, 1]} />
          <Text variant={"sm"} textAlign="center">
            Every artwork on Artsy comes from a trusted gallery or auction
            house. Artsy takes pride in the quality of our partners, and we
            thoroughly vet sellers when they join our platform.{" "}
            <a href="https://support.artsy.net/hc/en-us/articles/360047292353-Can-I-trust-sellers-on-Artsy-">
              Learn more
            </a>
          </Text>
        </Flex>
      </Flex>
      <Spacer my={[2, 4]} />
    </Flex>
  )
}
