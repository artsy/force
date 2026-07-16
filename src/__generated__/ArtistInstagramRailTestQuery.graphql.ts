/**
 * @generated SignedSource<<3f633ca5fb0fbf7632cd8cf3cc548515>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistInstagramRailTestQuery$variables = Record<PropertyKey, never>;
export type ArtistInstagramRailTestQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistInstagramRail_artist">;
  } | null | undefined;
};
export type ArtistInstagramRailTestQuery = {
  response: ArtistInstagramRailTestQuery$data;
  variables: ArtistInstagramRailTestQuery$variables;
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
    "name": "ArtistInstagramRailTestQuery",
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
            "name": "ArtistInstagramRail_artist"
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
    "name": "ArtistInstagramRailTestQuery",
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
    "cacheID": "8029bef538590aa4799aea42b1e0b83d",
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
    "name": "ArtistInstagramRailTestQuery",
    "operationKind": "query",
    "text": "query ArtistInstagramRailTestQuery {\n  artist(id: \"test\") {\n    ...ArtistInstagramRail_artist\n    id\n  }\n}\n\nfragment ArtistInstagramRail_artist on Artist {\n  instagramMedia(first: 20) {\n    internalID\n    permalink\n    caption\n    image {\n      cropped(width: 300, height: 300) {\n        src\n        srcSet\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8eecceee4b8fefea426ff556b901a188";

export default node;
