/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeepZoom_Test_QueryVariables = {};
export type DeepZoom_Test_QueryResponse = {
    readonly artwork: {
        readonly images: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"DeepZoom_image">;
        } | null> | null;
    } | null;
};
export type DeepZoom_Test_Query = {
    readonly response: DeepZoom_Test_QueryResponse;
    readonly variables: DeepZoom_Test_QueryVariables;
};



/*
query DeepZoom_Test_Query {
  artwork(id: "example") {
    images {
      ...DeepZoom_image
    }
    id
  }
}

fragment DeepZoom_image on Image {
  deepZoom {
    Image {
      xmlns
      Url
      Format
      TileSize
      Overlap
      Size {
        Width
        Height
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v2 = {
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
    "name": "DeepZoom_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DeepZoom_image"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DeepZoom_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "DeepZoom",
                "kind": "LinkedField",
                "name": "deepZoom",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeepZoomImage",
                    "kind": "LinkedField",
                    "name": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "xmlns",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "Url",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "Format",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "TileSize",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "Overlap",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeepZoomImageSize",
                        "kind": "LinkedField",
                        "name": "Size",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Width",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Height",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.images": {
          "type": "Image",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.images.deepZoom": {
          "type": "DeepZoom",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.images.deepZoom.Image": {
          "type": "DeepZoomImage",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.images.deepZoom.Image.xmlns": (v1/*: any*/),
        "artwork.images.deepZoom.Image.Url": (v1/*: any*/),
        "artwork.images.deepZoom.Image.Format": (v1/*: any*/),
        "artwork.images.deepZoom.Image.TileSize": (v2/*: any*/),
        "artwork.images.deepZoom.Image.Overlap": (v2/*: any*/),
        "artwork.images.deepZoom.Image.Size": {
          "type": "DeepZoomImageSize",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.images.deepZoom.Image.Size.Width": (v2/*: any*/),
        "artwork.images.deepZoom.Image.Size.Height": (v2/*: any*/)
      }
    },
    "name": "DeepZoom_Test_Query",
    "operationKind": "query",
    "text": "query DeepZoom_Test_Query {\n  artwork(id: \"example\") {\n    images {\n      ...DeepZoom_image\n    }\n    id\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bb3864a326c9787c58d501e5497d2d64';
export default node;
