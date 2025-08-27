/**
 * @generated SignedSource<<ec6b1c55962a84bde1e66ad2a99fc52c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type utilsValidatePhoneNumberQuery$variables = {
  phoneNumber: string;
  regionCode?: string | null | undefined;
};
export type utilsValidatePhoneNumberQuery$data = {
  readonly phoneNumber: {
    readonly isValid: boolean | null | undefined;
  } | null | undefined;
};
export type utilsValidatePhoneNumberQuery = {
  response: utilsValidatePhoneNumberQuery$data;
  variables: utilsValidatePhoneNumberQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "phoneNumber"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "regionCode"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "phoneNumber",
        "variableName": "phoneNumber"
      },
      {
        "kind": "Variable",
        "name": "regionCode",
        "variableName": "regionCode"
      }
    ],
    "concreteType": "PhoneNumberType",
    "kind": "LinkedField",
    "name": "phoneNumber",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isValid",
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
    "name": "utilsValidatePhoneNumberQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "utilsValidatePhoneNumberQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3960b36ff3d8a9e19b71c6a48c89e31e",
    "id": null,
    "metadata": {},
    "name": "utilsValidatePhoneNumberQuery",
    "operationKind": "query",
    "text": "query utilsValidatePhoneNumberQuery(\n  $phoneNumber: String!\n  $regionCode: String\n) {\n  phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {\n    isValid\n  }\n}\n"
  }
};
})();

(node as any).hash = "b9094176d23738b257ba4bd207497a24";

export default node;
