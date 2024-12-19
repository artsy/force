/**
 * @generated SignedSource<<20ad969c80de5fe1059db7e51f504517>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
export type AuthDialogWelcomeQuery$variables = {
  email: string
  recaptchaToken: string
}
export type AuthDialogWelcomeQuery$data = {
  readonly verifyUser:
    | {
        readonly exists: boolean
      }
    | null
    | undefined
}
export type AuthDialogWelcomeQuery = {
  response: AuthDialogWelcomeQuery$data
  variables: AuthDialogWelcomeQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "email",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "recaptchaToken",
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "email",
            variableName: "email",
          },
          {
            kind: "Variable",
            name: "recaptchaToken",
            variableName: "recaptchaToken",
          },
        ],
        concreteType: "VerifyUser",
        kind: "LinkedField",
        name: "verifyUser",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "exists",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "AuthDialogWelcomeQuery",
      selections: v1 /*: any*/,
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "AuthDialogWelcomeQuery",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "1a726d22d475625907540026eb1a39ff",
      id: null,
      metadata: {},
      name: "AuthDialogWelcomeQuery",
      operationKind: "query",
      text: "query AuthDialogWelcomeQuery(\n  $email: String!\n  $recaptchaToken: String!\n) {\n  verifyUser(email: $email, recaptchaToken: $recaptchaToken) {\n    exists\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "187a4934af565bf023955eca066dce73"

export default node
