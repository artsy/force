import { ModalType } from "v2/Components/Authentication/Types"
import { getENV } from "v2/Utils/getENV"
import { EnableRecaptcha } from "v2/Utils/EnableRecaptcha"
import { AuthenticationMeta } from "../Components/AuthenticationMeta"
import { AuthStatic } from "../Components/AuthStatic"
import { useAuthForm } from "../Utils/useAuthForm"

export const SignupRoute: React.FC = props => {
  const { meta, options, type } = useAuthForm({
    canonical: `${getENV("APP_URL")}/signup`,
    pageTitle: "Sign up for Artsy",
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
