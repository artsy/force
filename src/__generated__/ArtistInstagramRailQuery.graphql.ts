/**
 * @generated SignedSource<<840320de913ed94c36c66dca6f107049>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistInstagramRailQuery$variables = {
  id: string;
};
export type ArtistInstagramRailQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistInstagramRail_artist">;
  } | null | undefined;
};
export type ArtistInstagramRailQuery = {
  response: ArtistInstagramRailQuery$data;
  variables: ArtistInstagramRailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistInstagramRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "name": "ArtistInstagramRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6e3a3a927aab939d8590f04019c2a875",
    "id": null,
    "metadata": {},
    "name": "ArtistInstagramRailQuery",
    "operationKind": "query",
    "text": "query ArtistInstagramRailQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    ...ArtistInstagramRail_artist\n    id\n  }\n}\n\nfragment ArtistInstagramRail_artist on Artist {\n  instagramMedia(first: 20) {\n    internalID\n    permalink\n    caption\n    image {\n      cropped(width: 300, height: 300) {\n        src\n        srcSet\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c32b3e4022473c2bdc2f0f3001412df";

export default node;
