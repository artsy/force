/**
 * @generated SignedSource<<9c0402f07af79dc6f2a5cae206ddb488>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSocialRailQuery$variables = {
  id: string;
};
export type ArtistSocialRailQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSocialRail_artist">;
  } | null | undefined;
};
export type ArtistSocialRailQuery = {
  response: ArtistSocialRailQuery$data;
  variables: ArtistSocialRailQuery$variables;
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
    "name": "ArtistSocialRailQuery",
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
            "name": "ArtistSocialRail_artist"
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
    "name": "ArtistSocialRailQuery",
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
    "cacheID": "ee5d8ad5e7e2c404ef6d898c5548381f",
    "id": null,
    "metadata": {},
    "name": "ArtistSocialRailQuery",
    "operationKind": "query",
    "text": "query ArtistSocialRailQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    ...ArtistSocialRail_artist\n    id\n  }\n}\n\nfragment ArtistSocialRail_artist on Artist {\n  instagramMedia(first: 20) {\n    internalID\n    permalink\n    caption\n    image {\n      cropped(width: 300, height: 300) {\n        src\n        srcSet\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c3d316d7ec3c9b090fe17b557706093a";

export default node;
