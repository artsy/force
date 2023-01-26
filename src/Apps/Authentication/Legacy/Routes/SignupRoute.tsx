import { ModalType } from "Components/Authentication/Types"
import { getENV } from "Utils/getENV"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import { AuthenticationMeta } from "Apps/Authentication/Legacy/Components/AuthenticationMeta"
import { AuthStatic } from "Apps/Authentication/Legacy/Components/AuthStatic"
import { useAuthForm } from "Apps/Authentication/Legacy/Utils/useAuthForm"

export const SignupRoute: React.FC = props => {
  const { meta, options, type } = useAuthForm({
    canonical: `${getENV("APP_URL")}/signup`,
    pageTitle: "Sign up for Artsy",
    description:
      "Build your personalized profile. Get art market insights. Buy and sell with confidence.",
    type: ModalType.signup,
  })

  return (
    <>
      <EnableRecaptcha />
      <AuthenticationMeta meta={meta} />
      <AuthStatic meta={meta} options={options} type={type} />
    </>
  )
}
