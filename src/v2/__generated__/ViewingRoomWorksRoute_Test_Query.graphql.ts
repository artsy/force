/**
 * @generated SignedSource<<404266f4a17b0f842932e6908f59c5ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomWorksRoute_Test_Query$variables = {
  slug: string;
};
export type ViewingRoomWorksRoute_Test_Query$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
  } | null;
};
export type ViewingRoomWorksRoute_Test_Query$rawResponse = {
  readonly viewingRoom: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
          readonly title: string | null;
          readonly images: ReadonlyArray<{
            readonly internalID: string | null;
            readonly solo: {
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null;
              readonly height: number | null;
            } | null;
            readonly resized: {
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null;
              readonly height: number | null;
            } | null;
          } | null> | null;
          readonly id: string;
          readonly additionalInformation: string | null;
          readonly artistNames: string | null;
          readonly date: string | null;
          readonly href: string | null;
          readonly saleMessage: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};
export type ViewingRoomWorksRoute_Test_Query = {
  variables: ViewingRoomWorksRoute_Test_Query$variables;
  response: ViewingRoomWorksRoute_Test_Query$data;
  rawResponse: ViewingRoomWorksRoute_Test_Query$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "181bc600e6868ed6bf74567f7544c090",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "viewingRoom.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "viewingRoom.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "viewingRoom.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewingRoom.artworksConnection.edges.node.additionalInformation": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artistNames": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.date": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.href": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.id": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "viewingRoom.artworksConnection.edges.node.images.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "viewingRoom.artworksConnection.edges.node.images.resized": (v7/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.height": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.src": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.srcSet": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.width": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo": (v7/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.height": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.src": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.srcSet": (v9/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.width": (v8/*: any*/),
        "viewingRoom.artworksConnection.edges.node.internalID": (v6/*: any*/),
        "viewingRoom.artworksConnection.edges.node.saleMessage": (v5/*: any*/),
        "viewingRoom.artworksConnection.edges.node.title": (v5/*: any*/)
      }
    },
    "name": "ViewingRoomWorksRoute_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomWorksRoute_Test_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomWorksRoute_viewingRoom\n  }\n}\n\nfragment ViewingRoomArtworkDetails_artwork on Artwork {\n  id\n  additionalInformation\n  artistNames\n  title\n  date\n  href\n  saleMessage\n}\n\nfragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {\n  artworksConnection {\n    edges {\n      node {\n        internalID\n        title\n        images {\n          internalID\n          solo: resized(width: 600, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n          resized(height: 550, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        ...ViewingRoomArtworkDetails_artwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "713d62cb90c663c2a684cc471dbe28da";

export default node;
