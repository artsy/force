import { ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import { AuthenticationMeta } from "Apps/Authentication/Legacy/Components/AuthenticationMeta"
import { AuthStatic } from "Apps/Authentication/Legacy/Components/AuthStatic"
import { useAuthForm } from "Apps/Authentication/Legacy/Utils/useAuthForm"

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
