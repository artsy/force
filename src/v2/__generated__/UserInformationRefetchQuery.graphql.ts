/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserInformationRefetchQueryVariables = {};
export type UserInformationRefetchQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserInformation_me">;
    } | null;
};
export type UserInformationRefetchQuery = {
    readonly response: UserInformationRefetchQueryResponse;
    readonly variables: UserInformationRefetchQueryVariables;
};



/*
query UserInformationRefetchQuery {
  me {
    ...UserInformation_me
    id
  }
}

fragment UserInformation_me on Me {
  email
  name
  paddleNumber
  phone
  internalID
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserInformationRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserInformation_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserInformationRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "paddleNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
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
    "cacheID": "a86278b791ed70d15df6cb92ab904f1a",
    "id": null,
    "metadata": {},
    "name": "UserInformationRefetchQuery",
    "operationKind": "query",
    "text": "query UserInformationRefetchQuery {\n  me {\n    ...UserInformation_me\n    id\n  }\n}\n\nfragment UserInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n  internalID\n}\n"
  }
};
(node as any).hash = '127fc3954c8b2c9dcbd872fbe4f5bf9a';
export default node;
