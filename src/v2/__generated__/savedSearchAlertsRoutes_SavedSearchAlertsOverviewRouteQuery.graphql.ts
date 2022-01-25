/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQueryVariables = {};
export type savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertsOverviewRoute_me">;
    } | null;
};
export type savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery = {
    readonly response: savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQueryResponse;
    readonly variables: savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQueryVariables;
};



/*
query savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery {
  me {
    ...SavedSearchAlertsOverviewRoute_me
    id
  }
}

fragment SavedSearchAlertsList_me on Me {
  savedSearchesConnection(first: 50) {
    edges {
      node {
        internalID
        artistID
        userAlertSettings {
          name
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SavedSearchAlertsOverviewRoute_me on Me {
  ...SavedSearchAlertsList_me
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery",
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
            "name": "SavedSearchAlertsOverviewRoute_me"
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
    "name": "savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery",
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
            "concreteType": "SearchCriteriaConnection",
            "kind": "LinkedField",
            "name": "savedSearchesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchCriteriaEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchCriteria",
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
                        "name": "artistID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SavedSearchUserAlertSettings",
                        "kind": "LinkedField",
                        "name": "userAlertSettings",
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
            "storageKey": "savedSearchesConnection(first:50)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SavedSearchAlertsList_savedSearchesConnection",
            "kind": "LinkedHandle",
            "name": "savedSearchesConnection"
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
    "cacheID": "8a4b2d4ad37c29383a3ed21efbc9cf73",
    "id": null,
    "metadata": {},
    "name": "savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery",
    "operationKind": "query",
    "text": "query savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery {\n  me {\n    ...SavedSearchAlertsOverviewRoute_me\n    id\n  }\n}\n\nfragment SavedSearchAlertsList_me on Me {\n  savedSearchesConnection(first: 50) {\n    edges {\n      node {\n        internalID\n        artistID\n        userAlertSettings {\n          name\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SavedSearchAlertsOverviewRoute_me on Me {\n  ...SavedSearchAlertsList_me\n}\n"
  }
};
})();
(node as any).hash = '32342d50db1b204cf16d3eba0862e5fb';
export default node;
