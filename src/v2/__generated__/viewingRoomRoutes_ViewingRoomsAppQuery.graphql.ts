/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type viewingRoomRoutes_ViewingRoomsAppQueryVariables = {
    count: number;
    after?: string | null;
};
export type viewingRoomRoutes_ViewingRoomsAppQueryResponse = {
    readonly allViewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
    } | null;
    readonly featuredViewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
    } | null;
};
export type viewingRoomRoutes_ViewingRoomsAppQuery = {
    readonly response: viewingRoomRoutes_ViewingRoomsAppQueryResponse;
    readonly variables: viewingRoomRoutes_ViewingRoomsAppQueryVariables;
};



/*
query viewingRoomRoutes_ViewingRoomsAppQuery(
  $count: Int!
  $after: String
) {
  allViewingRooms: viewer {
    ...ViewingRoomsApp_allViewingRooms_2QE1um
  }
  featuredViewingRooms: viewingRooms(featured: true) {
    ...ViewingRoomsApp_featuredViewingRooms
  }
}

fragment ViewingRoomsApp_allViewingRooms_2QE1um on Viewer {
  ...ViewingRoomsLatestGrid_viewingRooms_2QE1um
}

fragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {
  ...ViewingRoomsFeaturedRail_featuredViewingRooms
}

fragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {
  edges {
    node {
      status
      slug
      title
      image {
        imageURLs {
          normalized
        }
      }
      distanceToOpen(short: true)
      distanceToClose(short: true)
      partner {
        name
        id
      }
    }
  }
}

fragment ViewingRoomsLatestGrid_viewingRooms_2QE1um on Viewer {
  viewingRoomsConnection(first: $count, after: $after) {
    edges {
      node {
        slug
        status
        title
        image {
          imageURLs {
            normalized
          }
        }
        distanceToOpen(short: true)
        distanceToClose(short: true)
        partner {
          name
          id
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "String"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  {
    "kind": "Literal",
    "name": "featured",
    "value": true
  }
],
v3 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "ARImage",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageURLs",
      "kind": "LinkedField",
      "name": "imageURLs",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "normalized",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
],
v9 = {
  "alias": null,
  "args": (v8/*: any*/),
  "kind": "ScalarField",
  "name": "distanceToOpen",
  "storageKey": "distanceToOpen(short:true)"
},
v10 = {
  "alias": null,
  "args": (v8/*: any*/),
  "kind": "ScalarField",
  "name": "distanceToClose",
  "storageKey": "distanceToClose(short:true)"
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "viewingRoomRoutes_ViewingRoomsAppQuery",
    "selections": [
      {
        "alias": "allViewingRooms",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              }
            ],
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_allViewingRooms"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredViewingRooms",
        "args": (v2/*: any*/),
        "concreteType": "ViewingRoomConnection",
        "kind": "LinkedField",
        "name": "viewingRooms",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_featuredViewingRooms"
          }
        ],
        "storageKey": "viewingRooms(featured:true)"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "viewingRoomRoutes_ViewingRoomsAppQuery",
    "selections": [
      {
        "alias": "allViewingRooms",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoomsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
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
            "filters": null,
            "handle": "connection",
            "key": "ViewingRoomsLatestGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredViewingRooms",
        "args": (v2/*: any*/),
        "concreteType": "ViewingRoomConnection",
        "kind": "LinkedField",
        "name": "viewingRooms",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoom",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "viewingRooms(featured:true)"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "viewingRoomRoutes_ViewingRoomsAppQuery",
    "operationKind": "query",
    "text": "query viewingRoomRoutes_ViewingRoomsAppQuery(\n  $count: Int!\n  $after: String\n) {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms_2QE1um\n  }\n  featuredViewingRooms: viewingRooms(featured: true) {\n    ...ViewingRoomsApp_featuredViewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms_2QE1um on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_2QE1um\n}\n\nfragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {\n  ...ViewingRoomsFeaturedRail_featuredViewingRooms\n}\n\nfragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      status\n      slug\n      title\n      image {\n        imageURLs {\n          normalized\n        }\n      }\n      distanceToOpen(short: true)\n      distanceToClose(short: true)\n      partner {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_2QE1um on Viewer {\n  viewingRoomsConnection(first: $count, after: $after) {\n    edges {\n      node {\n        slug\n        status\n        title\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f2168552d83a3b86d1ec43cad3e9db67';
export default node;
