/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserInformationQueryVariables = {};
export type UserInformationQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserInformation_me">;
    } | null;
};
export type UserInformationQueryRawResponse = {
    readonly me: ({
        readonly email: string | null;
        readonly name: string | null;
        readonly paddleNumber: string | null;
        readonly phone: string | null;
        readonly internalID: string;
        readonly id: string | null;
    }) | null;
};
export type UserInformationQuery = {
    readonly response: UserInformationQueryResponse;
    readonly variables: UserInformationQueryVariables;
    readonly rawResponse: UserInformationQueryRawResponse;
};



/*
query UserInformationQuery {
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
    "name": "UserInformationQuery",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserInformationQuery",
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
    "id": null,
    "metadata": {},
    "name": "UserInformationQuery",
    "operationKind": "query",
    "text": "query UserInformationQuery {\n  me {\n    ...UserInformation_me\n    id\n  }\n}\n\nfragment UserInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n  internalID\n}\n"
  }
};
(node as any).hash = '77e70fe6f059d61db962f2645846adb8';
export default node;
