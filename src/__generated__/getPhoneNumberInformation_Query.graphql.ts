/**
 * @generated SignedSource<<c1d4abae0219a9a49c647e4d5e35b8d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getPhoneNumberInformation_Query$variables = {
  phoneNumber: string;
  regionCode?: string | null;
};
export type getPhoneNumberInformation_Query$data = {
  readonly phoneNumber: {
    readonly international: string | null;
    readonly isValid: boolean | null;
    readonly national: string | null;
    readonly originalNumber: string | null;
  } | null;
};
export type getPhoneNumberInformation_Query = {
  response: getPhoneNumberInformation_Query$data;
  variables: getPhoneNumberInformation_Query$variables;
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
      },
      {
        "alias": "international",
        "args": [
          {
            "kind": "Literal",
            "name": "format",
            "value": "INTERNATIONAL"
          }
        ],
        "kind": "ScalarField",
        "name": "display",
        "storageKey": "display(format:\"INTERNATIONAL\")"
      },
      {
        "alias": "national",
        "args": [
          {
            "kind": "Literal",
            "name": "format",
            "value": "NATIONAL"
          }
        ],
        "kind": "ScalarField",
        "name": "display",
        "storageKey": "display(format:\"NATIONAL\")"
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "originalNumber",
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
    "name": "getPhoneNumberInformation_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getPhoneNumberInformation_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb84a8489a586959bbffd5a20bb88f88",
    "id": null,
    "metadata": {},
    "name": "getPhoneNumberInformation_Query",
    "operationKind": "query",
    "text": "query getPhoneNumberInformation_Query(\n  $phoneNumber: String!\n  $regionCode: String\n) {\n  phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    originalNumber\n  }\n}\n"
  }
};
})();

(node as any).hash = "22c4487822c24ae4f4acecf7a1a84a23";

export default node;
