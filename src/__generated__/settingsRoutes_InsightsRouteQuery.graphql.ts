/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_InsightsRouteQueryVariables = {};
export type settingsRoutes_InsightsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"InsightsRoute_me">;
    } | null;
};
export type settingsRoutes_InsightsRouteQuery = {
    readonly response: settingsRoutes_InsightsRouteQueryResponse;
    readonly variables: settingsRoutes_InsightsRouteQueryVariables;
};



/*
query settingsRoutes_InsightsRouteQuery {
  me {
    ...InsightsRoute_me
    id
  }
}

fragment InsightsOverview_info on MyCollectionInfo {
  artworksCount
  artistsCount
}

fragment InsightsRoute_me on Me {
  internalID
  myCollectionInfo {
    artworksCount
    ...InsightsOverview_info
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_InsightsRouteQuery",
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
            "name": "InsightsRoute_me"
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
    "name": "settingsRoutes_InsightsRouteQuery",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworksCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistsCount",
                "storageKey": null
              }
            ],
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
    "cacheID": "180f193bf74b8ca6e07358315192aed9",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_InsightsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_InsightsRouteQuery {\n  me {\n    ...InsightsRoute_me\n    id\n  }\n}\n\nfragment InsightsOverview_info on MyCollectionInfo {\n  artworksCount\n  artistsCount\n}\n\nfragment InsightsRoute_me on Me {\n  internalID\n  myCollectionInfo {\n    artworksCount\n    ...InsightsOverview_info\n  }\n}\n"
  }
};
(node as any).hash = '05488390d019c37ca002a2608bb08e1b';
export default node;
