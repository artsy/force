/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ArtworkInquiryExistingUserQueryVariables = {
    email: string;
};
export type ArtworkInquiryExistingUserQueryResponse = {
    readonly user: {
        readonly internalID: string;
    } | null;
};
export type ArtworkInquiryExistingUserQuery = {
    readonly response: ArtworkInquiryExistingUserQueryResponse;
    readonly variables: ArtworkInquiryExistingUserQueryVariables;
};



/*
query ArtworkInquiryExistingUserQuery(
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
    "name": "email",
    "type": "String!"
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
    "name": "ArtworkInquiryExistingUserQuery",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkInquiryExistingUserQuery",
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
    "id": null,
    "metadata": {},
    "name": "ArtworkInquiryExistingUserQuery",
    "operationKind": "query",
    "text": "query ArtworkInquiryExistingUserQuery(\n  $email: String!\n) {\n  user(email: $email) {\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd6414de0b9ef17705168a41cfec3e29d';
export default node;
