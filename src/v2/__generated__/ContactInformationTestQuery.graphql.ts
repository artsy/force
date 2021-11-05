/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContactInformationTestQueryVariables = {};
export type ContactInformationTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ContactInformation_me">;
    } | null;
};
export type ContactInformationTestQuery = {
    readonly response: ContactInformationTestQueryResponse;
    readonly variables: ContactInformationTestQueryVariables;
};



/*
query ContactInformationTestQuery {
  me {
    ...ContactInformation_me
    id
  }
}

fragment ContactInformation_me on Me {
  name
  email
  phone
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactInformationTestQuery",
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
            "name": "ContactInformation_me"
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
    "name": "ContactInformationTestQuery",
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
            "name": "name",
            "storageKey": null
          },
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
            "name": "phone",
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
    "name": "ContactInformationTestQuery",
    "operationKind": "query",
    "text": "query ContactInformationTestQuery {\n  me {\n    ...ContactInformation_me\n    id\n  }\n}\n\nfragment ContactInformation_me on Me {\n  name\n  email\n  phone\n}\n"
  }
};
(node as any).hash = '915ba484cb210763fa4744cac757923f';
export default node;
