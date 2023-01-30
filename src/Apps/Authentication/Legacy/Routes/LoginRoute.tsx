import { ModalType } from "Components/Authentication/Types"
import { getENV } from "Utils/getENV"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import { AuthenticationMeta } from "Apps/Authentication/Legacy/Components/AuthenticationMeta"
import { AuthStatic } from "Apps/Authentication/Legacy/Components/AuthStatic"
import { useAuthForm } from "Apps/Authentication/Legacy/Utils/useAuthForm"

export const LoginRoute: React.FC = () => {
  const { meta, options, type } = useAuthForm({
    canonical: `${getENV("APP_URL")}/login`,
    pageTitle: "Log in to Artsy",
    type: ModalType.login,
  })

  return (
    <>
      <EnableRecaptcha />
      <AuthenticationMeta meta={meta} />
      <AuthStatic meta={meta} options={options} type={type} />
    </>
  )
}
