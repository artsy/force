import { Button, Stack } from "@artsy/palette"
import GoogleIcon from "@artsy/icons/GoogleIcon"
import AppleIcon from "@artsy/icons/AppleIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
// import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import { stringify } from "qs"

export const SignupFormSocial = () => {
  const { applePath, facebookPath, googlePath } = getENV("AP") ?? {
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
    googlePath: "/users/auth/google",
  }

  // Build query params matching AuthDialogSocial pattern
  const query = stringify(
    {
      "redirect-to": "/", // Always redirect to homepage after social auth
      "signup-intent": "signup", // Hardcoded since we don't have analytics context
      "signup-referer": getENV("AUTHENTICATION_REFERER"), // Use same ENV var
      accepted_terms_of_service: true,
      agreed_to_receive_emails: true,
    },
    { skipNulls: true },
  )

  return (
    <Stack gap={1}>
      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${googlePath}?${query}`}
        rel="nofollow"
        Icon={GoogleIcon}
      >
        Google
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${facebookPath}?${query}`}
        rel="nofollow"
        Icon={FacebookIcon}
      >
        Facebook
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${applePath}?${query}`}
        rel="nofollow"
        Icon={AppleIcon}
      >
        Apple
      </Button>
    </Stack>
  )
}

// export const SignupFormSocial = () => {
//   const createSocialAuthLink = (provider: "google" | "apple" | "facebook") => {
//     const params = new URLSearchParams({
//       "redirect-to": "/",
//       "accepted_terms_of_service": "true",
//       "agreed_to_receive_emails": "false",
//       "signup-intent": "signup landing page",
//       "signup-referer": window.location.href,
//     })

//     return `/users/auth/${provider}?${params.toString()}`
//   }

//   return (
//     <Stack gap={1}>
//       <RouterLink to={createSocialAuthLink("google")} noUnderline>
//         <Button
//           variant="secondaryBlack"
//           width="100%"
//           Icon={GoogleIcon}
//         >
//           Google
//         </Button>
//       </RouterLink>

//       <RouterLink to={createSocialAuthLink("facebook")} noUnderline>
//         <Button
//           variant="secondaryBlack"
//           width="100%"
//           Icon={FacebookIcon}
//         >
//           Facebook
//         </Button>
//       </RouterLink>

//       <RouterLink to={createSocialAuthLink("apple")} noUnderline>
//         <Button
//           variant="secondaryBlack"
//           width="100%"
//           Icon={AppleIcon}
//         >
//           Apple
//         </Button>
//       </RouterLink>
//     </Stack>
//   )
// }
