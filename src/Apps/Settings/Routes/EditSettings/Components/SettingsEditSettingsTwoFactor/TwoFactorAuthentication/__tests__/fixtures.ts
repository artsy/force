import { CreateAppSecondFactorMutation$data } from "__generated__/CreateAppSecondFactorMutation.graphql"
import { CreateSmsSecondFactorMutation$data } from "__generated__/CreateSmsSecondFactorMutation.graphql"
import { DeliverSecondFactorMutation$data } from "__generated__/DeliverSecondFactorMutation.graphql"
import { DisableSecondFactorMutation$data } from "__generated__/DisableSecondFactorMutation.graphql"
import { EnableSecondFactorMutation$data } from "__generated__/EnableSecondFactorMutation.graphql"
import { UpdateAppSecondFactorMutation$data } from "__generated__/UpdateAppSecondFactorMutation.graphql"
import { UpdateSmsSecondFactorMutation$data } from "__generated__/UpdateSmsSecondFactorMutation.graphql"

export const BackupSecondFactors = [
  { code: "d038183sj8", __typename: "BackupSecondFactor" },
  { code: "2494nzki4a", __typename: "BackupSecondFactor" },
  { code: "ze93hzna31", __typename: "BackupSecondFactor" },
  { code: "xfr93424b1", __typename: "BackupSecondFactor" },
  { code: "a93n5nziu3", __typename: "BackupSecondFactor" },
  { code: "asdf93nz81", __typename: "BackupSecondFactor" },
  { code: "q0499zn411", __typename: "BackupSecondFactor" },
  { code: "fn3i1x239m", __typename: "BackupSecondFactor" },
  { code: "asd0893n2d", __typename: "BackupSecondFactor" },
  { code: "a9zmemiejs", __typename: "BackupSecondFactor" },
]

export const RecoveryCodes = [
  "d038183sj8",
  "2494nzki4a",
  "ze93hzna31",
  "xfr93424b1",
  "a93n5nziu3",
  "asdf93nz81",
  "8d300a5493",
  "q0499zn411",
  "fn3i1x239m",
  "asd0893n2d",
  "a9zmemiejs",
]

export const CreateSmsSecondFactorMutationSuccessResponse: CreateSmsSecondFactorMutation$data = {
  createSmsSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
      internalID: "id",
    },
  },
}

export const CreateAppSecondFactorMutationSuccessResponse: CreateAppSecondFactorMutation$data = {
  createAppSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
      internalID: "id",
      otpProvisioningURI:
        "otpauth://totp/Artsy:user@example.com?secret=secret&issuer=Artsy",
      otpSecret: "secret",
      name: "",
    },
  },
}

export const DeliverSmsSecondFactorMutationSuccessResponse: DeliverSecondFactorMutation$data = {
  deliverSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
      formattedPhoneNumber: "+1 (555) 123-7878",
    },
  },
}

export const UpdateSmsSecondFactorMutationSuccessResponse: UpdateSmsSecondFactorMutation$data = {
  updateSmsSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
    },
  },
}

export const DeliverSmsSecondFactorMutationErrorResponse: DeliverSecondFactorMutation$data = {
  deliverSecondFactor: {
    secondFactorOrErrors: {
      __typename: "Errors",
      errors: [
        {
          message: "Unable to deliver.",
          code: "undeliverable",
        },
      ],
    },
  },
}

export const UpdateSmsSecondFactorMutationErrorResponse: UpdateSmsSecondFactorMutation$data = {
  updateSmsSecondFactor: {
    secondFactorOrErrors: {
      __typename: "Errors",
      errors: [
        {
          code: "invalid",
          message: "is an invalid number",
          data: { key: "phone_number" },
        },
      ],
    },
  },
}

export const UpdateAppSecondFactorMutationSuccessResponse: UpdateAppSecondFactorMutation$data = {
  updateAppSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
    },
  },
}

export const EnableAppSecondFactorMutationSuccessResponse: EnableSecondFactorMutation$data = {
  enableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
    },
    recoveryCodes: RecoveryCodes,
  },
}

export const EnableSmsSecondFactorMutationSuccessResponse: EnableSecondFactorMutation$data = {
  enableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
    },
    recoveryCodes: RecoveryCodes,
  },
}

export const EnableSmsSecondFactorMutationErrorResponse: EnableSecondFactorMutation$data = {
  enableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "Errors",
      errors: [
        {
          code: "invalid_otp",
          message:
            "Unable to enable factor. Please check your two-factor authentication code and try again.",
        },
      ],
    },
    recoveryCodes: null,
  },
}

export const DisableSecondFactorMutationSuccessResponse: DisableSecondFactorMutation$data = {
  disableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
    },
  },
}
