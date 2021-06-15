/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type homeRoutes_HomeQueryVariables = {};
export type homeRoutes_HomeQueryResponse = {
    readonly homePage: {
        readonly " $fragmentRefs": FragmentRefs<"HomeApp_homePage">;
    } | null;
};
export type homeRoutes_HomeQuery = {
    readonly response: homeRoutes_HomeQueryResponse;
    readonly variables: homeRoutes_HomeQueryVariables;
};



/*
query homeRoutes_HomeQuery {
  homePage {
    ...HomeApp_homePage
  }
}

fragment HomeApp_homePage on HomePage {
  heroUnits(platform: DESKTOP) {
    mode
    heading
    title
    id
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "homeRoutes_HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_homePage"
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
    "name": "homeRoutes_HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "platform",
                "value": "DESKTOP"
              }
            ],
            "concreteType": "HomePageHeroUnit",
            "kind": "LinkedField",
            "name": "heroUnits",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "mode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heading",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
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
            "storageKey": "heroUnits(platform:\"DESKTOP\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "homeRoutes_HomeQuery",
    "operationKind": "query",
    "text": "query homeRoutes_HomeQuery {\n  homePage {\n    ...HomeApp_homePage\n  }\n}\n\nfragment HomeApp_homePage on HomePage {\n  heroUnits(platform: DESKTOP) {\n    mode\n    heading\n    title\n    id\n  }\n}\n"
  }
};
(node as any).hash = '83fb37cbb8d89ef7ca1795aabc613ed6';
export default node;
