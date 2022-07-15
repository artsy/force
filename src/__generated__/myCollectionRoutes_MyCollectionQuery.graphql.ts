/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type myCollectionRoutes_MyCollectionQueryVariables = {};
export type myCollectionRoutes_MyCollectionQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionApp_me">;
    } | null;
};
export type myCollectionRoutes_MyCollectionQuery = {
    readonly response: myCollectionRoutes_MyCollectionQueryResponse;
    readonly variables: myCollectionRoutes_MyCollectionQueryVariables;
};



/*
query myCollectionRoutes_MyCollectionQuery {
  me {
    ...MyCollectionApp_me
    id
  }
}

fragment MyCollectionApp_me on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "myCollectionRoutes_MyCollectionQuery",
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
            "name": "MyCollectionApp_me"
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
    "name": "myCollectionRoutes_MyCollectionQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f14c0995bc2e6697d0a11f0c6f937a32",
    "id": null,
    "metadata": {},
    "name": "myCollectionRoutes_MyCollectionQuery",
    "operationKind": "query",
    "text": "query myCollectionRoutes_MyCollectionQuery {\n  me {\n    ...MyCollectionApp_me\n    id\n  }\n}\n\nfragment MyCollectionApp_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '2730b9d9907f62c25e4b7fedee76909a';
export default node;
