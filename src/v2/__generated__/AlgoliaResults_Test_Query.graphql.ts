/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaResults_Test_QueryVariables = {};
export type AlgoliaResults_Test_QueryResponse = {
    readonly system: {
        readonly algolia: {
            readonly " $fragmentRefs": FragmentRefs<"AlgoliaResults_algolia">;
        } | null;
    } | null;
};
export type AlgoliaResults_Test_QueryRawResponse = {
    readonly system: ({
        readonly algolia: ({
            readonly indices: ReadonlyArray<{
                readonly displayName: string;
                readonly name: string;
            }>;
        }) | null;
    }) | null;
};
export type AlgoliaResults_Test_Query = {
    readonly response: AlgoliaResults_Test_QueryResponse;
    readonly variables: AlgoliaResults_Test_QueryVariables;
    readonly rawResponse: AlgoliaResults_Test_QueryRawResponse;
};



/*
query AlgoliaResults_Test_Query {
  system {
    algolia {
      ...AlgoliaResults_algolia
    }
  }
}

fragment AlgoliaResults_algolia on Algolia {
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
    "name": "AlgoliaResults_Test_Query",
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
                "name": "AlgoliaResults_algolia"
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
    "name": "AlgoliaResults_Test_Query",
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
    "name": "AlgoliaResults_Test_Query",
    "operationKind": "query",
    "text": "query AlgoliaResults_Test_Query {\n  system {\n    algolia {\n      ...AlgoliaResults_algolia\n    }\n  }\n}\n\nfragment AlgoliaResults_algolia on Algolia {\n  indices {\n    displayName\n    name\n  }\n}\n"
  }
};
(node as any).hash = 'a52eaf0efb8d080dba6bd5171f19e834';
export default node;
