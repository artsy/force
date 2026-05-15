/**
 * @generated SignedSource<<6917adf59ba6b48703ec7827162b9ef3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SignupFormQuery$variables = {
  email: string;
  recaptchaToken: string;
};
export type SignupFormQuery$data = {
  readonly verifyUser: {
    readonly exists: boolean;
  } | null | undefined;
};
export type SignupFormQuery = {
  response: SignupFormQuery$data;
  variables: SignupFormQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "recaptchaToken"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "recaptchaToken",
        "variableName": "recaptchaToken"
      }
    ],
    "concreteType": "VerifyUser",
    "kind": "LinkedField",
    "name": "verifyUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "exists",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c1d04b6be9ab200bd332f1596a2de2f4",
    "id": null,
    "metadata": {},
    "name": "SignupFormQuery",
    "operationKind": "query",
    "text": "query SignupFormQuery(\n  $email: String!\n  $recaptchaToken: String!\n) {\n  verifyUser(email: $email, recaptchaToken: $recaptchaToken) {\n    exists\n  }\n}\n"
  }
};
})();

(node as any).hash = "51c9aff6ee81e1bfb6b38fe31d17ec45";

export default node;
