/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsLatestGrid_ViewingRoomsAppQueryVariables = {
    count: number;
    after?: string | null;
};
export type ViewingRoomsLatestGrid_ViewingRoomsAppQueryResponse = {
    readonly allViewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
    } | null;
};
export type ViewingRoomsLatestGrid_ViewingRoomsAppQuery = {
    readonly response: ViewingRoomsLatestGrid_ViewingRoomsAppQueryResponse;
    readonly variables: ViewingRoomsLatestGrid_ViewingRoomsAppQueryVariables;
};



/*
query ViewingRoomsLatestGrid_ViewingRoomsAppQuery(
  $count: Int!
  $after: String
) {
  allViewingRooms: viewer {
    ...ViewingRoomsApp_allViewingRooms_2QE1um
  }
}

fragment ViewingRoomsApp_allViewingRooms_2QE1um on Viewer {
  ...ViewingRoomsLatestGrid_viewingRooms_2QE1um
}

fragment ViewingRoomsLatestGrid_viewingRooms_2QE1um on Viewer {
  viewingRoomsConnection(first: $count, after: $after) {
    edges {
      node {
        slug
        status
        title
        heroImageURL
        distanceToOpen(short: true)
        distanceToClose(short: true)
        partner {
          name
          id
        }
        artworksConnection(first: 2) {
          totalCount
          edges {
            node {
              image {
                square: url(version: "square")
                regular: url(version: "large")
              }
              id
            }
          }
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ViewingRoomsLatestGrid_ViewingRoomsAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "allViewingRooms",
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_allViewingRooms",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ViewingRoomsLatestGrid_ViewingRoomsAppQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "allViewingRooms",
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "viewingRoomsConnection",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "ViewingRoomConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewingRoomEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "slug",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "status",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "title",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "heroImageURL",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "distanceToOpen",
                        "args": (v3/*: any*/),
                        "storageKey": "distanceToOpen(short:true)"
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "distanceToClose",
                        "args": (v3/*: any*/),
                        "storageKey": "distanceToClose(short:true)"
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "name",
                            "args": null,
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artworksConnection",
                        "storageKey": "artworksConnection(first:2)",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 2
                          }
                        ],
                        "concreteType": "ArtworkConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "totalCount",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "ArtworkEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "image",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": "square",
                                        "name": "url",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": "square"
                                          }
                                        ],
                                        "storageKey": "url(version:\"square\")"
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": "regular",
                                        "name": "url",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": "large"
                                          }
                                        ],
                                        "storageKey": "url(version:\"large\")"
                                      }
                                    ]
                                  },
                                  (v4/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "viewingRoomsConnection",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "ViewingRoomsLatestGrid_viewingRoomsConnection",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ViewingRoomsLatestGrid_ViewingRoomsAppQuery",
    "id": null,
    "text": "query ViewingRoomsLatestGrid_ViewingRoomsAppQuery(\n  $count: Int!\n  $after: String\n) {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms_2QE1um\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms_2QE1um on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_2QE1um\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_2QE1um on Viewer {\n  viewingRoomsConnection(first: $count, after: $after) {\n    edges {\n      node {\n        slug\n        status\n        title\n        heroImageURL\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        artworksConnection(first: 2) {\n          totalCount\n          edges {\n            node {\n              image {\n                square: url(version: \"square\")\n                regular: url(version: \"large\")\n              }\n              id\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2282457bbb19405370e6cf71f4bf0811';
export default node;
