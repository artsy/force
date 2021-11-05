import { ModalType } from "v2/Components/Authentication/Types"
import { getENV } from "v2/Utils/getENV"
import { AuthenticationMeta } from "../Components/AuthenticationMeta"
import { AuthStatic } from "../Components/AuthStatic"
import { useAuthForm } from "../Utils/useAuthForm"

export const SignupRoute: React.FC = () => {
  const { meta, options, type } = useAuthForm({
    canonical: `${getENV("APP_URL")}/signup`,
    pageTitle: "Signup to Artsy",
    type: ModalType.signup,
  })

  return (
    <>
      <AuthenticationMeta meta={meta} />
      <AuthStatic meta={meta} options={options} type={type} />
    </>
  )
}
