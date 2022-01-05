/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomCard_Test_QueryVariables = {};
export type ViewingRoomCard_Test_QueryResponse = {
    readonly partner: {
        readonly viewingRoomsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomCard_viewingRoom">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type ViewingRoomCard_Test_Query = {
    readonly response: ViewingRoomCard_Test_QueryResponse;
    readonly variables: ViewingRoomCard_Test_QueryVariables;
};



/*
query ViewingRoomCard_Test_Query {
  partner(id: "white-cube") @principalField {
    viewingRoomsConnection(first: 12) {
      edges {
        node {
          internalID
          ...ViewingRoomCard_viewingRoom
        }
      }
    }
    id
  }
}

fragment ViewingRoomCard_viewingRoom on ViewingRoom {
  href
  title
  exhibitionPeriod
  coverImage: image {
    imageURLs {
      normalized
    }
    width
    height
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomCard_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
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
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ViewingRoomCard_viewingRoom"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "viewingRoomsConnection(first:12)"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRoomCard_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
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
                      (v2/*: any*/),
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
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      {
                        "alias": "coverImage",
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
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "width",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "height",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "viewingRoomsConnection(first:12)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.viewingRoomsConnection": {
          "type": "ViewingRoomsConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.viewingRoomsConnection.edges": {
          "type": "ViewingRoomsEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "partner.viewingRoomsConnection.edges.node": {
          "type": "ViewingRoom",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.viewingRoomsConnection.edges.node.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "partner.viewingRoomsConnection.edges.node.href": (v3/*: any*/),
        "partner.viewingRoomsConnection.edges.node.title": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "partner.viewingRoomsConnection.edges.node.exhibitionPeriod": (v3/*: any*/),
        "partner.viewingRoomsConnection.edges.node.coverImage": {
          "type": "ARImage",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.viewingRoomsConnection.edges.node.coverImage.imageURLs": {
          "type": "ImageURLs",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.viewingRoomsConnection.edges.node.coverImage.width": (v4/*: any*/),
        "partner.viewingRoomsConnection.edges.node.coverImage.height": (v4/*: any*/),
        "partner.viewingRoomsConnection.edges.node.coverImage.imageURLs.normalized": (v3/*: any*/)
      }
    },
    "name": "ViewingRoomCard_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomCard_Test_Query {\n  partner(id: \"white-cube\") @principalField {\n    viewingRoomsConnection(first: 12) {\n      edges {\n        node {\n          internalID\n          ...ViewingRoomCard_viewingRoom\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ViewingRoomCard_viewingRoom on ViewingRoom {\n  href\n  title\n  exhibitionPeriod\n  coverImage: image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd125328b9c5643dc4e4b0b76b0f0f8ad';
export default node;
