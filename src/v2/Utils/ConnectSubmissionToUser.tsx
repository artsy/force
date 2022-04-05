import { useEffect } from "react"
import { useSystemContext } from "v2/System"
import { useAddUserToSubmission } from "v2/Apps/Consign/Routes/SubmissionFlow/Mutations"
import createLogger from "v2/Utils/logger"

const logger = createLogger("ConnectSubmissionToUser.tsx")

export const ConnectSubmissionToUser: React.FC = () => {
  const { user } = useSystemContext()
  const { submitMutation: addUser } = useAddUserToSubmission()
  const submissionId = Cookies.get("submissionId")

  useEffect(() => {
    const updateSubmissionWithUser = async () => {
      if (user?.id && user?.email && submissionId) {
        await addUser({
          variables: {
            input: {
              id: submissionId,
              userEmail: user.email,
            },
          },
        })
      }
    }

    try {
      updateSubmissionWithUser()
    } catch (error) {
      logger.error("Add user to submission error", error)
    }
  }, [submissionId, user, addUser])

  return null
}
