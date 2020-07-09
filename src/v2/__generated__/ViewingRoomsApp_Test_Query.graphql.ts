/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_Test_QueryVariables = {};
export type ViewingRoomsApp_Test_QueryResponse = {
    readonly viewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_viewingRooms">;
    } | null;
};
export type ViewingRoomsApp_Test_QueryRawResponse = {
    readonly viewingRooms: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly slug: string;
                readonly status: string;
                readonly title: string;
                readonly heroImageURL: string | null;
                readonly partner: ({
                    readonly name: string | null;
                    readonly id: string | null;
                }) | null;
                readonly artworksConnection: ({
                    readonly totalCount: number | null;
                    readonly edges: ReadonlyArray<({
                        readonly node: ({
                            readonly image: ({
                                readonly square: string | null;
                                readonly regular: string | null;
                            }) | null;
                            readonly id: string | null;
                        }) | null;
                    }) | null> | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
};
export type ViewingRoomsApp_Test_Query = {
    readonly response: ViewingRoomsApp_Test_QueryResponse;
    readonly variables: ViewingRoomsApp_Test_QueryVariables;
    readonly rawResponse: ViewingRoomsApp_Test_QueryRawResponse;
};



/*
query ViewingRoomsApp_Test_Query {
  viewingRooms {
    ...ViewingRoomsApp_viewingRooms
  }
}

fragment ViewingRoomsApp_viewingRooms on ViewingRoomConnection {
  ...ViewingRoomsLatestGrid_viewingRooms
}

fragment ViewingRoomsLatestGrid_viewingRooms on ViewingRoomConnection {
  edges {
    node {
      slug
      status
      title
      heroImageURL
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
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "ViewingRoomsApp_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRooms",
        "storageKey": null,
        "args": null,
        "concreteType": "ViewingRoomConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_viewingRooms",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ViewingRoomsApp_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRooms",
        "storageKey": null,
        "args": null,
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
                      (v0/*: any*/)
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
                              (v0/*: any*/)
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ViewingRoomsApp_Test_Query",
    "id": null,
    "text": "query ViewingRoomsApp_Test_Query {\n  viewingRooms {\n    ...ViewingRoomsApp_viewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_viewingRooms on ViewingRoomConnection {\n  ...ViewingRoomsLatestGrid_viewingRooms\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      slug\n      status\n      title\n      heroImageURL\n      partner {\n        name\n        id\n      }\n      artworksConnection(first: 2) {\n        totalCount\n        edges {\n          node {\n            image {\n              square: url(version: \"square\")\n              regular: url(version: \"large\")\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '9c5560fcd60d7ed4ebfab6f143bccfb7';
export default node;
