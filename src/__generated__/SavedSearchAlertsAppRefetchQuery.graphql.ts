/**
 * @generated SignedSource<<2d2e53fb0db83c17bd08503fd8710feb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AlertsConnectionSortEnum = "ENABLED_AT_DESC" | "NAME_ASC" | "%future added value";
export type SavedSearchAlertsAppRefetchQuery$variables = {
  after?: string | null | undefined;
  count: number;
  sort?: AlertsConnectionSortEnum | null | undefined;
};
export type SavedSearchAlertsAppRefetchQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsApp_me">;
  } | null | undefined;
};
export type SavedSearchAlertsAppRefetchQuery = {
  response: SavedSearchAlertsAppRefetchQuery$data;
  variables: SavedSearchAlertsAppRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v2/*: any*/)
],
v4 = [
  "artistIDs"
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertsAppRefetchQuery",
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
            "args": [
              (v1/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              (v2/*: any*/)
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SavedSearchAlertsAppRefetchQuery",
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
            "args": (v3/*: any*/),
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
                            "value": (v4/*: any*/)
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
                            "value": (v4/*: any*/)
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
                            "value": 10
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
                          (v5/*: any*/)
                        ],
                        "storageKey": "artworksConnection(first:10)"
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
                      (v5/*: any*/),
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": [
              "sort"
            ],
            "handle": "connection",
            "key": "SavedSearchAlertsApp_alertsConnection",
            "kind": "LinkedHandle",
            "name": "alertsConnection"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "766202ddc4646e1e05a7bcc5d8c81570",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertsAppRefetchQuery",
    "operationKind": "query",
    "text": "query SavedSearchAlertsAppRefetchQuery(\n  $after: String\n  $count: Int!\n  $sort: AlertsConnectionSortEnum\n) {\n  me {\n    ...SavedSearchAlertsApp_me_3P8D4U\n    id\n  }\n}\n\nfragment SavedSearchAlertListItem_item on Alert {\n  internalID\n  artistIDs\n  artistSeriesIDs\n  href\n  title: displayName(only: [artistIDs])\n  subtitle: displayName(except: [artistIDs])\n  artworksConnection(first: 10) {\n    counts {\n      total\n    }\n    id\n  }\n  settings {\n    name\n  }\n}\n\nfragment SavedSearchAlertsApp_me_3P8D4U on Me {\n  alertsConnection(first: $count, after: $after, sort: $sort) {\n    edges {\n      node {\n        internalID\n        artistIDs\n        ...SavedSearchAlertListItem_item\n        title: displayName(only: [artistIDs])\n        subtitle: displayName(except: [artistIDs])\n        artworksConnection(first: 10) {\n          counts {\n            total\n          }\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "448e1293c76ccf18d062604741c8baeb";

export default node;
