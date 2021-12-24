/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type algoliaRoutes_AlgoliaHomeQueryVariables = {};
export type algoliaRoutes_AlgoliaHomeQueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"AlgoliaHome_system">;
    } | null;
};
export type algoliaRoutes_AlgoliaHomeQuery = {
    readonly response: algoliaRoutes_AlgoliaHomeQueryResponse;
    readonly variables: algoliaRoutes_AlgoliaHomeQueryVariables;
};



/*
query algoliaRoutes_AlgoliaHomeQuery {
  system {
    ...AlgoliaHome_system
  }
}

fragment AlgoliaHome_system on System {
  algolia {
    apiKey
    appID
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "algoliaRoutes_AlgoliaHomeQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "AlgoliaHome_system"
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
    "name": "algoliaRoutes_AlgoliaHomeQuery",
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
                "kind": "ScalarField",
                "name": "apiKey",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "appID",
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
    "name": "algoliaRoutes_AlgoliaHomeQuery",
    "operationKind": "query",
    "text": "query algoliaRoutes_AlgoliaHomeQuery {\n  system {\n    ...AlgoliaHome_system\n  }\n}\n\nfragment AlgoliaHome_system on System {\n  algolia {\n    apiKey\n    appID\n  }\n}\n"
  }
};
(node as any).hash = 'a9cfaea6f7501f4a6e33560edf282295';
export default node;
