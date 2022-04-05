import Cookies from "cookies-js"
import { useEffect } from "react"
import { useSystemContext } from "v2/System"
import { useAddUserToSubmission } from "v2/Apps/Consign/Routes/SubmissionFlow/Mutations"
import createLogger from "v2/Utils/logger"
import { MutationParameters } from "relay-runtime"

const logger = createLogger("Utils/Hooks/useConnectUserToSubmission.tsx")

const connectUserToSubmission = async (
  user: User,
  addUser: (
    variables: MutationParameters["variables"]
  ) => Promise<MutationParameters["response"]>
) => {
  const submissionId = await Cookies.get("submissionId")

  if (!submissionId) return

  if (!user) {
    Cookies.expire("submissionId")
    return
  }

  try {
    await addUser({
      variables: {
        input: {
          id: submissionId,
          userEmail: user.email,
        },
      },
    })

    Cookies.expire("submissionId")
  } catch (error) {
    logger.error("Add user to submission error", error)
  }
}

export const useConnectUserToSubmission = () => {
  const { user } = useSystemContext()
  const { submitMutation: addUser } = useAddUserToSubmission()

  useEffect(() => {
    connectUserToSubmission(user, addUser)
  }, [user, addUser])
}
