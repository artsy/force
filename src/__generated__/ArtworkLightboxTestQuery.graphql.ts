/**
 * @generated SignedSource<<fca0583bf820db9fe81bb4b996761285>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkLightboxTestQuery$variables = Record<PropertyKey, never>;
export type ArtworkLightboxTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork">;
  } | null | undefined;
};
export type ArtworkLightboxTestQuery = {
  response: ArtworkLightboxTestQuery$data;
  variables: ArtworkLightboxTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
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
    "name": "quality",
    "value": 85
  },
  {
    "kind": "Literal",
    "name": "version",
    "value": [
      "main",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkLightboxTestQuery",
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
            "name": "ArtworkLightbox_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkLightboxTestQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "includeAll",
                "value": false
              }
            ],
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
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
                "storageKey": "cropped(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": "resized(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "versions",
                "storageKey": null
              }
            ],
            "storageKey": "images(includeAll:false)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "97dab2302a1a5ff32034b39881da1779",
    "id": null,
    "metadata": {},
    "name": "ArtworkLightboxTestQuery",
    "operationKind": "query",
    "text": "query ArtworkLightboxTestQuery {\n  artwork(id: \"foo\") {\n    ...ArtworkLightbox_artwork\n    id\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images(includeAll: false) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n"
  }
};
})();

(node as any).hash = "d89c107ad8a376c89f12778bd9f949f3";

export default node;
