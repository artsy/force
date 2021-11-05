import { ModalType } from "v2/Components/Authentication/Types"
import { useRouter } from "v2/System/Router/useRouter"
import { getENV } from "v2/Utils/getENV"
import { AuthenticationMeta } from "../Components/AuthenticationMeta"
import { AuthStatic } from "../Components/AuthStatic"
import { useAuthForm } from "../Utils/useAuthForm"

export const ForgotPasswordRoute: React.FC = () => {
  const { match } = useRouter()
  const pageTitle = !!match.location.query.set_password
    ? "Set your password"
    : "Reset your password"

  const { meta, options, type } = useAuthForm({
    canonical: `${getENV("APP_URL")}/forgot`,
    pageTitle,
    type: ModalType.forgot,
  })

  return (
    <>
      <AuthenticationMeta meta={meta} />
      <AuthStatic meta={meta} options={options} type={type} />
    </>
  )
}
