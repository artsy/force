/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomWorksRoute_Test_QueryVariables = {
    slug: string;
};
export type ViewingRoomWorksRoute_Test_QueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
    } | null;
};
export type ViewingRoomWorksRoute_Test_QueryRawResponse = {
    readonly viewingRoom: ({
        readonly artworksConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly title: string | null;
                    readonly images: ReadonlyArray<({
                        readonly internalID: string | null;
                        readonly solo: ({
                            readonly src: string;
                            readonly srcSet: string;
                            readonly width: number | null;
                            readonly height: number | null;
                        }) | null;
                        readonly resized: ({
                            readonly src: string;
                            readonly srcSet: string;
                            readonly width: number | null;
                            readonly height: number | null;
                        }) | null;
                    }) | null> | null;
                    readonly id: string;
                    readonly additionalInformation: string | null;
                    readonly artistNames: string | null;
                    readonly date: string | null;
                    readonly href: string | null;
                    readonly saleMessage: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
};
export type ViewingRoomWorksRoute_Test_Query = {
    readonly response: ViewingRoomWorksRoute_Test_QueryResponse;
    readonly variables: ViewingRoomWorksRoute_Test_QueryVariables;
    readonly rawResponse: ViewingRoomWorksRoute_Test_QueryRawResponse;
};



/*
query ViewingRoomWorksRoute_Test_Query(
  $slug: ID!
) {
  viewingRoom(id: $slug) {
    ...ViewingRoomWorksRoute_viewingRoom
  }
}

fragment ViewingRoomArtworkDetails_artwork on Artwork {
  id
  additionalInformation
  artistNames
  title
  date
  href
  saleMessage
}

fragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {
  artworksConnection {
    edges {
      node {
        internalID
        title
        images {
          internalID
          solo: resized(width: 600, version: "normalized") {
            src
            srcSet
            width
            height
          }
          resized(height: 550, version: "normalized") {
            src
            srcSet
            width
            height
          }
        }
        ...ViewingRoomArtworkDetails_artwork
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
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
  "kind": "Literal",
  "name": "version",
  "value": "normalized"
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
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
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "ResizedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v9 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomWorksRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomWorksRoute_viewingRoom"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewingRoomWorksRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": "solo",
                            "args": [
                              (v3/*: any*/),
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "resized(version:\"normalized\",width:600)"
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 550
                              },
                              (v3/*: any*/)
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "resized(height:550,version:\"normalized\")"
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "additionalInformation",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
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
                        "kind": "ScalarField",
                        "name": "saleMessage",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoom": {
          "type": "ViewingRoom",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewingRoom.artworksConnection": {
          "type": "ArtworkConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewingRoom.artworksConnection.edges": {
          "type": "ArtworkEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewingRoom.artworksConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewingRoom.artworksConnection.edges.node.internalID": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.title": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images": {
          "type": "Image",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewingRoom.artworksConnection.edges.node.id": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewingRoom.artworksConnection.edges.node.images.solo": (v7/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized": (v7/*: any*/),
        "viewingRoom.artworksConnection.edges.node.additionalInformation": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artistNames": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.date": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.href": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.saleMessage": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.src": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.srcSet": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.width": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.height": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.src": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.srcSet": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.width": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.height": (v9/*: any*/)
      }
    },
    "name": "ViewingRoomWorksRoute_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomWorksRoute_Test_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomWorksRoute_viewingRoom\n  }\n}\n\nfragment ViewingRoomArtworkDetails_artwork on Artwork {\n  id\n  additionalInformation\n  artistNames\n  title\n  date\n  href\n  saleMessage\n}\n\nfragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {\n  artworksConnection {\n    edges {\n      node {\n        internalID\n        title\n        images {\n          internalID\n          solo: resized(width: 600, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n          resized(height: 550, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        ...ViewingRoomArtworkDetails_artwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '713d62cb90c663c2a684cc471dbe28da';
export default node;
