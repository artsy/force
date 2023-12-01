/**
 * @generated SignedSource<<87eb12cdc73738800bf5571ecb2c6862>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type validatePhoneNumberQuery$variables = {
  phoneNumber: string;
  regionCode?: string | null | undefined;
};
export type validatePhoneNumberQuery$data = {
  readonly phoneNumber: {
    readonly isValid: boolean | null | undefined;
  } | null | undefined;
};
export type validatePhoneNumberQuery = {
  response: validatePhoneNumberQuery$data;
  variables: validatePhoneNumberQuery$variables;
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
    "name": "validatePhoneNumberQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "validatePhoneNumberQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5298c68273523cdfe3b81c9da74d45be",
    "id": null,
    "metadata": {},
    "name": "validatePhoneNumberQuery",
    "operationKind": "query",
    "text": "query validatePhoneNumberQuery(\n  $phoneNumber: String!\n  $regionCode: String\n) {\n  phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {\n    isValid\n  }\n}\n"
  }
};
})();

(node as any).hash = "bb3e30d3c2cf10506fe7aaa92221e898";

export default node;
