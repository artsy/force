import {
  Box,
  Button,
  Join,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { FC } from "react"

export const AuthenticationSignUpPlaceholder: FC = () => {
  return (
    <Skeleton>
      <Join separator={<Spacer y={2} />}>
        <SkeletonInput name="Name" />

        <SkeletonInput name="Email" />

        <SkeletonInput name="Password">
          <Spacer y={0.5} />

          <SkeletonText variant="xs">
            Password must be at least 8 characters and include a lowercase
            letter, uppercase letter, and digit.
          </SkeletonText>
        </SkeletonInput>

        <Button width="100%" disabled />

        <SkeletonText textAlign="center">or</SkeletonText>

        <Button variant="secondaryBlack" width="100%" disabled />
        <Button variant="secondaryBlack" width="100%" disabled />
        <Button variant="secondaryBlack" width="100%" disabled />

        <Join separator={<Spacer y={1} />}>
          <SkeletonText variant="xs" textAlign="center" mt={-1}>
            Already have an account? Log in.
          </SkeletonText>

          <SkeletonText variant="xs" textAlign="center">
            By clicking Sign up or Continue with Apple, Google, or Facebook, you
            agree to Artsy’s Terms of Use and Privacy Policy and to receiving
            emails from Artsy.
          </SkeletonText>

          <SkeletonText variant="xs" textAlign="center">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </SkeletonText>
        </Join>
      </Join>
    </Skeleton>
  )
}

const SkeletonInput: FC<{ name: string }> = ({ name, children }) => {
  return (
    <Box>
      <SkeletonText variant="xs">{name}</SkeletonText>

      <Spacer y={0.5} />

      <SkeletonBox height={50} />

      {children}
    </Box>
  )
}
