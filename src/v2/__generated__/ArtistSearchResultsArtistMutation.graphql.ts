/**
 * @generated SignedSource<<483b3c26048fe3848e86525e8c443b5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowArtistInput = {
  artistID: string;
  clientMutationId?: string | null;
  unfollow?: boolean | null;
};
export type ArtistSearchResultsArtistMutation$variables = {
  input: FollowArtistInput;
  excludedArtistIds: ReadonlyArray<string | null>;
};
export type ArtistSearchResultsArtistMutation$data = {
  readonly followArtist: {
    readonly popular_artists: ReadonlyArray<{
      readonly internalID: string;
      readonly id: string;
      readonly name: string | null;
      readonly image: {
        readonly cropped: {
          readonly url: string;
        } | null;
      } | null;
    } | null> | null;
    readonly artist: {
      readonly id: string;
      readonly related: {
        readonly suggestedConnection: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly internalID: string;
              readonly id: string;
              readonly name: string | null;
              readonly image: {
                readonly cropped: {
                  readonly url: string;
                } | null;
              } | null;
            } | null;
          } | null> | null;
        } | null;
      } | null;
    } | null;
  } | null;
};
export type ArtistSearchResultsArtistMutation = {
  variables: ArtistSearchResultsArtistMutation$variables;
  response: ArtistSearchResultsArtistMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "excludedArtistIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = {
  "kind": "Variable",
  "name": "excludeArtistIDs",
  "variableName": "excludedArtistIds"
},
v3 = {
  "kind": "Literal",
  "name": "excludeFollowedArtists",
  "value": true
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
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
            "value": 100
          },
          {
            "kind": "Literal",
            "name": "width",
            "value": 100
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
            "name": "url",
            "storageKey": null
          }
        ],
        "storageKey": "cropped(height:100,width:100)"
      }
    ],
    "storageKey": null
  }
],
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "kind": "LinkedField",
    "name": "followArtist",
    "plural": false,
    "selections": [
      {
        "alias": "popular_artists",
        "args": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "Literal",
            "name": "size",
            "value": 1
          }
        ],
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "popularArtists",
        "plural": true,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ArtistConnection",
                "kind": "LinkedField",
                "name": "suggestedConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": (v5/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistSearchResultsArtistMutation",
    "selections": (v6/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtistSearchResultsArtistMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "a5d7003a8bc96b09881db8fc6fc4f1f9",
    "id": null,
    "metadata": {},
    "name": "ArtistSearchResultsArtistMutation",
    "operationKind": "mutation",
    "text": "mutation ArtistSearchResultsArtistMutation(\n  $input: FollowArtistInput!\n  $excludedArtistIds: [String]!\n) {\n  followArtist(input: $input) {\n    popular_artists: popularArtists(size: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludedArtistIds) {\n      internalID\n      id\n      name\n      image {\n        cropped(width: 100, height: 100) {\n          url\n        }\n      }\n    }\n    artist {\n      id\n      related {\n        suggestedConnection(first: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludedArtistIds) {\n          edges {\n            node {\n              internalID\n              id\n              name\n              image {\n                cropped(width: 100, height: 100) {\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5125c1788a3f6c745f71598546b2c52a";

export default node;
