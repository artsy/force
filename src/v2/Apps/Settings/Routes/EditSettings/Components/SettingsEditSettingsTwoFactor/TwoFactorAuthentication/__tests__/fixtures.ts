import { BackupSecondFactorModalContentQuery$rawResponse } from "v2/__generated__/BackupSecondFactorModalContentQuery.graphql"
import { CreateAppSecondFactorMutation$rawResponse } from "v2/__generated__/CreateAppSecondFactorMutation.graphql"
import { CreateBackupSecondFactorsMutation$data } from "v2/__generated__/CreateBackupSecondFactorsMutation.graphql"
import { CreateSmsSecondFactorMutation$rawResponse } from "v2/__generated__/CreateSmsSecondFactorMutation.graphql"
import { DeliverSecondFactorMutation$rawResponse } from "v2/__generated__/DeliverSecondFactorMutation.graphql"
import { DisableSecondFactorMutation$rawResponse } from "v2/__generated__/DisableSecondFactorMutation.graphql"
import { EnableSecondFactorMutation$rawResponse } from "v2/__generated__/EnableSecondFactorMutation.graphql"
import { TwoFactorAuthenticationQuery$rawResponse } from "v2/__generated__/TwoFactorAuthenticationQuery.graphql"
import { UpdateAppSecondFactorMutation$rawResponse } from "v2/__generated__/UpdateAppSecondFactorMutation.graphql"
import { UpdateSmsSecondFactorMutation$rawResponse } from "v2/__generated__/UpdateSmsSecondFactorMutation.graphql"

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

export const CreateBackupSecondFactorsMutationSuccessResponse: CreateBackupSecondFactorsMutation$data = {
  createBackupSecondFactors: {
    secondFactorsOrErrors: {
      __typename: "BackupSecondFactors",
      secondFactors: BackupSecondFactors,
    },
  },
}

export const DisabledQueryResponse: TwoFactorAuthenticationQuery$rawResponse = {
  me: {
    id: "id",
    hasSecondFactorEnabled: false,
    appSecondFactors: [],
    smsSecondFactors: [],
    backupSecondFactors: [],
  },
}

export const AppEnabledWithBackupCodesQueryResponse: TwoFactorAuthenticationQuery$rawResponse = {
  me: {
    id: "id",
    hasSecondFactorEnabled: true,
    appSecondFactors: [
      { __typename: "AppSecondFactor", internalID: "id", name: "Test Device" },
    ],
    smsSecondFactors: [],
    backupSecondFactors: BackupSecondFactors,
  },
}

export const AppEnabledWithoutBackupCodesQueryResponse: TwoFactorAuthenticationQuery$rawResponse = {
  me: {
    id: "id",
    hasSecondFactorEnabled: true,
    appSecondFactors: [
      { __typename: "AppSecondFactor", internalID: "id", name: "Test Device" },
    ],
    smsSecondFactors: [],
    backupSecondFactors: [],
  },
}

export const BackupSecondFactorModalContentQueryResponse: BackupSecondFactorModalContentQuery$rawResponse = {
  me: {
    id: "id",
    backupSecondFactors: BackupSecondFactors,
  },
}

export const CreateSmsSecondFactorMutationSuccessResponse: CreateSmsSecondFactorMutation$rawResponse = {
  createSmsSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
      internalID: "id",
    },
  },
}

export const CreateAppSecondFactorMutationSuccessResponse: CreateAppSecondFactorMutation$rawResponse = {
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

export const DeliverSmsSecondFactorMutationSuccessResponse: DeliverSecondFactorMutation$rawResponse = {
  deliverSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
      formattedPhoneNumber: "+1 (555) 123-7878",
    },
  },
}

export const UpdateSmsSecondFactorMutationSuccessResponse: UpdateSmsSecondFactorMutation$rawResponse = {
  updateSmsSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
    },
  },
}

export const DeliverSmsSecondFactorMutationErrorResponse: DeliverSecondFactorMutation$rawResponse = {
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

export const UpdateSmsSecondFactorMutationErrorResponse: UpdateSmsSecondFactorMutation$rawResponse = {
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

export const UpdateAppSecondFactorMutationSuccessResponse: UpdateAppSecondFactorMutation$rawResponse = {
  updateAppSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
    },
  },
}

export const EnableAppSecondFactorMutationSuccessResponse: EnableSecondFactorMutation$rawResponse = {
  enableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
    },
    recoveryCodes: RecoveryCodes,
  },
}

export const EnableSmsSecondFactorMutationSuccessResponse: EnableSecondFactorMutation$rawResponse = {
  enableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "SmsSecondFactor",
    },
    recoveryCodes: RecoveryCodes,
  },
}

export const EnableSmsSecondFactorMutationErrorResponse: EnableSecondFactorMutation$rawResponse = {
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

export const DisableSecondFactorMutationSuccessResponse: DisableSecondFactorMutation$rawResponse = {
  disableSecondFactor: {
    secondFactorOrErrors: {
      __typename: "AppSecondFactor",
    },
  },
}
