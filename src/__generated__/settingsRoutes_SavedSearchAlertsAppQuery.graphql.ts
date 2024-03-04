/**
 * @generated SignedSource<<40ed7a919be10fb1d576cc093a335c98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SavedSearchAlertsAppQuery$variables = Record<PropertyKey, never>;
export type settingsRoutes_SavedSearchAlertsAppQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsApp_me">;
  } | null | undefined;
};
export type settingsRoutes_SavedSearchAlertsAppQuery = {
  response: settingsRoutes_SavedSearchAlertsAppQuery$data;
  variables: settingsRoutes_SavedSearchAlertsAppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "ENABLED_AT_DESC"
  }
],
v1 = [
  "artistIDs"
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SavedSearchAlertsAppQuery",
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
            "name": "SavedSearchAlertsApp_me"
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
    "name": "settingsRoutes_SavedSearchAlertsAppQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "AlertConnection",
            "kind": "LinkedField",
            "name": "alertsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AlertEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Alert",
                    "kind": "LinkedField",
                    "name": "node",
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
                        "kind": "ScalarField",
                        "name": "artistIDs",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AlertSettings",
                        "kind": "LinkedField",
                        "name": "settings",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistSeriesIDs",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      {
                        "alias": "title",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "only",
                            "value": (v1/*: any*/)
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": "displayName(only:[\"artistIDs\"])"
                      },
                      {
                        "alias": "subtitle",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "except",
                            "value": (v1/*: any*/)
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": "displayName(except:[\"artistIDs\"])"
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 1
                          }
                        ],
                        "concreteType": "FilterArtworksConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FilterArtworksCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "total",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": "artworksConnection(first:1)"
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "alertsConnection(first:10,sort:\"ENABLED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": [
              "sort"
            ],
            "handle": "connection",
            "key": "SavedSearchAlertsApp_alertsConnection",
            "kind": "LinkedHandle",
            "name": "alertsConnection"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "813a5f01095166671f5a730f4cd9c36b",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SavedSearchAlertsAppQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SavedSearchAlertsAppQuery {\n  me {\n    ...SavedSearchAlertsApp_me\n    id\n  }\n}\n\nfragment SavedSearchAlertListItem_item on Alert {\n  internalID\n  artistIDs\n  artistSeriesIDs\n  href\n  title: displayName(only: [artistIDs])\n  subtitle: displayName(except: [artistIDs])\n  artworksConnection(first: 1) {\n    counts {\n      total\n    }\n    id\n  }\n  settings {\n    name\n  }\n}\n\nfragment SavedSearchAlertsApp_me on Me {\n  alertsConnection(first: 10, sort: ENABLED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        artistIDs\n        settings {\n          name\n        }\n        ...SavedSearchAlertListItem_item\n        title: displayName(only: [artistIDs])\n        subtitle: displayName(except: [artistIDs])\n        artworksConnection(first: 1) {\n          counts {\n            total\n          }\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "522ead1b955dc0ddfdd4624e8bfede63";

export default node;
