/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaResultsList_Test_QueryVariables = {};
export type AlgoliaResultsList_Test_QueryResponse = {
    readonly system: {
        readonly algolia: {
            readonly " $fragmentRefs": FragmentRefs<"AlgoliaResultsList_algolia">;
        } | null;
    } | null;
};
export type AlgoliaResultsList_Test_QueryRawResponse = {
    readonly system: ({
        readonly algolia: ({
            readonly indices: ReadonlyArray<{
                readonly displayName: string;
                readonly name: string;
            }>;
        }) | null;
    }) | null;
};
export type AlgoliaResultsList_Test_Query = {
    readonly response: AlgoliaResultsList_Test_QueryResponse;
    readonly variables: AlgoliaResultsList_Test_QueryVariables;
    readonly rawResponse: AlgoliaResultsList_Test_QueryRawResponse;
};



/*
query AlgoliaResultsList_Test_Query {
  system {
    algolia {
      ...AlgoliaResultsList_algolia
    }
  }
}

fragment AlgoliaResultsList_algolia on Algolia {
  indices {
    displayName
    name
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AlgoliaResultsList_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Algolia",
            "kind": "LinkedField",
            "name": "algolia",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AlgoliaResultsList_algolia"
              }
            ],
            "storageKey": null
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
    "name": "AlgoliaResultsList_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Algolia",
            "kind": "LinkedField",
            "name": "algolia",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AlgoliaIndex",
                "kind": "LinkedField",
                "name": "indices",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "displayName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
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
    "name": "AlgoliaResultsList_Test_Query",
    "operationKind": "query",
    "text": "query AlgoliaResultsList_Test_Query {\n  system {\n    algolia {\n      ...AlgoliaResultsList_algolia\n    }\n  }\n}\n\nfragment AlgoliaResultsList_algolia on Algolia {\n  indices {\n    displayName\n    name\n  }\n}\n"
  }
};
(node as any).hash = '987a970b7c39b3c4b2fecf2d110d8f8a';
export default node;
