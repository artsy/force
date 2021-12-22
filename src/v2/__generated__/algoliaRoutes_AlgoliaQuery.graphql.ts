/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type algoliaRoutes_AlgoliaQueryVariables = {};
export type algoliaRoutes_AlgoliaQueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"AlgoliaApp_system">;
    } | null;
};
export type algoliaRoutes_AlgoliaQuery = {
    readonly response: algoliaRoutes_AlgoliaQueryResponse;
    readonly variables: algoliaRoutes_AlgoliaQueryVariables;
};



/*
query algoliaRoutes_AlgoliaQuery {
  system {
    ...AlgoliaApp_system
  }
}

fragment AlgoliaApp_system on System {
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
    "name": "algoliaRoutes_AlgoliaQuery",
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
            "name": "AlgoliaApp_system"
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
    "name": "algoliaRoutes_AlgoliaQuery",
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
    "name": "algoliaRoutes_AlgoliaQuery",
    "operationKind": "query",
    "text": "query algoliaRoutes_AlgoliaQuery {\n  system {\n    ...AlgoliaApp_system\n  }\n}\n\nfragment AlgoliaApp_system on System {\n  algolia {\n    apiKey\n    appID\n  }\n}\n"
  }
};
(node as any).hash = 'fe9f7e94981a0a973e5bace060b62840';
export default node;
