/**
 * @generated SignedSource<<e8dd3b7e8a5b1a37c45ae39b20abf5b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSocialRailTestQuery$variables = Record<PropertyKey, never>;
export type ArtistSocialRailTestQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSocialRail_artist">;
  } | null | undefined;
};
export type ArtistSocialRailTestQuery = {
  response: ArtistSocialRailTestQuery$data;
  variables: ArtistSocialRailTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistSocialRailTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistSocialRail_artist"
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistSocialRailTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "ArtistInstagramMedia",
            "kind": "LinkedField",
            "name": "instagramMedia",
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
                "name": "permalink",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "caption",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 300
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
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
                    "storageKey": "cropped(height:300,width:300)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "instagramMedia(first:20)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ]
  },
  "params": {
    "cacheID": "c9163300e9da617e9439bae381749ce3",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artist.instagramMedia": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistInstagramMedia"
        },
        "artist.instagramMedia.caption": (v1/*: any*/),
        "artist.instagramMedia.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.instagramMedia.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.instagramMedia.image.cropped.src": (v2/*: any*/),
        "artist.instagramMedia.image.cropped.srcSet": (v2/*: any*/),
        "artist.instagramMedia.internalID": (v1/*: any*/),
        "artist.instagramMedia.permalink": (v1/*: any*/)
      }
    },
    "name": "ArtistSocialRailTestQuery",
    "operationKind": "query",
    "text": "query ArtistSocialRailTestQuery {\n  artist(id: \"test\") {\n    ...ArtistSocialRail_artist\n    id\n  }\n}\n\nfragment ArtistSocialRail_artist on Artist {\n  instagramMedia(first: 20) {\n    internalID\n    permalink\n    caption\n    image {\n      cropped(width: 300, height: 300) {\n        src\n        srcSet\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5fd25e03267b78f524fd30b1c7f6fe07";

export default node;
