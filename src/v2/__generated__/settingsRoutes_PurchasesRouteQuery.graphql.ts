/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_PurchasesRouteQueryVariables = {};
export type settingsRoutes_PurchasesRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsPurchasesRoute_me">;
    } | null;
};
export type settingsRoutes_PurchasesRouteQuery = {
    readonly response: settingsRoutes_PurchasesRouteQueryResponse;
    readonly variables: settingsRoutes_PurchasesRouteQueryVariables;
};



/*
query settingsRoutes_PurchasesRouteQuery {
  me {
    ...SettingsPurchasesRoute_me
    id
  }
}

fragment SettingsPurchasesRoute_me on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_PurchasesRouteQuery",
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
            "name": "SettingsPurchasesRoute_me"
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
    "name": "settingsRoutes_PurchasesRouteQuery",
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
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_PurchasesRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_PurchasesRouteQuery {\n  me {\n    ...SettingsPurchasesRoute_me\n    id\n  }\n}\n\nfragment SettingsPurchasesRoute_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '7beca60e070f3e2c391eeb2718a6e1ca';
export default node;
