/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type InquiryExistingUserQueryVariables = {
    email: string;
};
export type InquiryExistingUserQueryResponse = {
    readonly user: {
        readonly internalID: string;
    } | null;
};
export type InquiryExistingUserQuery = {
    readonly response: InquiryExistingUserQueryResponse;
    readonly variables: InquiryExistingUserQueryVariables;
};



/*
query InquiryExistingUserQuery(
  $email: String!
) {
  user(email: $email) {
    internalID
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryExistingUserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InquiryExistingUserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "73cdd43aaba4894344d8d33f67dc928e",
    "id": null,
    "metadata": {},
    "name": "InquiryExistingUserQuery",
    "operationKind": "query",
    "text": "query InquiryExistingUserQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '16e2cf77a93770b61ec1584fee629a19';
export default node;
