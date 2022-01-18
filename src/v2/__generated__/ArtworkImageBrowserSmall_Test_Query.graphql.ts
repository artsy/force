/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserSmall_Test_QueryVariables = {};
export type ArtworkImageBrowserSmall_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowserSmall_artwork">;
    } | null;
};
export type ArtworkImageBrowserSmall_Test_Query = {
    readonly response: ArtworkImageBrowserSmall_Test_QueryResponse;
    readonly variables: ArtworkImageBrowserSmall_Test_QueryVariables;
};



/*
query ArtworkImageBrowserSmall_Test_Query {
  artwork(id: "example") {
    ...ArtworkImageBrowserSmall_artwork
    id
  }
}

fragment ArtworkImageBrowserSmall_artwork on Artwork {
  ...ArtworkLightbox_artwork
  images {
    internalID
    isZoomable
    ...DeepZoom_image
  }
}

fragment ArtworkLightbox_artwork on Artwork {
  formattedMetadata
  images {
    isDefault
    placeholder: url(version: ["small", "medium"])
    fallback: cropped(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      width
      height
      src
      srcSet
    }
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      width
      height
      src
      srcSet
    }
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
v1 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 800
  },
  {
    "kind": "Literal",
    "name": "version",
    "value": [
      "normalized",
      "larger",
      "large"
    ]
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 800
  }
],
v2 = [
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
  },
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
  }
],
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkImageBrowserSmall_Test_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkImageBrowserSmall_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkImageBrowserSmall_Test_Query",
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
            "kind": "ScalarField",
            "name": "formattedMetadata",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDefault",
                "storageKey": null
              },
              {
                "alias": "placeholder",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "small",
                      "medium"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"small\",\"medium\"])"
              },
              {
                "alias": "fallback",
                "args": (v1/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
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
                "name": "isZoomable",
                "storageKey": null
              },
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
    "cacheID": "b516208a8a0c676e6e269612f29e4c98",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.formattedMetadata": (v3/*: any*/),
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.deepZoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoom"
        },
        "artwork.images.deepZoom.Image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImage"
        },
        "artwork.images.deepZoom.Image.Format": (v3/*: any*/),
        "artwork.images.deepZoom.Image.Overlap": (v4/*: any*/),
        "artwork.images.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.images.deepZoom.Image.Size.Height": (v4/*: any*/),
        "artwork.images.deepZoom.Image.Size.Width": (v4/*: any*/),
        "artwork.images.deepZoom.Image.TileSize": (v4/*: any*/),
        "artwork.images.deepZoom.Image.Url": (v3/*: any*/),
        "artwork.images.deepZoom.Image.xmlns": (v3/*: any*/),
        "artwork.images.fallback": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artwork.images.fallback.height": (v5/*: any*/),
        "artwork.images.fallback.src": (v6/*: any*/),
        "artwork.images.fallback.srcSet": (v6/*: any*/),
        "artwork.images.fallback.width": (v5/*: any*/),
        "artwork.images.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "artwork.images.isDefault": (v7/*: any*/),
        "artwork.images.isZoomable": (v7/*: any*/),
        "artwork.images.placeholder": (v3/*: any*/),
        "artwork.images.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.images.resized.height": (v4/*: any*/),
        "artwork.images.resized.src": (v6/*: any*/),
        "artwork.images.resized.srcSet": (v6/*: any*/),
        "artwork.images.resized.width": (v4/*: any*/)
      }
    },
    "name": "ArtworkImageBrowserSmall_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkImageBrowserSmall_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtworkImageBrowserSmall_artwork\n    id\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  images {\n    internalID\n    isZoomable\n    ...DeepZoom_image\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images {\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fdbda1bd449b994caa156c4f650743e3';
export default node;
