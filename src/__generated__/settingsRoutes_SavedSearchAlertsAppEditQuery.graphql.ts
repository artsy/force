/**
 * @generated SignedSource<<5ecb93492accf487587c6f77e302d896>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SavedSearchAlertsAppEditQuery$variables = Record<PropertyKey, never>;
export type settingsRoutes_SavedSearchAlertsAppEditQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsApp_me">;
  } | null | undefined;
};
export type settingsRoutes_SavedSearchAlertsAppEditQuery = {
  response: settingsRoutes_SavedSearchAlertsAppEditQuery$data;
  variables: settingsRoutes_SavedSearchAlertsAppEditQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
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
    "name": "settingsRoutes_SavedSearchAlertsAppEditQuery",
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
    "name": "settingsRoutes_SavedSearchAlertsAppEditQuery",
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
                        "name": "displayName",
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
                        "alias": null,
                        "args": null,
                        "concreteType": "SearchCriteriaLabel",
                        "kind": "LinkedField",
                        "name": "labels",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayValue",
                            "storageKey": null
                          }
                        ],
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
                      (v1/*: any*/),
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
            "storageKey": "alertsConnection(first:10)"
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
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "62c210db7e81fa7447970600c1521906",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SavedSearchAlertsAppEditQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SavedSearchAlertsAppEditQuery {\n  me {\n    ...SavedSearchAlertsApp_me\n    id\n  }\n}\n\nfragment SavedSearchAlertListItem_item on Alert {\n  internalID\n  displayName\n  artistIDs\n  artistSeriesIDs\n  href\n  labels {\n    displayValue\n  }\n  settings {\n    name\n  }\n}\n\nfragment SavedSearchAlertsApp_me on Me {\n  alertsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        ...SavedSearchAlertListItem_item\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8df33aeecf080d4a56a31f7b7411b096";

export default node;
