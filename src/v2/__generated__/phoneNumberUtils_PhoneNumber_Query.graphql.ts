/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type phoneNumberUtils_PhoneNumber_QueryVariables = {
    phoneNumber: string;
    regionCode?: string | null;
};
export type phoneNumberUtils_PhoneNumber_QueryResponse = {
    readonly phoneNumber: {
        readonly isValid: boolean | null;
        readonly international: string | null;
        readonly national: string | null;
        readonly originalNumber: string | null;
    } | null;
};
export type phoneNumberUtils_PhoneNumber_Query = {
    readonly response: phoneNumberUtils_PhoneNumber_QueryResponse;
    readonly variables: phoneNumberUtils_PhoneNumber_QueryVariables;
};



/*
query phoneNumberUtils_PhoneNumber_Query(
  $phoneNumber: String!
  $regionCode: String
) {
  phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {
    isValid
    international: display(format: INTERNATIONAL)
    national: display(format: NATIONAL)
    originalNumber
  }
}
*/

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
    "name": "phoneNumberUtils_PhoneNumber_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "phoneNumberUtils_PhoneNumber_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3566501f29a8e61b8d48ac454ee06f5f",
    "id": null,
    "metadata": {},
    "name": "phoneNumberUtils_PhoneNumber_Query",
    "operationKind": "query",
    "text": "query phoneNumberUtils_PhoneNumber_Query(\n  $phoneNumber: String!\n  $regionCode: String\n) {\n  phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    originalNumber\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd2b6e5100128043441b2d7a0b6090607';
export default node;
