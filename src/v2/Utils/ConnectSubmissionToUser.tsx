import { useEffect } from "react"
import { useSystemContext } from "v2/System"
import { updateConsignSubmissionMutation } from "v2/Apps/Consign/Routes/SubmissionFlow/Mutations"
import { UpdateSubmissionMutationInput } from "v2/__generated__/UpdateConsignSubmissionMutation.graphql"

export const ConnectSubmissionToUser: React.FC = () => {
  const { relayEnvironment, user } = useSystemContext()
  const submissionId = Cookies.get("submissionId")

  useEffect(() => {
    const updateSubmissionWithUser = async () => {
      if (user?.id && user?.email && submissionId && relayEnvironment) {
        const input: UpdateSubmissionMutationInput = {
          id: submissionId,
          userEmail: user.email,
        }

        await updateConsignSubmissionMutation(relayEnvironment, input)
      }
    }

    updateSubmissionWithUser()
  }, [submissionId, relayEnvironment, user])

  return null
}
