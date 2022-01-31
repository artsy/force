/**
 * @generated SignedSource<<91c1001900e9afdf329e06f917f3864b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopoverQuery$variables = {
  artistID: string;
};
export type FollowArtistPopoverQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowArtistPopover_artist">;
  } | null;
};
export type FollowArtistPopoverQuery = {
  variables: FollowArtistPopoverQuery$variables;
  response: FollowArtistPopoverQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowArtistPopoverQuery",
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
            "name": "FollowArtistPopover_artist"
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
    "name": "FollowArtistPopoverQuery",
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
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "excludeFollowedArtists",
                    "value": true
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 3
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
                        "selections": [
                          (v2/*: any*/),
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
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "formattedNationalityAndBirthday",
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
                                    "value": 45
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 45
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
                                "storageKey": "cropped(height:45,width:45)"
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
                "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3)"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1c32af4bf39e58e65c73b47a24e6069c",
    "id": null,
    "metadata": {},
    "name": "FollowArtistPopoverQuery",
    "operationKind": "query",
    "text": "query FollowArtistPopoverQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...FollowArtistPopover_artist\n    id\n  }\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "364b417ae6a387a733637fd589434356";

export default node;
